import { SolicitanteEnum } from "../../../enums/user/solicitante.enum";
import { TramiUserModel } from "../../../models/tramiUser.model";
import { GetTramiteDTO } from "../../tramite/model/dto/getTramite.dto";
import { TramiteRepository } from "../../tramite/repository/tramite.repository";
import { GetTramitesObjectMapper } from "../../tramite/service/get-tramite/get-tramites.objectMapper";
import { UserModel } from "../model/db/user.model";
import { GetUserDTO } from "../model/dto/get-user.dto";
import { UserI } from "../model/interfaces/tramiUser.interface";
import { UsersRepository } from "../repository/users.repository";
import { GetUserObjectMapper } from "./object-mapper/get-user.objectMapper";
import { TramiUserService } from "./trami-user.service";

export class SolicitanteTramitesService {

    private userRepository: UsersRepository = new UsersRepository();
    private getTramiteObjectMapper: GetTramitesObjectMapper = new GetTramitesObjectMapper();
    private getUserObjectMapper: GetUserObjectMapper = new GetUserObjectMapper();
    private tramiteRepository: TramiteRepository = new TramiteRepository();
    private tramiUserService: TramiUserService = new TramiUserService();

    async getTramitesSolicitanteByMail(email: string): Promise<GetTramiteDTO[] | null> {
        try {

            const userDto: GetUserDTO = await this.tramiUserService.validateTramiUserInDB(email, SolicitanteEnum.role);

            const solicitanteId = userDto.id;
            const tramitesOfSolicitante = await this.tramiteRepository.getTramitesSolicitante(solicitanteId);
            if (tramitesOfSolicitante) {
                const tramitesDTO: GetTramiteDTO[] = this.getTramiteObjectMapper.mapModelToDto(tramitesOfSolicitante);
                return tramitesDTO;
            }
        } catch (ex) {
            throw new Error(`Can't get user`);
        }
        return null;
    }


    async createInexistentSolicitanteByMail(email: string): Promise<GetUserDTO> {
        const userDtoForDB: UserI = {
            email: email,
            role: SolicitanteEnum.role
        }
        try {
            const newUser: UserModel = await this.userRepository.guardarUsuarioModel(userDtoForDB);
            return this.getUserObjectMapper.mapModelToDto(newUser);
        } catch (error) {
            throw new Error(`Can not create User solicitante because: ${error}`)
        }
    }

}