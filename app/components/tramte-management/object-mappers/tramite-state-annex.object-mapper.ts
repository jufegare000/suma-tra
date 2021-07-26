import { AnexoEstadoTramiteI } from "../model/interface/estado_tramite_anexo.interface";

export class TramiteStateAnnexObjectMapper {
    mapUrlsToInterface(url: string, description: string, detailStateTramiteId: number, comment: string): AnexoEstadoTramiteI {
        const annexInterface: AnexoEstadoTramiteI = {
            descripcion_anexo: description,
            id_detalle: detailStateTramiteId,
            url_anexo: url,
            comentario: comment,
        }
        return annexInterface;
    }
}