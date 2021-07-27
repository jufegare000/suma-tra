import { UpdateDocumentosImplicadosTramiteDTO } from "./update-documentos-implicados.dto";
import { UpdateImagenesMatriculaDTO } from "./update-imagenes-matricula.dto";


export interface UpdateArchivosTramiteDTO {
    documentos?: UpdateDocumentosImplicadosTramiteDTO,
    imagenes_matricula?: UpdateImagenesMatriculaDTO
}