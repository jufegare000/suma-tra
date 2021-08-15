import { TramiteRepository } from "../../tramite/repository/tramite.repository";
import { GetUserDTO } from "../../users/model/dto/get-user.dto";
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
        await this.tramiteRepository.updateTramiteState(tramiteId, 4);
        return await this.tramiteRepository.getTramiteById(tramiteId);
    }

}