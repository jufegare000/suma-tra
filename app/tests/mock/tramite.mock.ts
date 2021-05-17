import { TramiteI } from "../../components/transactProcedure/model/interface/tramite.interface";

export const tramitePendienteDeaprobacionMock: TramiteI 
    = 
        {
            tipo_vehiculo: 1,
            solicitante_id: 1,
            placa: "MMV11E",
            modelo: 1994,
            organismo_transito_id: 1,
            direccion_solicitante: "Cl 44322 1122",
            cedula_comprador: "1133444",
            cedula_vendedor: "1212111",
            estado_id: 1, // estado pendiente de aprobación
            observaciones: "Esto es un trámite de prueba"
        }


