import { TramiteModel } from "../../model/db/tamite.model";
import { CreateTramiteDTO } from "../../model/dto/create-tramite/create-tramite.dto";
import { DocumentoTramiteDTO } from "../../model/dto/create-tramite/documento-tramite.dto";
import { TramiteDocumentoI } from "../../model/interface/document-tramite.interface";
import { TramiteI } from "../../model/interface/tramite.interface";

export class CreateDocumentObjectMapper {

    mapDtoToTramiteI(descripcion: string, tramiteId: number, url: string): TramiteDocumentoI{
        return {
            descripcion: descripcion,
            tramite_id: tramiteId,
            url: url
        }
    }
}