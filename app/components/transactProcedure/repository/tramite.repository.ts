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

    guardarTramiteModel(tramite: TramiteI){
        const tramiteRepo = this.getRepository();
        try{
            tramiteRepo.create(tramite);
        }catch(exceptio){
            console.log('Error al guardar tramite: ', tramite);
        }
        
    }
    
}