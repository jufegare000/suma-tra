import { UserModel } from "../../model/db/user.model";
import { GetUserDTO } from '../../model/dto/get-user.dto';

export class GetUserObjectMapper {
    
    mapModelToDto(userModel: UserModel): GetUserDTO {
        return {
            email: userModel.getDataValue('email'),
            id: userModel.getDataValue('email'),
            role: userModel.getDataValue('role')
        }
    }
}