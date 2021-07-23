import { UserModel } from "../../model/db/user.model";
import { GetUserDTO } from '../../model/dto/get-user.dto';

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
}