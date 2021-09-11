import { DocumentoTramiteDTO } from "../../../tramite/model/dto/create-tramite/documento-tramite.dto";

export interface DeliverTramiteDTO {
    tramite_id: number,
    documentoTramite: DocumentoTramiteDTO
}