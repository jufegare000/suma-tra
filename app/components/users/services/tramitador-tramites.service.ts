import { GetTramiteDTO } from "../../tramite/model/dto/get-tramite/getTramite.dto";
import { TramiteRepository } from "../../tramite/repository/tramite.repository";
import { GetTramitesObjectMapper } from "../../tramite/service/object-mappers/get-tramites.objectMapper";
import { UserModel } from "../model/db/user.model";
import { UsersRepository } from "../repository/users.repository";

export class TramitadorTramitesService {

    private userRepository: UsersRepository = new UsersRepository();
    private getTramiteObjectMapper: GetTramitesObjectMapper = new GetTramitesObjectMapper();
    private tramiteRepository: TramiteRepository = new TramiteRepository();


    async getTramitesTramitadorByMail(email: string): Promise<GetTramiteDTO[] | null> {
        try {
            const usuarioCrudo: UserModel | null = await this.userRepository.getUserByMail(email);
            if (usuarioCrudo) {
                const tramitadorId = usuarioCrudo.getDataValue("id")
                const tramitesOfTramitador = await this.tramiteRepository.getTramitesTramitador(tramitadorId);
                if (tramitesOfTramitador) {
                    const tramitesDTO: GetTramiteDTO[] = this.getTramiteObjectMapper.mapModelToDto(tramitesOfTramitador);
                    return tramitesDTO;
                }
            }
        } catch (ex) {
            throw new Error(`Can't get user`);
        }
        return null;
    }

}