import { TramiteStateDetailAnnexDTO } from "./tramite-state-detail-annex.dto";

export interface TramiteStateDetailDto {
    idCurrentState: number,
    idPreviousState: number,
    stateChangeDate: Date,
    annexes: TramiteStateDetailAnnexDTO
}