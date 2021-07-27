import { DocumentoTramiteDTO } from "../create-tramite/documento-tramite.dto";

export interface UpdateDocumentosImplicadosTramiteDTO {
    comprador?: DocumentoTramiteDTO,
    vendedor?: DocumentoTramiteDTO,
}