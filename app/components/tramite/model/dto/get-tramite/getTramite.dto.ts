import { GetUserDTO } from "../../../../users/model/dto/get-user.dto";
import { GetDocumentosTramiteDTO } from "./get-documetos-tramite.dto";

export interface GetTramiteDTO {
    id?: number;
    solicitante?: GetUserDTO | null;
    tramitador?: GetUserDTO | null;
    tipo_vehiculo: number;
    placa: string;
    modelo: number;
    organismo_transito_id: number;
    direccion_solicitante: string;
    cedula_comprador: string;
    cedula_vendedor: string;
    observaciones?: string;
    archivos?: GetDocumentosTramiteDTO
}