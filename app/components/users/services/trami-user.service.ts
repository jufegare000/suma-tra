import { CreateTramiteDTO } from "../../tramite/model/dto/createTramite.dto";
import { UserModel } from "../model/db/user.model";
import { GetUserDTO } from "../model/dto/get-user.dto";
import { UsersRepository } from "../repository/users.repository";
import { GetUserObjectMapper } from "./object-mapper/get-user.objectMapper";

export class TramiUserService {
    private userRepository: UsersRepository = new UsersRepository();
    private getTramiteObjectMapper: GetUserObjectMapper = new GetUserObjectMapper();

    async createTramite(createTramiteDTO: CreateTramiteDTO){

        // const response = this.createTramiteResponseBuilder.getSumatraResponse(null, );
        // first validate tramite creation
        // get entity and map values
        // map response
        // return tramite creation
        
    }

    async getTramiUserById(userId: number): Promise<GetUserDTO|null> {
        try {
            
            const usuarioCrudo: UserModel|null = await this.userRepository.getUserById(userId);
            if(usuarioCrudo){
                const tramiteDTO: GetUserDTO = this.getTramiteObjectMapper.mapModelToDto(usuarioCrudo);
                return tramiteDTO;
            }
        }catch(ex){
            throw new Error(`Can't get user`);
        }
        return null;
    }

}