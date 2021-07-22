import { TramiteModel } from "../../model/db/tamite.model";
import { CreateTramiteDTO } from "../../model/dto/create-tramite/create-tramite.dto";
import { TramiteI } from "../../model/interface/tramite.interface";

export class CreateTramiteObjectMapper {

    mapModelToDto(tramiteModel: TramiteModel): CreateTramiteDTO {
        return {
            id: tramiteModel.getDataValue('id'),
            cedula_comprador: tramiteModel.getDataValue('cedula_comprador'),
            cedula_vendedor: tramiteModel.getDataValue('cedula_vendedor'),
            direccion_solicitante: tramiteModel.getDataValue('direccion_solicitante'),
            modelo: tramiteModel.getDataValue('modelo'),
            organismo_transito_id: tramiteModel.getDataValue('organismo_transito_id'),
            placa: tramiteModel.getDataValue('placa'),
            solicitante_id: tramiteModel.getDataValue('solicitante_id'),
            tipo_vehiculo: tramiteModel.getDataValue('tipo_vehiculo'),
            observaciones: tramiteModel.getDataValue('observaciones')
        }
    }

    mapDtoToTramiteI(createTramiteDTO: CreateTramiteDTO, solicitanteId?: number): TramiteI {
        if (solicitanteId) {
            return {
                cedula_comprador: createTramiteDTO.cedula_comprador,
                cedula_vendedor: createTramiteDTO.cedula_vendedor,
                direccion_solicitante: createTramiteDTO.direccion_solicitante,
                estado_id: 1,
                modelo: createTramiteDTO.modelo,
                observaciones: createTramiteDTO.observaciones,
                organismo_transito_id: createTramiteDTO.organismo_transito_id,
                placa: createTramiteDTO.placa,
                solicitante_id: solicitanteId,
                tipo_vehiculo: createTramiteDTO.tipo_vehiculo
            }
        } else {
            return {
                cedula_comprador: createTramiteDTO.cedula_comprador,
                cedula_vendedor: createTramiteDTO.cedula_vendedor,
                direccion_solicitante: createTramiteDTO.direccion_solicitante,
                estado_id: 1,
                modelo: createTramiteDTO.modelo,
                observaciones: createTramiteDTO.observaciones,
                organismo_transito_id: createTramiteDTO.organismo_transito_id,
                placa: createTramiteDTO.placa,
                solicitante_id: createTramiteDTO.solicitante_id,
                tipo_vehiculo: createTramiteDTO.tipo_vehiculo
            }
        }

    }
}