import { ExpenditureDTO } from "./expenditure.dto";

export interface AttachAditionalExpenditureDTO {
    tramite_id: number;
    expenditure: ExpenditureDTO;
}