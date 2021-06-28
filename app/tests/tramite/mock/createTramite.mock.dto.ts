import { CreateTramiteDTO } from "../../../components/tramite/model/dto/createTramite.dto"

export const createTramiteDTOMock: CreateTramiteDTO = {
    cedula_comprador: '1133444',
    cedula_vendedor: '1212111',
    direccion_solicitante: 'Cl 44322 1122',
    modelo: 1994,
    organismo_transito_id: 1,
    placa: 'MMV11E',
    solicitante_id: 1,
    tipo_vehiculo: 1,
    observaciones: 'Esto es un trámite de prueba'
}

export const createdTramiteDTOMock: CreateTramiteDTO = {
    cedula_comprador: '1133444',
    cedula_vendedor: '1212111',
    direccion_solicitante: 'Cl 44322 1122',
    id: 1,
    modelo: 1994,
    organismo_transito_id: 1,
    placa: 'MMV11E',
    solicitante_id: 2,
    tipo_vehiculo: 1,
    observaciones: 'Esto es un trámite de prueba'
}