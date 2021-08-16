import { ExpenditureConceptRepository } from "../repository/expenditure-concept.repository";

export class GetExpendituresConceptsService {
    
    private expenditureConceptRepository: ExpenditureConceptRepository = new ExpenditureConceptRepository();

    async getExpendituresConcept() {
        return await this.expenditureConceptRepository.getAllConcepts();
    }

}