import { TramiteI } from "../../../components/tramite/model/interface/tramite.interface"; 

export const tramitePendienteDeaprobacionMock: TramiteI 
    = 
        {
            cedula_comprador: "1133444",
            cedula_vendedor: "1212111",
            direccion_solicitante: "Cl 44322 1122",
            estado_id: 1, // estado pendiente de aprobación
            modelo: 1994,
            observaciones: "Esto es un trámite de prueba",
            organismo_transito_id: 1,
            placa: "MMV11E",
            solicitante_id: 1,
            tipo_vehiculo: 1
        };


