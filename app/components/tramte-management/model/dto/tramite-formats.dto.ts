import { DocumentoTramiteDTO } from "../../../tramite/model/dto/create-tramite/documento-tramite.dto";

export interface TramiteFormatsDTO {
    contratoCompraVenta: DocumentoTramiteDTO,
    contratoMandto: DocumentoTramiteDTO,
    formularioSolicitud: DocumentoTramiteDTO,
    impronta: DocumentoTramiteDTO
}