import { ignoredRoutes } from "express-winston";
import { Repository } from "sequelize-typescript";
import { DatabaseError } from "sequelize/types";
import { sequalize } from "../../../config/db/db";
import { TramiteModel } from "../model/db/tamite.model";
import { TramiteI } from "../model/interface/tramite.interface";

export class TramiteRepository {

    repository: Repository<TramiteModel> | undefined;

    getRepository(): Repository<TramiteModel> {
        if(!this.repository){
            this.repository = sequalize.getRepository(TramiteModel);
        }
        return this.repository;
    }

    async guardarTramiteModel(tramite: TramiteI){
        const tramiteRepo = this.getRepository();
        return await tramiteRepo.create(tramite);
    }

    async eliminarTramite(tramiteModel: TramiteModel | null){
        try{
            if(tramiteModel)
            await tramiteModel.destroy();
        }catch(error){
            return null;
        }
    }

    async getTramiteById(id: number):Promise<TramiteModel|null>{
        const tramiteRepo = this.getRepository();
        try{
            return tramiteRepo.findByPk(id);  
        }catch(ex){
            throw new Error('Not found exception');
        }         
    }
    
}