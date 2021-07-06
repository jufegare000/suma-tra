import { UserModel } from "../model/db/user.model";
import { GetUserDTO } from "../model/dto/get-user.dto";
import { UserI } from "../model/interfaces/tramiUser.interface";
import { UsersRepository } from "../repository/users.repository";
import { GetUserObjectMapper } from "./object-mapper/get-user.objectMapper";

export class TramiUserService {
    private userRepository: UsersRepository = new UsersRepository();
    private getUserObjectMapper: GetUserObjectMapper = new GetUserObjectMapper();

    async getTramiUserById(userId: number): Promise<GetUserDTO|null> {
        try {
            
            const usuarioCrudo: UserModel|null = await this.userRepository.getUserById(userId);
            if(usuarioCrudo){
                const userDto: GetUserDTO = this.getUserObjectMapper.mapModelToDto(usuarioCrudo);
                return userDto;
            }
        }catch(ex){
            throw new Error(`Can't get user`);
        }
        return null;
    }

    async validateTramiUserInDB(email: string, role: string): Promise<GetUserDTO> {
        try {
            const userInDB: UserModel | null = await this.userRepository.getUserByMail(email);
            if (userInDB) {
                return this.getUserObjectMapper.mapModelToDto(userInDB);
            } else {
                const userI: UserI = {
                    email: email,
                    role: role
                }
                return await this.getUserObjectMapper.mapModelToDto(await
                    this.userRepository.guardarUsuarioModel(userI)
                );
            }
        } catch (error) {
            throw new Error(`User can not be reached because: ${error}`)
        }
    }

}