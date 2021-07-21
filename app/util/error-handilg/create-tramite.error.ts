import { SumatraTramiteResult } from "../../responses/tramite/sumatra-tramite.result";
import { DomainError } from "./base-error/domain.error";

export namespace CreateTramiteError {

    export class EmailNotFoundError extends SumatraTramiteResult<DomainError> {
        public constructor(err: any) {
            super(false, {
                message: `The request does not have email in headers`,
                error: err
            });
        }

        public static createTramiteEr(err: any): EmailNotFoundError {
            return new EmailNotFoundError(err);
        }
    }

    export class InvalidDocumentFormatExtension extends SumatraTramiteResult<DomainError> {
        public constructor(err: any) {
            super(false, {
                message: `invalid format in ext field`,
                error: err
            });
        }

        public static createTramiteEr(err: any): EmailNotFoundError {
            return new InvalidDocumentFormatExtension(err);
        }
    }
}