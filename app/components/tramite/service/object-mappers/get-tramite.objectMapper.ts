import { GetTramiteDTO } from "../../model/dto/get-tramite/getTramite.dto";
import { TramiteModel } from "../../model/db/tamite.model";
import { TramiUserService } from "../../../users/services/trami-user.service";
export class GetTramiteObjectMapper {

    private userService: TramiUserService = new TramiUserService();

    async mapModelToDto(tramiteModel: TramiteModel): Promise<GetTramiteDTO> {

        const usuarios = await this.getUsuariosAsociadosAltramite(tramiteModel);
        return {
            id: tramiteModel.getDataValue('id'),
            cedula_comprador: tramiteModel.getDataValue('cedula_comprador'),
            cedula_vendedor: tramiteModel.getDataValue('cedula_vendedor'),
            direccion_solicitante: tramiteModel.getDataValue('direccion_solicitante'),
            modelo: tramiteModel.getDataValue('modelo'),
            organismo_transito_id: tramiteModel.getDataValue('organismo_transito_id'),
            placa: tramiteModel.getDataValue('placa'),
            solicitante: usuarios[0],
            tramitador: usuarios[1],
            tipo_vehiculo: tramiteModel.getDataValue('tipo_vehiculo'),
            observaciones: tramiteModel.getDataValue('observaciones')
        }
    }

    addDocumentsToDTO() {
        
    }

    async getUsuariosAsociadosAltramite(tramiteModel: TramiteModel) {
        const idSolicitante = tramiteModel.getDataValue('solicitante_id');
        const idTramitador = tramiteModel.getDataValue('tramitador_id');

        const solicitante = await this.userService.getTramiUserById(idSolicitante);
        const tramitador = await this.userService.getTramiUserById(idTramitador);

        const usuarios = [];
        usuarios.push(solicitante, tramitador);
        return usuarios;
    }
}