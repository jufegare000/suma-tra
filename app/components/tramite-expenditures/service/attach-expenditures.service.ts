import { EstadoTramiteEnum } from "../../../enums/tramites/estado-tramite.enum";
import { CreateTramiteStateDetailDTO } from "../../tramite-attending/model/dto/create-tramite-state-detail.dto";
import { TramiteStateDetailService } from "../../tramite-attending/service/tramite-state-detail.service";
import { TramiteRepository } from "../../tramite/repository/tramite.repository";
import { TramiteExpenditureModel } from "../model/db/tramite_expenditure.model";
import { AttachAditionalExpenditureDTO } from "../model/dto/attach-aditiona-expenditure.dto";
import { AttachExpenditureDTO } from "../model/dto/attach-expediture.dto";
import { TramiteExpenditureI } from "../model/interface/tramite_expenditure.interface";
import { ConvertToInterfaceObjectMapper } from "../object-mapper/convert-to-interface.object-mapper";
import { TramiteExpenditureRepository } from "../repository/tramite-expenditure.repository";

export class AttachExpenditureService {

    
    private tramiteExpenditureRepo: TramiteExpenditureRepository = new TramiteExpenditureRepository();
    private objectMapper: ConvertToInterfaceObjectMapper = new ConvertToInterfaceObjectMapper();
    private tramiteRepository: TramiteRepository = new TramiteRepository();
    private tramiteStateDetailService: TramiteStateDetailService = new TramiteStateDetailService();

    async attachExpenditure(attachExpenditureDTO: AttachExpenditureDTO, informerId: number) {
        const tramiteId = attachExpenditureDTO.tramite_id;
        const tramiteExpenditures: TramiteExpenditureI[] = this.objectMapper.mappDtoToInferface(attachExpenditureDTO);
        await this.tramiteExpenditureRepo.saveAllExpenditures(tramiteExpenditures);
        const totalValue = tramiteExpenditures.map(item=> item.valor).reduce((prev, nex) => prev+nex);
        await this.tramiteRepository.updateTramiteStateWithValue(tramiteId, 4, totalValue);
        await this.createTramiteStateDetailForAttach(tramiteId, informerId);
        return await this.tramiteRepository.getTramiteById(tramiteId);
    }

    async attachAditionalExpenditure(attachExpenditureDTO: AttachAditionalExpenditureDTO) {
        const tramiteId = attachExpenditureDTO.tramite_id;
        const expenditures: TramiteExpenditureModel[] = await this.tramiteExpenditureRepo.getTramiteExpenditures(tramiteId);
        const tramiteExpenditures: TramiteExpenditureI = this.objectMapper.mapSingleExpenditureDTO(attachExpenditureDTO);
        await this.tramiteExpenditureRepo.saveAllExpenditures([tramiteExpenditures]);
        const newTotalValue =   expenditures.map(item=> item.getDataValue('valor')).reduce((prev, nex) => prev+nex) + attachExpenditureDTO.expenditure.value;
        await this.tramiteRepository.updateTramiteValueAndState(tramiteId, newTotalValue, EstadoTramiteEnum.PendienteDePago);

        return await this.tramiteRepository.getTramiteById(tramiteId);
    }

    async createTramiteStateDetailForAttach(tramiteId: number, informerId: number){
        const createTramiteStateDetailDTO: CreateTramiteStateDetailDTO = {
            currentState: EstadoTramiteEnum.PendienteDePago,
            lastState: EstadoTramiteEnum.EnValidacion,
            idTramite: tramiteId,
            infInformer: informerId
        }
        await this.tramiteStateDetailService.createTramiteStateDetail(createTramiteStateDetailDTO);
    }
}