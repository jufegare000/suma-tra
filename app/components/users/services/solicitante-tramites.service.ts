import { UserEnum } from "../../../enums/user/solicitante.enum";
import { GetTramiteDTO } from "../../tramite/model/dto/get-tramite/getTramite.dto";
import { TramiteRepository } from "../../tramite/repository/tramite.repository";
import { GetTramitesObjectMapper } from "../../tramite/service/object-mappers/get-tramites.objectMapper";
import { UserModel } from "../model/db/user.model";
import { GetUserDTO } from "../model/dto/get-user.dto";
import { UserI } from "../model/interfaces/tramiUser.interface";
import { UsersRepository } from "../repository/users.repository";
import { GetUserObjectMapper } from "./object-mapper/get-user.objectMapper";
import { TramiUserService } from "./trami-user.service";
import { Logger } from "tslog";

const log: Logger = new Logger();

export class SolicitanteTramitesService {

    private userRepository: UsersRepository = new UsersRepository();
    private getTramiteObjectMapper: GetTramitesObjectMapper = new GetTramitesObjectMapper();
    private getUserObjectMapper: GetUserObjectMapper = new GetUserObjectMapper();
    private tramiteRepository: TramiteRepository = new TramiteRepository();
    private tramiUserService: TramiUserService = new TramiUserService();

    async getTramitesSolicitante(userDto: GetUserDTO | null): Promise<GetTramiteDTO[] | null> {
        if (userDto) {
            const solicitanteId = userDto.id;
            const tramitesOfSolicitante = await this.tramiteRepository.getTramitesSolicitante(solicitanteId);
            if (tramitesOfSolicitante) {
                const tramitesDTO: GetTramiteDTO[] = this.getTramiteObjectMapper.mapModelToDto(tramitesOfSolicitante);
                return tramitesDTO;
            }else{
                return null;
            }
        }
        throw new Error(`Can't get user`);
    }

}