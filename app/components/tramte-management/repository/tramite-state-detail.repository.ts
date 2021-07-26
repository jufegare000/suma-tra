import { Repository } from "sequelize-typescript";
import { sequalize } from "../../../config/db/db";
import { TramiteStateDetailModel } from "../model/bd/detalle-estado-tramite.model";
import { TramiteStateDetailI } from "../model/interface/detalle-estado-tramite.interface";


export class TramiteStateDetailRepository {


    repository: Repository<TramiteStateDetailModel> | undefined;

    getRepository(): Repository<TramiteStateDetailModel> {
        if (!this.repository) {
            this.repository = sequalize.getRepository(TramiteStateDetailModel);
        }
        return this.repository;
    }

    async saveTramiteStateDetail(tramiteStateDetail: TramiteStateDetailI): Promise<TramiteStateDetailModel> {
        try {
            const tramiteSDRepo = this.getRepository();
            return await tramiteSDRepo.create(tramiteStateDetail);
        } catch (error) {
            throw new Error(`Can not create detail because: ${error}`)
        }
        
    }


    async getTramiteById(id: number): Promise<TramiteStateDetailModel | null> {
        const tramiteRepo = this.getRepository();
        try {
            return tramiteRepo.findByPk(id);
        } catch (ex) {
            throw new Error('Not found exception');
        }
    }
}