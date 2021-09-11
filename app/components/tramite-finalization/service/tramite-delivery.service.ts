
import { EstadoTramiteEnum } from "../../../enums/tramites/estado-tramite.enum";
import { CreateTramiteStateDetailDTO } from "../../tramite-attending/model/dto/create-tramite-state-detail.dto";
import { TramiteStateDetailService } from "../../tramite-attending/service/tramite-state-detail.service";
import { TramiteRepository } from "../../tramite/repository/tramite.repository";
import { GetTramiteService } from "../../tramite/service/get-tramite/get-tramite.service";
import { TramiteStateAnnexObjectMapper } from "../../tramte-management/object-mappers/tramite-state-annex.object-mapper";
import { TramiteStateDetailAnnexRepository } from "../../tramte-management/repository/tramite-state-detail-annex.repository";
import { UploadAnnexService } from "../../tramte-management/services/upload-annex.service";
import { GetUserDTO } from "../../users/model/dto/get-user.dto";
import { DeliverTramiteDTO } from "../model/dto/deliver-tramite.dto";

export class TramiteDeliveryService {

    private getTramiteService: GetTramiteService = new GetTramiteService();
    private tramiteRepository: TramiteRepository = new TramiteRepository();
    private tramiteStateDetailService: TramiteStateDetailService = new TramiteStateDetailService();
    private uploadAnnexService: UploadAnnexService = new UploadAnnexService();
    private tramiteStateAnnexObjectMapper: TramiteStateAnnexObjectMapper = new TramiteStateAnnexObjectMapper()
    private annexRepository = new TramiteStateDetailAnnexRepository

    async deliverTramite(tramitador: GetUserDTO, deliverTramiteDTO: DeliverTramiteDTO) {
        const currentState: number = EstadoTramiteEnum.PendienteDeEntrega;
        const lastState: number = EstadoTramiteEnum.EnTramite;
        const tramitadorId: number = tramitador.id;
        const {tramite_id, documentoTramite} = deliverTramiteDTO;
        await this.tramiteRepository.updateTramiteState(tramite_id, currentState);
        const createTramiteStateDetailDTO: CreateTramiteStateDetailDTO = {
            currentState: currentState,
            lastState: lastState,
            idTramite: tramite_id,
            infInformer: tramitadorId
        }
        const lastTramiteStateDetail = await this.tramiteStateDetailService.getLastTramiteStateDetailByIdAndState(tramite_id, EstadoTramiteEnum.PendienteDeEntrega)
        const idLastramiteDetail: number = lastTramiteStateDetail? lastTramiteStateDetail.getDataValue('id'): -1;
        await this.tramiteStateDetailService.createTramiteStateDetail(createTramiteStateDetailDTO);
        this.uploadAnnexService.setUserContext(tramitador);
        const urlResultFromS3 = await this.uploadAnnexService.uploadFilesToS3Buckets(documentoTramite, `matrícula: ${tramite_id}`)
            const paymentDOcument = this.tramiteStateAnnexObjectMapper.mapUrlsToInterface(
                urlResultFromS3, "payment", idLastramiteDetail , 'Tramite entregado');

        await this.annexRepository.saveTramiteStateDetailAnnex(paymentDOcument);
        
        return await this.getTramiteService.getTramiteById(tramite_id);
    }
}