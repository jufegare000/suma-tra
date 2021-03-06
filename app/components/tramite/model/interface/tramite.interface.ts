export interface TramiteI {
    id?: number;
    fecha_creacion: Date;
    solicitante_id?: number;
    tramitador_id?: number;
    tipo_vehiculo: number;
    placa: string;
    modelo: number;
    organismo_transito_id: number;
    direccion_solicitante: string;
    cedula_comprador: string;
    cedula_vendedor: string;
    estado_id: number;
    observaciones?: string;
    valor_total?: number;
}