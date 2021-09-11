import { ArchivosTramiteDTO } from "../../../components/tramite/model/dto/create-tramite/archivos-tramite.dto"
import { DocumentosImplicadosTramiteDTO } from "../../../components/tramite/model/dto/create-tramite/create-tramite-documentos.dto"
import { CreateTramiteDTO } from "../../../components/tramite/model/dto/create-tramite/create-tramite.dto"
import { DocumentoTramiteDTO } from "../../../components/tramite/model/dto/create-tramite/documento-tramite.dto"
import { ImagenesMatriculaDTO } from "../../../components/tramite/model/dto/create-tramite/imagenes-matricula.dto"
import { BASE64_FILE } from "../../s3-bucket/mock/base64File.mock"
import { PDF_BASE_64 } from "../../s3-bucket/mock/pdfBase64.mock"

export const createdTramiteDTOMock: CreateTramiteDTO = {
    cedula_comprador: '1133444',
    cedula_vendedor: '1212111',
    direccion_solicitante: 'Cl 44322 1122',
    id: 1,
    modelo: 1994,
    organismo_transito_id: 1,
    placa: 'MMV11E',
    solicitante_id: 2,
    tipo_vehiculo: 1,
    observaciones: 'Esto es un trámite de prueba'
}

const pdfFileMock: string = PDF_BASE_64
const imageFileMock: string = BASE64_FILE;


const cedulaComprador: DocumentoTramiteDTO = {
    b64: imageFileMock,
    ext: "png"
}

const cedulaVendedor: DocumentoTramiteDTO = {
    b64: imageFileMock,
    ext: "png"
}

const documentosImplicados: DocumentosImplicadosTramiteDTO = {
    comprador:cedulaComprador,
    vendedor: cedulaVendedor
}
export const matriculaFrontal: DocumentoTramiteDTO = {
    b64:pdfFileMock,
    ext: "pdf"
}

const matriculaTrasera: DocumentoTramiteDTO = {
    b64:pdfFileMock,
    ext: "pdf"
}

const imagenesMatricula: ImagenesMatriculaDTO = {
    frontal: matriculaFrontal,
    trasera: matriculaTrasera
}


const documentosTamiteMock: ArchivosTramiteDTO = {
    documentos: documentosImplicados,
    imagenes_matricula: imagenesMatricula
}


export const createTramiteDTOMock: CreateTramiteDTO = {
    cedula_comprador: '1133444',
    cedula_vendedor: '1212111',
    direccion_solicitante: 'Cl 44322 1122',
    modelo: 1994,
    organismo_transito_id: 1,
    placa: 'MMV11E',
    solicitante_id: 1,
    tipo_vehiculo: 1,
    observaciones: 'Esto es un trámite de prueba',
    archivos: documentosTamiteMock
}