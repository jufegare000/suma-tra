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

    async getDocumentosTramiteByIdTramite(idTramite: number): Promise<DocumentoTramiteModel[]> {
        const documentoTramiteRepo = this.getRepository();
        try {
            return documentoTramiteRepo.findAll({where: {tramite_id!: idTramite}});
        } catch (error) {
            throw new Error(`Can not get all documentos for tramite ${idTramite}`)
        }
    }

    async saveDocumentoTramite(documentoTramite: TramiteDocumentoI): Promise<DocumentoTramiteModel>{
        const documentoTramiteRepo = this.getRepository();
        return await documentoTramiteRepo.create(documentoTramite);
    }

    async saveDocumentosTramite(documentosTramite: TramiteDocumentoI[]){
        const documentoTramiteRepo = this.getRepository();
        return await documentoTramiteRepo.bulkCreate(documentosTramite);
    }

    async getTramiteDocumentoById(id: number):Promise<DocumentoTramiteModel|null>{
        const documentoTramiteRepo = this.getRepository();
        try{
            return documentoTramiteRepo.findByPk(id);  
        }catch(ex){
            throw new Error('Not found exception');
        }         
    }

}