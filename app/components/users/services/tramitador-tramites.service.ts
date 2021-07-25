import { GetTramiteDTO } from "../../tramite/model/dto/get-tramite/getTramite.dto";
import { TramiteRepository } from "../../tramite/repository/tramite.repository";
import { GetTramitesObjectMapper } from "../../tramite/service/object-mappers/get-tramites.objectMapper";
import { UserModel } from "../model/db/user.model";
import { GetUserDTO } from "../model/dto/get-user.dto";
import { UsersRepository } from "../repository/users.repository";

export class TramitadorTramitesService {

    private userRepository: UsersRepository = new UsersRepository();
    private getTramiteObjectMapper: GetTramitesObjectMapper = new GetTramitesObjectMapper();
    private tramiteRepository: TramiteRepository = new TramiteRepository();


    async getTramitesTramitadorByMail(userDto: GetUserDTO|null): Promise<GetTramiteDTO[] | []> {
        if (userDto) {
            try {
                const tramitesOfTramitador = await this.tramiteRepository.getTramitesTramitador(userDto.id);
                if (tramitesOfTramitador) {
                    const tramitesDTO: GetTramiteDTO[] = this.getTramiteObjectMapper.mapModelToDto(tramitesOfTramitador);
                    return tramitesDTO;
                }

            } catch (ex) {
                throw new Error(`Can't get user`);
            }
            return [];
        } else {
            throw new Error(`Can not get user`)
        }
    }

}