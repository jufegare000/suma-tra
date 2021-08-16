import { TramiteRepository } from "../../tramite/repository/tramite.repository";
import { GetUserDTO } from "../../users/model/dto/get-user.dto";
import { TramiteExpenditureModel } from "../model/db/tramite_expenditure.model";
import { AttachExpenditureDTO } from "../model/dto/attach-expediture.dto";
import { TramiteExpenditureI } from "../model/interface/tramite_expenditure.interface";
import { ConvertToInterfaceObjectMapper } from "../object-mapper/convert-to-interface.object-mapper";
import { TramiteExpenditureRepository } from "../repository/tramite-expenditure.repository";

export class AttachExpenditureService {

    
    private tramiteExpenditureRepo: TramiteExpenditureRepository = new TramiteExpenditureRepository();
    private objectMapper: ConvertToInterfaceObjectMapper = new ConvertToInterfaceObjectMapper();
    private tramiteRepository: TramiteRepository = new TramiteRepository();

    async attachExpenditure(attachExpenditureDTO: AttachExpenditureDTO) {
        const tramiteId = attachExpenditureDTO.tramite_id;
        const tramiteExpenditures: TramiteExpenditureI[] = this.objectMapper.mappDtoToInferface(attachExpenditureDTO);
        await this.tramiteExpenditureRepo.saveAllExpenditures(tramiteExpenditures);
        const totalValue = tramiteExpenditures.map(item=> item.valor).reduce((prev, nex) => prev+nex);
        await this.tramiteRepository.updateTramiteStateWithValue(tramiteId, 4, totalValue);
        return await this.tramiteRepository.getTramiteById(tramiteId);
    }

    async attachAditionalExpenditure(attachExpenditureDTO: AttachExpenditureDTO) {
        const tramiteId = attachExpenditureDTO.tramite_id;
        const expenditures: TramiteExpenditureModel[] = await this.tramiteExpenditureRepo.getTramiteExpenditures(tramiteId);
        const tramiteExpenditures: TramiteExpenditureI[] = this.objectMapper.mappDtoToInferface(attachExpenditureDTO);
        await this.tramiteExpenditureRepo.saveAllExpenditures(tramiteExpenditures);
        const newTotalValue =   expenditures.map(item=> item.getDataValue('valor')).reduce((prev, nex) => prev+nex) + attachExpenditureDTO.expenditures[0].value;
        await this.tramiteRepository.updateTramiteValue(tramiteId, newTotalValue);
        return await this.tramiteRepository.getTramiteById(tramiteId);
    }
}