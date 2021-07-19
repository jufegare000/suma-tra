import { DocumentoTramiteDTO } from "./documento-tramite.dto";

export interface DocumentosImplicadosTramiteDTO {
    comprador: DocumentoTramiteDTO,
    vendedor: DocumentoTramiteDTO,
}