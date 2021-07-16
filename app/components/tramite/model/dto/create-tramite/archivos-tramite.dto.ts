import { DocumentosImplicadosTramiteDTO } from "./create-tramite-documentos.dto";
import { ImagenesMatriculaDTO } from "./imagenes-matricula.dto";

export interface ArchivosTramiteDTO {
    documentos: DocumentosImplicadosTramiteDTO,
    imagenes_matricula: ImagenesMatriculaDTO
}