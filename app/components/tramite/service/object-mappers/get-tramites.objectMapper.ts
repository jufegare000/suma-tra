import { GetTramiteDTO } from "../../model/dto/get-tramite/getTramite.dto";
import { TramiteModel } from "../../model/db/tamite.model";
export class GetTramitesObjectMapper {

    mapModelToDto(tramitesModel: TramiteModel[]): GetTramiteDTO[] {

        const tramitesDTO: GetTramiteDTO[] = [];
        tramitesModel.forEach(tramiteModel => {
            tramitesDTO.push({
                id: tramiteModel.getDataValue('id'),
                fecha_creacion: tramiteModel.getDataValue('fecha_creacion'),
                cedula_comprador: tramiteModel.getDataValue('cedula_comprador'),
                cedula_vendedor: tramiteModel.getDataValue('cedula_vendedor'),
                direccion_solicitante: tramiteModel.getDataValue('direccion_solicitante'),
                modelo: tramiteModel.getDataValue('modelo'),
                organismo_transito_id: tramiteModel.getDataValue('organismo_transito_id'),
                placa: tramiteModel.getDataValue('placa'),
                solicitante: tramiteModel.getDataValue('solicitante_id'),
                tramitador: tramiteModel.getDataValue('tramitador_id'),
                tipo_vehiculo: tramiteModel.getDataValue('tipo_vehiculo'),
                estado_id: tramiteModel.getDataValue('estado_id'),
                observaciones: tramiteModel.getDataValue('observaciones'),
                valor_total: tramiteModel.getDataValue('valor_total')
            });
        });
        return tramitesDTO;
    }
}