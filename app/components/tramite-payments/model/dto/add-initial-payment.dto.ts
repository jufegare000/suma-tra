import { DocumentoTramiteDTO } from "../../../tramite/model/dto/create-tramite/documento-tramite.dto";

export interface AddInitialPaymentDTO {
    tramite_id: number,
    observaciones: string,
    soportePago: DocumentoTramiteDTO
}