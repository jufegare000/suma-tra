import { GetTramiteDTO } from "../../model/dto/getTramite.dto";
import { TramiteModel } from "../../model/db/tamite.model";
import { TramiUserService } from "../../../users/services/trami-user.service";


export class GetTramitesObjectMapper {

    private userService: TramiUserService = new TramiUserService();

    mapModelToDto(tramitesModel: TramiteModel[]): GetTramiteDTO[] {

        const tramitesDTO: GetTramiteDTO[] = [];
        tramitesModel.forEach(tramiteModel => {
            tramitesDTO.push({
                id: tramiteModel.getDataValue('id'),
                cedula_comprador: tramiteModel.getDataValue('cedula_comprador'),
                cedula_vendedor: tramiteModel.getDataValue('cedula_vendedor'),
                direccion_solicitante: tramiteModel.getDataValue('direccion_solicitante'),
                modelo: tramiteModel.getDataValue('modelo'),
                organismo_transito_id: tramiteModel.getDataValue('organismo_transito_id'),
                placa: tramiteModel.getDataValue('placa'),
                solicitante: tramiteModel.getDataValue('solicitante_id'),
                tramitador: tramiteModel.getDataValue('tramitador_id'),
                tipo_vehiculo: tramiteModel.getDataValue('tipo_vehiculo'),
                observaciones: tramiteModel.getDataValue('observaciones')
            });
        });
        return tramitesDTO;
    }
}