import { SumatraTramiteResult } from "../../../responses/tramite/sumatra-tramite.result";
import { UseCase } from "../../../use-cases/use-case";
import { CreateTramiteDTO } from "../model/dto/create-tramite/create-tramite.dto";
import { CreateTramiteService } from "../service/create-tramite/create-tramite.service";
import { CreateTramiteResponseType } from "./types/create-tramite-response.type";
/*

class CreateTramiteUseCase implements UseCase<CreateTramiteDTO, Promise<CreateTramiteResponseType>> {
    private createTramiteService: CreateTramiteService;

    constructor(createTramiteService: CreateTramiteService) {
        this.createTramiteService = createTramiteService;
    }

    public async execute(request: CreateTramiteDTO, email: string): Promise<SumatraTramiteResult<CreateTramiteDTO>> {
        const newTramiteOrError = await this.createTramiteService.createTramite(request, email);
        // this.
        return newTramite;
    }
}
*/