export interface TramiteExpenditureI {
    id?: number,
    tramite_id: number,
    gasto_id: number, 
    valor: number,
    soporte_url?: string,
    fecha_creacion: Date,
    fecha_actualizacion?: Date,
    descripcion?: string
}