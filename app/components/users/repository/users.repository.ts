import { Repository } from "sequelize-typescript";
import { sequalize } from "../../../config/db/db";
import { UserModel } from "../model/db/user.model";
import { UserI } from "../model/interfaces/tramiUser.interface";

export class UsersRepository {

    repository: Repository<UserModel> | undefined;

    getRepository(): Repository<UserModel> {
        if (!this.repository) {
            this.repository = sequalize.getRepository(UserModel);
        }
        return this.repository;
    }

    async guardarUsuarioModel(tramiteUser: UserI): Promise<UserModel> {
        try {
            const userRepo = this.getRepository();
            return await userRepo.create(tramiteUser);
        } catch (ex) {
            throw new Error(`Error: ${ex}`);
        }
    }

    async getUserById(id: number): Promise<UserModel | null> {
        const userRepo = this.getRepository();
        try {
            return userRepo.findByPk(id);
        } catch (ex) {
            throw new Error('Not found exception');
        }
    }

    async getUserByMail(email: string) {
        const userRepo = this.getRepository();
        try {
            return userRepo.findOne({ where: { email: email } });
        } catch (ex) {
            throw new Error('Not found exception');
        }
    }

    async deleteUser(id: number) {
        try {
            this.getRepository().destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error(`User can not be deleted: ${error}`);
        }
    }

}