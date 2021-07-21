import { SumatraTramiteResult } from "../../../responses/tramite/sumatra-tramite.result";
import { DomainError } from "../base-error/domain.error";

export namespace BaseError {

    export class UnexpectedError extends SumatraTramiteResult<DomainError> {
        public constructor(err: any) {
            super(false, {
                message: `An unexpected error ocurred.`,
                error: err
            });
        }

        public static createTramiteEr(err: any): UnexpectedError {
            return new UnexpectedError(err);
        }
    }
}