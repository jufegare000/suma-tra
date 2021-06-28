import { CreateTramiteDTO } from "../model/dto/createTramite.dto";
import { CreateTramiteResponseBuilder } from "./create-tramite/createTramite.responsebuilder";
import { TramiteRepository } from "../repository/tramite.repository";
import { TramiteModel } from "../model/db/tamite.model";
import { GetTramiteObjectMapper } from "./get-tramite/get-tramite.objectMapper";
import { GetTramiteDTO } from "../model/dto/getTramite.dto";
import { CreateTramiteObjectMapper } from "./create-tramite/createTramite.objectMapper";

export class TramiteService {
    private tramiteRepository: TramiteRepository = new TramiteRepository();
    private createTramiteResponseBuilder: CreateTramiteResponseBuilder = new CreateTramiteResponseBuilder();
    private getTramiteObjectMapper: GetTramiteObjectMapper = new GetTramiteObjectMapper();
    private createTramiteObjectMapper: CreateTramiteObjectMapper = new CreateTramiteObjectMapper();

    async createTramite(createTramiteDTO: CreateTramiteDTO){

        const tramiteI = this.createTramiteObjectMapper.mapDtoToTramiteI(createTramiteDTO);
        const tramiteCrudo = await this.tramiteRepository.guardarTramiteModel(tramiteI);
        
        const tramiteResponse = this.createTramiteObjectMapper.mapModelToDto(tramiteCrudo);
        return tramiteResponse;
    }

    async getTramiteById(tramiteId: number): Promise<GetTramiteDTO|null> {
        try {
            const tramiteCrudo:TramiteModel|null = await this.tramiteRepository.getTramiteById(tramiteId);
            if(tramiteCrudo){
                const tramiteDTO: GetTramiteDTO = await this.getTramiteObjectMapper.mapModelToDto(tramiteCrudo);
                return tramiteDTO;
            }
        }catch(ex){
            throw new Error(`Can't get Tramite`);
        }
        return null;
    }

    async getAllTramites() {
        return await this.tramiteRepository.getAllTramites();
    }
}