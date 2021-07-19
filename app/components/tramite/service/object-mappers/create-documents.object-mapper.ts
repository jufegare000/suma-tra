import { DocumentoTramiteModel } from "../../model/db/documento-tramite.model";
import { GetDocumentosTramiteDTO } from "../../model/dto/get-tramite/get-documetos-tramite.dto";
import { TramiteDocumentoI } from "../../model/interface/document-tramite.interface";

export class CreateDocumentObjectMapper {

    mapDtoToTramiteI(descripcion: string, tramiteId: number, url: string): TramiteDocumentoI {
        return { descripcion: descripcion, tramite_id: tramiteId, url: url}; 
    }

    mapDocumentsToDto(documents: DocumentoTramiteModel[]): GetDocumentosTramiteDTO {
        const cedulaComprador = this.getCorrespondingDocumentByDescription(documents, 'cedula_comprador');
        const cedulaVendedor = this.getCorrespondingDocumentByDescription(documents, 'cedula_vendedor');
        const matriculaFrontal = this.getCorrespondingDocumentByDescription(documents, 'matricula_ frontal');
        const matriculaTrasera = this.getCorrespondingDocumentByDescription(documents, 'matricula_ trasera');
        if (cedulaComprador && cedulaVendedor && matriculaFrontal && matriculaTrasera) {
            const getDocumentosTramiteDTO: GetDocumentosTramiteDTO = {
                documentos: {
                    comprador: cedulaComprador,
                    vendedor: cedulaVendedor
                },
                matricula: {
                    frontal: matriculaFrontal,
                    trasera: matriculaTrasera
                }
            };
            return getDocumentosTramiteDTO;
        } else {
            throw new Error(`cann not get documents for tramite`)
        }
    }

    getCorrespondingDocumentByDescription(documents: DocumentoTramiteModel[], description: string) {
        const documentDto: DocumentoTramiteModel | undefined = documents.find(doc => {
            doc.descripcion === description
        })
        return documentDto?.url;
    }
}