import { Repository } from "sequelize-typescript";
import { sequalize } from "../../../config/db/db";
import { EstadoTramiteEnum } from "../../../enums/tramites/estado-tramite.enum";
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

    async getAllTramites(): Promise<TramiteModel[] | null> {
        const tramiteRepo = this.getRepository();
        try {
            return await tramiteRepo.findAll();
        }catch(ex) {
            throw new Error(`Database error:${ex}`);
        }
    }

    async getPendingTramites(): Promise<TramiteModel[] | null> {
        const tramiteRepo = this.getRepository();
        try {
            return await tramiteRepo.findAll({where: {estudio_id:EstadoTramiteEnum.PendienteDeAprobacion}});
        }catch(ex) {
            throw new Error(`Database error:${ex}`);
        }
    }

    async guardarTramiteModel(tramite: TramiteI): Promise<TramiteModel>{
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

    async getTramitesTramitador(idTramitador:number): Promise<TramiteModel[]|null>{
        const tramiteRepo = this.getRepository();
        try{
            return tramiteRepo.findAll({where: {tramitador_id:idTramitador}});  
        }catch(ex){
            throw new Error('Not found exception');
        }      
    }

    async getTramitesSolicitante(idSolicitante:number): Promise<TramiteModel[]|null>{
        const tramiteRepo = this.getRepository();
        try{
            return tramiteRepo.findAll({where: {solicitante_id:idSolicitante}});  
        }catch(ex){
            throw new Error('Not found exception');
        }      
    }
}