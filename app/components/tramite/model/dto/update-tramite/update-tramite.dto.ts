import { ArchivosTramiteDTO } from "../create-tramite/archivos-tramite.dto";

export class UpdateTramiteDTO {
    id?: number;
    tipo_vehiculo?: number;
    placa?: string;
    modelo?: number;
    organismo_transito_id?: number;
    direccion_solicitante?: string;
    cedula_comprador?: string;
    cedula_vendedor?: string;
    observaciones?: string;
    archivos?:ArchivosTramiteDTO
}