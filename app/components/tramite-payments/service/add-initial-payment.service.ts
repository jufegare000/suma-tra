import { EstadoTramiteEnum } from "../../../enums/tramites/estado-tramite.enum";
import { CreateTramiteStateDetailDTO } from "../../tramite-attending/model/dto/create-tramite-state-detail.dto";
import { TramiteStateDetailService } from "../../tramite-attending/service/tramite-state-detail.service";
import { TramiteRepository } from "../../tramite/repository/tramite.repository";
import { TramiteStateAnnexObjectMapper } from "../../tramte-management/object-mappers/tramite-state-annex.object-mapper";
import { TramiteStateDetailAnnexRepository } from "../../tramte-management/repository/tramite-state-detail-annex.repository";
import { UploadAnnexService } from "../../tramte-management/services/upload-annex.service";
import { GetUserDTO } from "../../users/model/dto/get-user.dto";
import { AddInitialPaymentDTO } from "../model/dto/add-initial-payment.dto";

export class AddInitialPaymentService {

    private tramiteRepo: TramiteRepository = new TramiteRepository();
    private uploadAnnexService: UploadAnnexService = new UploadAnnexService();
    private tramiteStateDetailService: TramiteStateDetailService = new TramiteStateDetailService();
    private annexRepository: TramiteStateDetailAnnexRepository = new TramiteStateDetailAnnexRepository();
    private tramiteStateAnnexObjectMapper: TramiteStateAnnexObjectMapper = new TramiteStateAnnexObjectMapper()

    async addInitialPayment(addInitialPaymentDTO: AddInitialPaymentDTO, userDto: GetUserDTO) {
        const { tramite_id, observaciones } = addInitialPaymentDTO
        const lastTramiteStateDetail = await this.tramiteStateDetailService.getLastTramiteStateDetailByIdAndState(tramite_id, EstadoTramiteEnum.EnValidacion)
        if (lastTramiteStateDetail) {
            const createTramiteStateDetailDTO: CreateTramiteStateDetailDTO = {
                currentState: EstadoTramiteEnum.EnTramite,
                lastState: EstadoTramiteEnum.PendienteDePago,
                idTramite: tramite_id,
                infInformer: userDto.id,
                observations: observaciones
            }
            await this.tramiteRepo.updateTramiteState(tramite_id, EstadoTramiteEnum.EnTramite);
            await this.tramiteStateDetailService.createTramiteStateDetail(createTramiteStateDetailDTO);
            this.uploadAnnexService.setUserContext(userDto);

            const urlResultFromS3 = await this.uploadAnnexService.uploadFilesToS3Buckets(addInitialPaymentDTO.soportePago, `pago para tramite${tramite_id}`)
            const paymentDOcument = this.tramiteStateAnnexObjectMapper.mapUrlsToInterface(
                urlResultFromS3, "payment", lastTramiteStateDetail.getDataValue('id'), observaciones);

            return await this.annexRepository.saveTramiteStateDetailAnnex(paymentDOcument);
        }else{
            throw new Error('Can not get last tramite state detal of tramite: ' + tramite_id);
        }
    }
}