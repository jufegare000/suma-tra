import { ExpenditureDTO } from "./expenditure.dto";

export interface AttachExpenditureDTO {
    tramite_id: number;
    expenditures: ExpenditureDTO[];
}
