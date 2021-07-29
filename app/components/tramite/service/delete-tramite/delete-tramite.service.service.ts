import { TramiteRepository } from "../../repository/tramite.repository";

export class DeleteTramiteService {
    private tramiteRepository: TramiteRepository = new TramiteRepository();
    

    async deleteTramiteById(tramiteId: number): Promise<void> {

            try {
                await this.tramiteRepository.updateTramiteState(tramiteId, 0);
            } catch (ex) {
                throw new Error(`Can't get tramite documents because: ${ex}`);
            }
        }

}