import { Repository } from "sequelize-typescript";
import { sequalize } from "../../../config/db/db";
import { ExpenditureConceptModel } from "../model/db/expenditure-concept.model";

export class ExpenditureConceptRepository {


    repository: Repository<ExpenditureConceptModel> | undefined;

    getRepository(): Repository<ExpenditureConceptModel> {
        if (!this.repository) {
            this.repository = sequalize.getRepository(ExpenditureConceptModel);
        }
        return this.repository;
    }

    async getAllConcepts(): Promise<ExpenditureConceptModel[]>{
        try {
            const tramiteSDRepo = this.getRepository();
            return await tramiteSDRepo.findAll();
        } catch (error) {
            throw new Error(`Can not create expenditure because: ${error}`)
        }

    }
}