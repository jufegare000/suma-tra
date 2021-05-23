import { Repository } from "sequelize-typescript";
import { sequalize } from "../../../config/db/db";
import { UserModel } from "../model/db/user.model"; 
import { UserI } from "../model/interfaces/tramiUser.interface";

export class UsersRepository {

    repository: Repository<UserModel> | undefined;

    getRepository(): Repository<UserModel> {
        if(!this.repository){
            this.repository = sequalize.getRepository(UserModel);
        }
        return this.repository;
    }

    async guardarUsuarioModel(tramite: UserI): Promise<UserModel>{
        const userRepo = this.getRepository();
        return await userRepo.create(tramite);
    }

    async getUserById(id: number):Promise<UserModel|null>{
        const userRepo = this.getRepository();
        try{
            return userRepo.findByPk(id);  
        }catch(ex){
            throw new Error('Not found exception');
        }         
    }
    
}