import { UploadFilesForTramiteCreation } from "../../../../common/aws/createTramite/uploadFiles.aws";
import { UserI } from "../../../../users/model/interfaces/tramiUser.interface";
import { DocumentoTramiteDTO } from "../../../model/dto/create-tramite/documento-tramite.dto";
import { UpdateArchivosTramiteDTO } from "../../../model/dto/update-tramite/update-archivos-tramite.dto";
import { DocumentoTramiteRepository } from "../../../repository/documento-tramite.repository";
export class UpdateTramiteDocumentsService {

    private userI: UserI = {
        email: "updater",
        role: "solicitante"
    }

    private tramiteId: number = 0;

    private documentoTramiteRepo: DocumentoTramiteRepository = new DocumentoTramiteRepository()

    private uploadFilesForTramiteCreation: UploadFilesForTramiteCreation = new UploadFilesForTramiteCreation()

    async checkWhichDocumentsToUpdate(updateArchivosTramiteDTO: UpdateArchivosTramiteDTO, userI: UserI, tramiteId: number) {
        this.userI = userI;
        this.tramiteId = tramiteId;
        console.log("paso")
        updateArchivosTramiteDTO.documentos?.comprador ?
            await this.createDocumentAndSentToAWS(updateArchivosTramiteDTO.documentos.comprador, "cedula_comprador") : console.log('Theres no document', updateArchivosTramiteDTO.documentos?.comprador);
        updateArchivosTramiteDTO.documentos?.vendedor ?
            await this.createDocumentAndSentToAWS(updateArchivosTramiteDTO.documentos.vendedor, "cedula_vendedor") : undefined;
        updateArchivosTramiteDTO.imagenes_matricula?.frontal ?
            await this.createDocumentAndSentToAWS(updateArchivosTramiteDTO.imagenes_matricula.frontal, "matricula_frontal") : undefined;

        updateArchivosTramiteDTO.imagenes_matricula?.trasera ?
            await this.createDocumentAndSentToAWS(updateArchivosTramiteDTO.imagenes_matricula.trasera, "matricula_trasera") : undefined;
    }

    async createDocumentAndSentToAWS(documentoTramiteDTO: DocumentoTramiteDTO, description: string) {
        console.log("paso 2");
        
        const { ext } = documentoTramiteDTO;
        const bufferFile = this.uploadFilesForTramiteCreation.parseToBufferFromBase64(documentoTramiteDTO.b64);
        const uploadPath = this.uploadFilesForTramiteCreation.buildUploadPath(this.userI, this.tramiteId.toString(), description)
        const params = this.uploadFilesForTramiteCreation.buildParamsForS3Request(bufferFile, ext, uploadPath)
        const objectLocation = await this.uploadFilesForTramiteCreation.uploadImageToS3(params);
        console.log(objectLocation);
        await this.documentoTramiteRepo.updateTramiteDocument(this.tramiteId, objectLocation, description);
    }
}