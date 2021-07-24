import { GetTramiteDTO } from "../../tramite/model/dto/get-tramite/getTramite.dto";
import { TramiteRepository } from "../../tramite/repository/tramite.repository";
import { GetTramitesObjectMapper } from "../../tramite/service/object-mappers/get-tramites.objectMapper";
import { GetUserDTO } from "../model/dto/get-user.dto";
import { Logger } from "tslog";

const log: Logger = new Logger();

export class SolicitanteTramitesService {

    private getTramiteObjectMapper: GetTramitesObjectMapper = new GetTramitesObjectMapper();
    private tramiteRepository: TramiteRepository = new TramiteRepository();

    async getTramitesSolicitante(userDto: GetUserDTO | null): Promise<GetTramiteDTO[] | []> {
        if (userDto) {
            const solicitanteId = userDto.id;
            const tramitesOfSolicitante = await this.tramiteRepository.getTramitesSolicitante(solicitanteId);
            if (tramitesOfSolicitante) {
                const tramitesDTO: GetTramiteDTO[] = this.getTramiteObjectMapper.mapModelToDto(tramitesOfSolicitante);
                return tramitesDTO;
            }else{
                return [];
            }
        }
        throw new Error(`Can't get user`);
    }

}