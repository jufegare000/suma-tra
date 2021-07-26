import { TramiteFormatsDTO } from "./tramite-formats.dto";

export interface UploadTramiteFormatsDTO {
    archivos: TramiteFormatsDTO,
    tramite_id: number,
    observaciones?: string,
}