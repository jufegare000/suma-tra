import { GetTramiteDTO } from "../../tramite/model/dto/getTramite.dto";
import { TramiteRepository } from "../../tramite/repository/tramite.repository";
import { GetTramitesObjectMapper } from "../../tramite/service/get-tramite/get-tramites.objectMapper";
import { UserModel } from "../model/db/user.model";
import { UsersRepository } from "../repository/users.repository";

export class SolicitanteTramitesService {

    private userRepository: UsersRepository = new UsersRepository();
    private getTramiteObjectMapper: GetTramitesObjectMapper = new GetTramitesObjectMapper();
    private tramiteRepository: TramiteRepository = new TramiteRepository();


    async getTramitesSolicitanteByMail(email: string): Promise<GetTramiteDTO[] | null> {
        try {
            const usuarioCrudo: UserModel | null = await this.userRepository.getUserByMail(email);
            if (usuarioCrudo) {
                const solicitanteId = usuarioCrudo.getDataValue("id")
                const tramitesOfSolicitante = await this.tramiteRepository.getTramitesSolicitante(solicitanteId);
                if (tramitesOfSolicitante) {
                    const tramitesDTO: GetTramiteDTO[] = this.getTramiteObjectMapper.mapModelToDto(tramitesOfSolicitante);
                    return tramitesDTO;
                }
            }
        } catch (ex) {
            throw new Error(`Can't get user`);
        }
        return null;
    }

}