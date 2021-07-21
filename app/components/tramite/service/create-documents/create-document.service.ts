import { DocumentoTramiteRepository } from "../../repository/documento-tramite.repository";
import { CreateTramiteDTO } from "../../model/dto/create-tramite/create-tramite.dto";
import { UploadFilesForTramiteCreation } from "../../../common/aws/createTramite/uploadFiles.aws";
import { AWSBucketParamsModel } from "../../../common/aws/createTramite/aws-bucket-params.model";
import { Logger } from "tslog";
import { ImagenesMatriculaDTO } from "../../model/dto/create-tramite/imagenes-matricula.dto";
import { DocumentoTramiteDTO } from "../../model/dto/create-tramite/documento-tramite.dto";
import { UserI } from "../../../users/model/interfaces/tramiUser.interface";
import { TramiUserService } from "../../../users/services/trami-user.service";
import { DocumentosImplicadosTramiteDTO } from "../../model/dto/create-tramite/create-tramite-documentos.dto";
import { CreateDocumentObjectMapper } from "../object-mappers/create-documents.object-mapper";

const log: Logger = new Logger();

export class CreateDocumentService {
    private tramiteRepository: DocumentoTramiteRepository = new DocumentoTramiteRepository();
    private uploadFilesForTramiteCreation: UploadFilesForTramiteCreation = new UploadFilesForTramiteCreation()
    private userOfTramite: UserI | null = null;
    private tramiUserService: TramiUserService = new TramiUserService();
    private tramiteId: number = 0;
    private tramiteDocumentoObjectMapper: CreateDocumentObjectMapper = new CreateDocumentObjectMapper();

    async createDocumentsForTramite(createTramiteDTO: CreateTramiteDTO) {
        const { solicitante_id, id } = createTramiteDTO;
        if (id)
            this.tramiteId = id
        if (solicitante_id) {
            this.userOfTramite = await this.tramiUserService.getTramiUserById(solicitante_id);
            log.info(`user returned: ${this.userOfTramite}`)
        }
        log.info(`user: ${this.userOfTramite?.email}`);
        try {
            await this.mapDocumentForUploadToS3(createTramiteDTO)
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

    async mapDocumentForUploadToS3(createTramiteDTO: CreateTramiteDTO) {
        if (createTramiteDTO.archivos) {
            const { imagenes_matricula, documentos } = createTramiteDTO.archivos
            log.info('parsing files for uploading');
            const matriculaUrls: string[] = await this.mapMatriculaImagesForUploadS3(imagenes_matricula);
            const documentosUrls: string[] = await this.mapDocumentosImplicados(documentos);
            await this.mapForsaveDocumentInDatabase(matriculaUrls, documentosUrls);
            createTramiteDTO.archivos = undefined;
        }
    }

    async mapMatriculaImagesForUploadS3(imagenesMatricula: ImagenesMatriculaDTO): Promise<string[]> {
        log.info('upload matricula fron and back');
        const { frontal, trasera } = imagenesMatricula;
        const urlFrontal = await this.uploadFilesToS3Buckets(frontal, "matricula_frontal");
        const urlTrasera = await this.uploadFilesToS3Buckets(trasera, "matricula_trasera");
        return [urlFrontal, urlTrasera];
    }

    async mapDocumentosImplicados(documentos: DocumentosImplicadosTramiteDTO) {
        const { comprador, vendedor } = documentos;
        const urlDocumentoComprador = await this.uploadFilesToS3Buckets(comprador, "cedula_comprador");
        const urlDocumentoVendedor = await this.uploadFilesToS3Buckets(vendedor, "cedula_vendedor");
        return [urlDocumentoComprador, urlDocumentoVendedor];
    }

    async mapForsaveDocumentInDatabase(matriculaUrls: string[], documentosUrls: string[]) {
        const matriculaFrontalDocument = this.tramiteDocumentoObjectMapper.mapDtoToTramiteI(
            "matricula_ frontal", this.tramiteId, matriculaUrls[0]);

        const matriculaTraseraDocument = this.tramiteDocumentoObjectMapper.mapDtoToTramiteI(
            "matricula_ trasera", this.tramiteId, matriculaUrls[1]);

        const cedulaCompradorDocument = this.tramiteDocumentoObjectMapper.mapDtoToTramiteI(
            "cedula_comprador", this.tramiteId, documentosUrls[0]);

        const cedulaVendedor = this.tramiteDocumentoObjectMapper.mapDtoToTramiteI(
            "cedula_vendedor", this.tramiteId, documentosUrls[1]);

        const documentosParaLaBD = [matriculaFrontalDocument, matriculaTraseraDocument,
            cedulaCompradorDocument, cedulaVendedor];

        await this.tramiteRepository.saveDocumentosTramite(documentosParaLaBD)
    }

}