import { ArchivosTramiteDTO } from "./archivos-tramite.dto";

export interface CreateTramiteDTO {
    id?: number;
    solicitante_id?: number;
    tipo_vehiculo: number;
    placa: string;
    modelo: number;
    organismo_transito_id: number;
    direccion_solicitante: string;
    cedula_comprador: string;
    cedula_vendedor: string;
    observaciones?: string;
    archivos?:ArchivosTramiteDTO
}