export class SumatraTramiteResponse<T> {
    public isSuccesss: boolean;
    public isFailure: boolean;
    public error?: T | string;
    private _value?: T | string;

    public constructor(issSuccess: boolean, error?: T | string, value?: T) {
        if (issSuccess && error) {
            throw new Error("InvalidOperation: A result can not be successful and cotains an error");
        }

        if (issSuccess && !error) {
            throw new Error("InvalidOperation: A falling result must to contain an error message");
        }

        this.isSuccesss = issSuccess;
        this.isFailure = !issSuccess
        this.error = error;
        this._value = value;

        Object.freeze(this);
    }

    public getValue(): T {
        if (!this.isSuccesss) {
            return this.error as T;
        }
        return this._value as T;
    }

    public static ok<U>(value?: U): SumatraTramiteResponse<U> {
        return new SumatraTramiteResponse<U>(true, undefined, value);
    }

    public static fail<U> (error: any): SumatraTramiteResponse<U> {
        return new SumatraTramiteResponse<U>(false, error);
    }
}

