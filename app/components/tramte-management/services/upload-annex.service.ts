
import { Logger } from "tslog";
import { AWSBucketParamsModel } from "../../common/aws/createTramite/aws-bucket-params.model";
import { UploadFilesForTramiteCreation } from "../../common/aws/createTramite/uploadFiles.aws";
import { DocumentoTramiteDTO } from "../../tramite/model/dto/create-tramite/documento-tramite.dto";
import { GetUserDTO } from "../../users/model/dto/get-user.dto";
import { UploadTramiteFormatsDTO } from "../model/dto/upload-tramite-formats.dto";
import { TramiteStateAnnexObjectMapper } from "../object-mappers/tramite-state-annex.object-mapper";
import { TramiteStateDetailAnnexRepository } from "../repository/tramite-state-detail-annex.repository";

const log: Logger = new Logger();

export class UploadAnnexService {

    private userOfTramite: GetUserDTO | null = null;
    private uploadFilesForTramiteCreation: UploadFilesForTramiteCreation = new UploadFilesForTramiteCreation();
    private tramiteId: number = 0;
    private detailId: number = 0;
    private tramiteStateAnnexObjectMapper: TramiteStateAnnexObjectMapper = new TramiteStateAnnexObjectMapper()
    private annexRepository: TramiteStateDetailAnnexRepository = new TramiteStateDetailAnnexRepository()

    async uploadAnnexForTramiteStateDetail(uploadTramiteFormatsDTO: UploadTramiteFormatsDTO, userDto: GetUserDTO, detailId: number) {
        const tramiteId = uploadTramiteFormatsDTO.tramite_id;
        this.userOfTramite = userDto;
        this.tramiteId = tramiteId;
        this.detailId = detailId;
        log.info(`user: ${this.userOfTramite?.email}`);
        try {
            await this.mapDocumentForUploadToS3(uploadTramiteFormatsDTO)
        } catch (error) {

            throw new Error(`Can not create tramite because: ${error}`)
        }

    }

    async uploadFilesToS3Buckets(image: DocumentoTramiteDTO, description: string) {

        const bufferFile: Buffer = this.uploadFilesForTramiteCreation.parseToBufferFromBase64(image.b64);
        if (this.userOfTramite) {
            const pathForUpload: string = this.uploadFilesForTramiteCreation.buildUploadPath(this.userOfTramite, this.tramiteId.toString(), description);
            const uploadParams: AWSBucketParamsModel = this.uploadFilesForTramiteCreation.buildParamsForS3Request(bufferFile, image.ext, pathForUpload)
            const objectLocation = await this.uploadFilesForTramiteCreation.uploadImageToS3(uploadParams)
            return objectLocation;
        } else {
            throw new Error(`Can not get user for tramite`);
        }
    }

    async mapDocumentForUploadToS3(uploadTramiteFormatsDTO: UploadTramiteFormatsDTO) {

        const { contratoCompraVenta, contratoMandato, formularioSolicitud, impronta } = uploadTramiteFormatsDTO.archivos
        log.info('parsing files for uploading');
        const contratoCompraventaUrl = await this.uploadFilesToS3Buckets(contratoCompraVenta, "contrato_compraventa");
        const contratoMandatoUrl = await this.uploadFilesToS3Buckets(contratoMandato, "contrato_mandato");
        const formularioSolicitudUrl = await this.uploadFilesToS3Buckets(formularioSolicitud, "formulario_solicitud");
        const improntaUrl = await this.uploadFilesToS3Buckets(impronta, "improntas");

        const documentsForInsert: string[] = [];
        documentsForInsert.push(contratoCompraventaUrl, contratoMandatoUrl, formularioSolicitudUrl, improntaUrl)

        await this.mapForsaveDocumentInDatabase(documentsForInsert);
    }

    async mapForsaveDocumentInDatabase(urls: string[]) {

        const contratoCompraVentaDocument = this.tramiteStateAnnexObjectMapper.mapUrlsToInterface(
            urls[0], "contrato_compraventa", this.detailId, "");

        const contratoMandatoDocument = this.tramiteStateAnnexObjectMapper.mapUrlsToInterface(
            urls[1], "contrato_mandato", this.detailId, "");

        const formularioSolicitudDocument = this.tramiteStateAnnexObjectMapper.mapUrlsToInterface(
            urls[2], "formulario_solicitud", this.detailId, "");

        const improntaDocument = this.tramiteStateAnnexObjectMapper.mapUrlsToInterface(
            urls[3], "impronta", this.detailId, "");

        await this.annexRepository.saveDocumentsAnnex([
            contratoCompraVentaDocument, contratoMandatoDocument, formularioSolicitudDocument, improntaDocument
        ])
    }

}