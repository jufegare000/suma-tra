import { DocumentoTramiteDTO } from "../../tramite/model/dto/create-tramite/documento-tramite.dto";

export interface AddSupportPaymentDTO {
    id_expenditure: number,
    support_file: DocumentoTramiteDTO
}