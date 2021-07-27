import { DocumentoTramiteDTO } from "../create-tramite/documento-tramite.dto";

export interface UpdateImagenesMatriculaDTO {
    frontal?:DocumentoTramiteDTO,
    trasera?: DocumentoTramiteDTO
}