import { UpdateTramiteDTO } from "../../model/dto/update-tramite/update-tramite.dto";
import { TramiteRepository } from "../../repository/tramite.repository";

export class UpdateTramiteService {
    private tramiteRepo: TramiteRepository = new TramiteRepository();
    async updateTramite(updateTramiteDto: UpdateTramiteDTO) {
        await this.tramiteRepo.updateGeneralInformation(updateTramiteDto);
    }
}