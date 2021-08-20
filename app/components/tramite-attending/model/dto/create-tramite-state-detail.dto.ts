export interface CreateTramiteStateDetailDTO {
    idTramite: number,
    infInformer: number,
    currentState: number,
    lastState: number,
    observations?: String
}