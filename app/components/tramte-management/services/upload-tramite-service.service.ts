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
    private tramiteRepo: TramiteRepository = new TramiteRepository()

    async uploadFormats(uploadTramiteFormatsDTO: UploadTramiteFormatsDTO, user: GetUserDTO) {
        const tramiteStateDetail = this.tramiteStateDetailObjectMapper.mappDtoToInferface(uploadTramiteFormatsDTO, user.id);
        const newTramiteStateDetail = await this.tramiteStateDetailRepo.saveTramiteStateDetail(tramiteStateDetail);
        await this.tramiteRepo.updateTramiteState(uploadTramiteFormatsDTO.tramite_id, 3);
        await this.uploadAnnexService.uploadAnnexForTramiteStateDetail(
            uploadTramiteFormatsDTO, user, newTramiteStateDetail.getDataValue("id")
        );
        return newTramiteStateDetail;
    }

}