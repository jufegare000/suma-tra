import { TramiteFormatsDTO } from "./tramite-formats.dto";

export interface UploadTramiteFormats {
    archivos: TramiteFormatsDTO,
    tramite_id: number,
    observaciones?: string,
}