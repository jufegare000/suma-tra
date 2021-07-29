import { Repository, Not } from "sequelize-typescript";
import { Op } from "sequelize"
import { sequalize } from "../../../config/db/db";
import { EstadoTramiteEnum } from "../../../enums/tramites/estado-tramite.enum";
import { TramiteModel } from "../model/db/tamite.model";
import { UpdateTramiteDTO } from "../model/dto/update-tramite/update-tramite.dto";
import { TramiteI } from "../model/interface/tramite.interface";

export class TramiteRepository {

    repository: Repository<TramiteModel> | undefined;

    getRepository(): Repository<TramiteModel> {
        if (!this.repository) {
            this.repository = sequalize.getRepository(TramiteModel);
        }
        return this.repository;
    }

    async getAllTramites(): Promise<TramiteModel[] | null> {
        const tramiteRepo = this.getRepository();
        try {
            return await tramiteRepo.findAll();
        } catch (ex) {
            throw new Error(`Database error:${ex}`);
        }
    }

    async getPendingTramites(): Promise<TramiteModel[] | null> {
        const tramiteRepo = this.getRepository();
        try {
            return await tramiteRepo.findAll({ where: { estado_id: EstadoTramiteEnum.PendienteDeAprobacion } });
        } catch (ex) {
            throw new Error(`Database error:${ex}`);
        }
    }

    async guardarTramiteModel(tramite: TramiteI): Promise<TramiteModel> {
        const tramiteRepo = this.getRepository();
        return await tramiteRepo.create(tramite);
    }

    async eliminarTramite(tramiteModel: TramiteModel | null) {
        try {
            if (tramiteModel)
                await tramiteModel.destroy();
        } catch (error) {
            return null;
        }
    }

    async getTramiteById(id: number): Promise<TramiteModel | null> {
        const tramiteRepo = this.getRepository();
        try {
            return tramiteRepo.findByPk(id);
        } catch (ex) {
            throw new Error('Not found exception');
        }
    }

    async getTramitesTramitador(idTramitador: number): Promise<TramiteModel[] | null> {
        const tramiteRepo = this.getRepository();
        try {
            return tramiteRepo.findAll({ where: { tramitador_id: idTramitador, estado_id: { [Op.not]: 0 } } });
        } catch (ex) {
            throw new Error('Not found exception');
        }
    }

    async updateTramiteWithTramitadorAndState(tramitadorId: number, tramiteId: number, state: number): Promise<[number, TramiteModel[]]> {
        const tramiteRepo = this.getRepository();
        try {
            return await tramiteRepo.update({
                tramitador_id: tramitadorId,
                estado_id: state
            },
                { where: { id: tramiteId } }
            )
        } catch (error) {
            throw new Error('Database error');
        }
    }

    async updateTramiteState(tramiteId: number, state: number) {
        const tramiteRepo = this.getRepository();
        try {
            return await tramiteRepo.update({
                estado_id: state
            },
                { where: { id: tramiteId } }
            )
        } catch (error) {
            throw new Error('Database error');
        }
    }

    async getTramitesSolicitante(idSolicitante: number): Promise<TramiteModel[] | null> {
        const tramiteRepo = this.getRepository();
        try {
            return tramiteRepo.findAll({ where: { solicitante_id: idSolicitante, estado_id: { [Op.not]: 0 } } });
        } catch (ex) {
            throw new Error('Database error');
        }
    }

    async updateGeneralInformation(updatetramiteDTO: UpdateTramiteDTO) {
        const tramiteRepo = this.getRepository();
        try {
            return await tramiteRepo.update({
                tipo_vehiculo: updatetramiteDTO.tipo_vehiculo,
                placa: updatetramiteDTO.placa,
                modelo: updatetramiteDTO.modelo,
                organismo_transito_id: updatetramiteDTO.organismo_transito_id,
                direccion_solicitante: updatetramiteDTO.direccion_solicitante,
                cedula_comprador: updatetramiteDTO.cedula_comprador,
                cedula_vendedor: updatetramiteDTO.cedula_vendedor,
                observaciones: updatetramiteDTO.observaciones
            },
                { where: { id: updatetramiteDTO.id } }
            )
        } catch (error) {
            throw new Error('Database error');
        }
    }
}