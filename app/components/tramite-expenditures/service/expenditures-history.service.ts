import { TramiteExpenditureModel } from "../model/db/tramite_expenditure.model";
import { TramiteExpenditureRepository } from "../repository/tramite-expenditure.repository";

export class ExpenditureHistoryService {

    private tramiteExpenditureRepo: TramiteExpenditureRepository = new TramiteExpenditureRepository();

    async getExpendituresHistoryOfTramite(idTramite: number) {

        const rawCurrentExpenditures: TramiteExpenditureModel[] = await this.tramiteExpenditureRepo.getTramiteExpenditures(idTramite);
        return rawCurrentExpenditures;
    }
}