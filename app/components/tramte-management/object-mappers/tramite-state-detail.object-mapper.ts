import { UploadTramiteFormatsDTO } from "../model/dto/upload-tramite-formats.dto";
import { TramiteStateDetailI } from "../model/interface/detalle-estado-tramite.interface";

export class TramiteStateDetailObjectMapper {

    mappDtoToInferface(uploadTramiteFormatsDTO: UploadTramiteFormatsDTO, userId: number) {
        const tramiteStateDetailInterface: TramiteStateDetailI = {
            fecha_cambio_estado : new Date(),
            id_estado_actual: 3,
            id_estado_anterior: 2,
            id_informador: userId,
            id_tramite: uploadTramiteFormatsDTO.tramite_id,
            observaciones: uploadTramiteFormatsDTO.observaciones
        }
        return tramiteStateDetailInterface;
    }
}