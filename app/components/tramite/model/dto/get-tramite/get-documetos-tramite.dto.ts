export interface GetDocumentosTramiteDTO {
    matricula: {
        frontal: string,
        trasera: string
    }
    documentos: {
        comprador: string,
        vendedor: string
    }  
}