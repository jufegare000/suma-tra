import { ArchivosTramiteDTO } from "../model/dto/create-tramite/archivos-tramite.dto";
import { CreateTramiteDTO } from "../model/dto/create-tramite/create-tramite.dto";
import { ValidatorResponse } from "./validator-response";

export class CreateTramiteValidator {

    validateDocuments(archivos: ArchivosTramiteDTO): ValidatorResponse {

        const documentos = archivos?.documentos;
        let respnse: ValidatorResponse = {
            message: '',
            status: false
        }
        if (!!!documentos) {
            respnse.message = `files must be present in request`
        }
        const compradorFiles = documentos?.comprador;
        if (!!!compradorFiles) {
            respnse.message = `comprador files must be present in request`
        }
        const b64FileComprador = compradorFiles?.b64;
        if (b64FileComprador && b64FileComprador.length < 0) {
            respnse.message = `base 64 file must be present in comprador file`
        }
        const compradorFileExt = compradorFiles?.ext
        if (compradorFileExt && !['pdf', 'png', 'jpg', 'jpeg'].includes(compradorFileExt)) {
            respnse.message = `extension must be pdf, png, jpg or jpeg and you sent ${compradorFileExt}`;
        }

        const vendedorFiles = documentos?.vendedor;
        if (!!!vendedorFiles) {
            respnse.message = `comprador files must be present in request`
        }

        const b64FileVendedor = compradorFiles?.b64;
        if (b64FileComprador && b64FileVendedor.length < 0) {
            respnse.message = `base 64 file must be present in comprador file`
        }
        const vendedorFileExt = compradorFiles?.ext
        if (vendedorFileExt && !['pdf', 'png', 'jpg', 'jpeg'].includes(vendedorFileExt)) {
            respnse.message = `extension must be pdf, png, jpg or jpeg and you sent ${compradorFileExt}`;
        }
        

        const imagenesMatricula = archivos.imagenes_matricula;
        if(!!!imagenesMatricula) {
            respnse.message = `imagenes matricula must be present in request`
        }

        const frontal = imagenesMatricula.frontal;
        if(frontal.b64.length < 0) {
            respnse.message = `must sent base64 file in matricula frontal`
        }

        if (!['pdf', 'png', 'jpg', 'jpeg'].includes(frontal.ext)) {
            respnse.message = `extension must be pdf, png, jpg or jpeg and you sent ${frontal.ext}`;
        }
        const trasera = imagenesMatricula.trasera;

        if(trasera.b64.length < 0) {
            respnse.message = `must sent base64 file in matricula trasera`
        }

        if (!['pdf', 'png', 'jpg', 'jpeg'].includes(trasera.ext)) {
            respnse.message = `extension must be pdf, png, jpg or jpeg and you sent ${trasera.ext}`;
        }
        
        if (respnse.message === '')
            respnse.status = true;
        return respnse;
    }
}