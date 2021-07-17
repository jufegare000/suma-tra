import { Repository } from "sequelize-typescript";
import { sequalize } from "../../../config/db/db";
import { DocumentoTramiteModel } from "../model/db/documento-tramite.model";
import { TramiteDocumentoI } from "../model/interface/document-tramite.interface";

export class DocumentoTramiteRepository {

    repository: Repository<DocumentoTramiteModel> | undefined;

    getRepository(): Repository<DocumentoTramiteModel> {
        if(!this.repository){
            this.repository = sequalize.getRepository(DocumentoTramiteModel);
        }
        return this.repository;
    }

    async getAllTramites(): Promise<DocumentoTramiteModel[] | null> {
        const tramiteRepo = this.getRepository();
        try {
            return await tramiteRepo.findAll();
        }catch(ex) {
            throw new Error(`Database error:${ex}`);
        }
    }

    async guardarTramiteModel(tramite: TramiteDocumentoI): Promise<DocumentoTramiteModel>{
        const tramiteRepo = this.getRepository();
        return await tramiteRepo.create(tramite);
    }

    async eliminarTramite(tramiteModel: DocumentoTramiteModel | null){
        try{
            if(tramiteModel)
            await tramiteModel.destroy();
        }catch(error){
            return null;
        }
    }

    async getTramiteById(id: number):Promise<DocumentoTramiteModel|null>{
        const tramiteRepo = this.getRepository();
        try{
            return tramiteRepo.findByPk(id);  
        }catch(ex){
            throw new Error('Not found exception');
        }         
    }

    async getTramitesTramitador(idTramitador:number): Promise<DocumentoTramiteModel[]|null>{
        const tramiteRepo = this.getRepository();
        try{
            return tramiteRepo.findAll({where: {tramitador_id:idTramitador}});  
        }catch(ex){
            throw new Error('Not found exception');
        }      
    }

    async getTramitesSolicitante(idSolicitante:number): Promise<DocumentoTramiteModel[]|null>{
        const tramiteRepo = this.getRepository();
        try{
            return tramiteRepo.findAll({where: {solicitante_id:idSolicitante}});  
        }catch(ex){
            throw new Error('Not found exception');
        }      
    }
}