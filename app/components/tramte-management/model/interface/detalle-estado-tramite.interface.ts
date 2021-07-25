export interface TramiteStateDetailI {
    id: number;
    id_tramite: number;
    id_estado_anterior: number;
    id_estado_actual: number;
    id_informador: number;
    fecha_cambio_estado: Date;
    observaciones: String;
}