import { Repository } from "sequelize-typescript";
import { sequalize } from "../../../config/db/db";
import { TramiteExpenditureModel } from "../model/db/tramite_expenditure.model";
import { TramiteExpenditureI } from "../model/interface/tramite_expenditure.interface";

export class TramiteExpenditureRepository {


    repository: Repository<TramiteExpenditureModel> | undefined;

    getRepository(): Repository<TramiteExpenditureModel> {
        if (!this.repository) {
            this.repository = sequalize.getRepository(TramiteExpenditureModel);
        }
        return this.repository;
    }

    async saveAllExpenditures(tramiteExpenditures: TramiteExpenditureI[]){
        try {
            const tramiteSDRepo = this.getRepository();
            return await tramiteSDRepo.bulkCreate(tramiteExpenditures);
        } catch (error) {
            throw new Error(`Can not create expenditure because: ${error}`)
        }

    }
}