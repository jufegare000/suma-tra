import { EstadoTramiteEnum } from "../../../enums/tramites/estado-tramite.enum";
import { CreateTramiteStateDetailDTO } from "../../tramite-attending/model/dto/create-tramite-state-detail.dto";
import { TramiteStateDetailService } from "../../tramite-attending/service/tramite-state-detail.service";
import { TramiteRepository } from "../../tramite/repository/tramite.repository";
import { GetUserDTO } from "../../users/model/dto/get-user.dto";
import { UploadTramiteFormatsDTO } from "../model/dto/upload-tramite-formats.dto";
import { TramiteStateDetailObjectMapper } from "../object-mappers/tramite-state-detail.object-mapper";
import { TramiteStateDetailRepository } from "../repository/tramite-state-detail.repository";
import { UploadAnnexService } from "./upload-annex.service";

export class UploadTramiteFormatsService {

    private uploadAnnexService: UploadAnnexService = new UploadAnnexService();
    private tramiteStateDetailObjectMapper: TramiteStateDetailObjectMapper = new TramiteStateDetailObjectMapper()
    private tramiteStateDetailRepo: TramiteStateDetailRepository = new TramiteStateDetailRepository();
    private tramiteRepo: TramiteRepository = new TramiteRepository();
    private tramiteStateDetailService: TramiteStateDetailService = new TramiteStateDetailService()

    async uploadFormats(uploadTramiteFormatsDTO: UploadTramiteFormatsDTO, user: GetUserDTO) {
        
        const currentState: number = EstadoTramiteEnum.EnValidacion;
        const lastState: number = EstadoTramiteEnum.PendienteDeInformacion;
        const {tramite_id, observaciones} = uploadTramiteFormatsDTO;
        const informerId: number = user.id
        const createTramiteStateDetailDTO: CreateTramiteStateDetailDTO = { 
            currentState: currentState,
            lastState: lastState,
            idTramite: tramite_id, 
            infInformer: informerId,
            observations: observaciones
        }
        await this.tramiteRepo.updateTramiteState(uploadTramiteFormatsDTO.tramite_id, 3);
        const newTramiteStateDetail = await this.tramiteStateDetailService.createTramiteStateDetail(createTramiteStateDetailDTO);
        await this.uploadAnnexService.uploadAnnexForTramiteStateDetail(
            uploadTramiteFormatsDTO, user, newTramiteStateDetail.getDataValue('id')
        );
        return newTramiteStateDetail;
    }

}