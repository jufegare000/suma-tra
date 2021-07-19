import { GetDocumentosTramiteDTO } from "../../model/dto/get-tramite/get-documetos-tramite.dto";
import { DocumentoTramiteModel } from "../../model/db/documento-tramite.model";
import { DocumentoTramiteRepository } from "../../repository/documento-tramite.repository";
import { GetDocumentObjectMapper } from "../object-mappers/get-documents.object-mapper";

export class GetDocumentsTramiteService {
    private documentoTramiteRepository: DocumentoTramiteRepository = new DocumentoTramiteRepository();
    private getTramiteObjectMapper: GetDocumentObjectMapper = new GetDocumentObjectMapper();

    async getDocumentsFromTramiteByIdTramite(tramiteId: number | undefined): Promise<GetDocumentosTramiteDTO | undefined> {
        if (tramiteId) {
            try {
                const documents: DocumentoTramiteModel[] | null = await this.documentoTramiteRepository.getDocumentosTramiteByIdTramite(tramiteId);
                if (documents) {
                    const documentsDto: GetDocumentosTramiteDTO = this.getTramiteObjectMapper.mapDocumentsToDto(documents);
                    // get documents
                    return documentsDto;
                }
            } catch (ex) {
                throw new Error(`Can't get tramite documents because: ${ex}`);
            }
        }
    }
}