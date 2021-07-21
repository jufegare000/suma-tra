import { Either } from "../../../../responses/tramite/sumatra-either.response";
import { SumatraTramiteResult } from "../../../../responses/tramite/sumatra-tramite.result";
import { CreateTramiteError } from "../../../../util/error-handilg/create-tramite.error";

export type CreateTramiteResponseType = Either<
    CreateTramiteError.EmailNotFoundError | 
    CreateTramiteError.InvalidDocumentFormatExtension,
    SumatraTramiteResult<any>
>