import { Repository } from "sequelize-typescript";
import { sequalize } from "../../../config/db/db";
import { TramiteStateDetailAnnexModel } from "../model/bd/estado_tramite_anexo.model";
import { AnexoEstadoTramiteI } from "../model/interface/estado_tramite_anexo.interface";


export class TramiteStateDetailAnnexRepository {


    repository: Repository<TramiteStateDetailAnnexModel> | undefined;

    getRepository(): Repository<TramiteStateDetailAnnexModel> {
        if (!this.repository) {
            this.repository = sequalize.getRepository(TramiteStateDetailAnnexModel);
        }
        return this.repository;
    }

    async saveTramiteStateDetailAnnex(tramiteStateDetailAnnex: AnexoEstadoTramiteI): Promise<TramiteStateDetailAnnexModel> {
        const tramiteSDRepo = this.getRepository();
        return await tramiteSDRepo.create(tramiteStateDetailAnnex);
    }


    async getTramiteById(id: number): Promise<TramiteStateDetailAnnexModel | null> {
        const tramiteRepo = this.getRepository();
        try {
            return tramiteRepo.findByPk(id);
        } catch (ex) {
            throw new Error('Not found exception');
        }
    }
}