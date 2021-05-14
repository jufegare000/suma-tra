export interface TramiteI {
    id?: number;
    solicitante_id: string;
    tramitador_id?: number;
    tipo_vehiculo: number;
    placa: string;
    modelo: string;
    organismo_transito_id: number;
    direccion_solicitante: string;
    cedula_comprador: string;
    cedula_vendedor: string;
    estado_id: number;
    observaciones?: string;
}