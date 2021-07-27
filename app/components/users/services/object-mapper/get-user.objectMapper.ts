import { UserModel } from "../../model/db/user.model";
import { GetUserDTO } from '../../model/dto/get-user.dto';
import { UserI } from "../../model/interfaces/tramiUser.interface";

export class GetUserObjectMapper {

    mapModelToDto(userModel: UserModel): GetUserDTO {
        const email: string = userModel.getDataValue('email');
        const idUser: number = userModel.getDataValue('id');
        const role: string = userModel.getDataValue('role');
        const userDto: GetUserDTO = {
            email: email,
            id: idUser,
            role: role
        }
        return userDto;
    }

    mapDTOToInterface(getUserDTO: GetUserDTO): UserI {
        return {  
            email: getUserDTO.email,
            role: getUserDTO.role,
            id: getUserDTO.id
        }
    }
}