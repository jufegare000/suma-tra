import { TramiteStateDetailModel } from "../../tramte-management/model/bd/detalle-estado-tramite.model";
import { TramiteStateDetailAnnexModel } from "../../tramte-management/model/bd/estado_tramite_anexo.model";
import { TramiteStateDetailAnnexRepository } from "../../tramte-management/repository/tramite-state-detail-annex.repository";
import { TramiteStateDetailRepository } from "../../tramte-management/repository/tramite-state-detail.repository";
import { GetTramiteHistoricDTO } from "../model/dto/get-tramite-historic.dto";
import { TramiteStateDetailAnnexDTO } from "../model/dto/tramite-state-detail-annex.dto";
import { TramiteStateDetailDto } from "../model/dto/tramite-state-detail.dto";

const tramiteStateDetailRepo: TramiteStateDetailRepository = new TramiteStateDetailRepository();
const tramiteStateDetailAnnexRepo: TramiteStateDetailAnnexRepository = new TramiteStateDetailAnnexRepository();


export class GetTramiteHistoricService {


    async getTramiteHistoric(tramiteId: number): Promise<GetTramiteHistoricDTO> {
        try {
            const tramitesStateDetail = await tramiteStateDetailRepo.getTramiteStateDetailByIdTramite(tramiteId);
            const tramiteStatesDetailsParsed = await Promise.all(tramitesStateDetail.map(async (tramiteStateDetail: TramiteStateDetailModel) => {
                const annexes: TramiteStateDetailAnnexModel[] | [] = await tramiteStateDetailAnnexRepo.getTramiteStateDetailAnnexesByIdStateDetail(tramiteStateDetail.getDataValue("id"));
                const parsedAnnexes: TramiteStateDetailAnnexDTO[] =
                    annexes.length > 0 ? annexes.map((annex: TramiteStateDetailAnnexModel) => {
                        const annexParsed: TramiteStateDetailAnnexDTO = {
                            description: annex.getDataValue("descripcion_anexo"),
                            url: annex.getDataValue("url_anexo")
                        }
                        return (annexParsed);
                    }) : [];

                const tramiteStateDetailParsed: TramiteStateDetailDto = {
                    annexes: parsedAnnexes,
                    idCurrentState: tramiteStateDetail.getDataValue("id_estado_actual"),
                    idPreviousState: tramiteStateDetail.getDataValue("id_estado_anterior"),
                    stateChangeDate: tramiteStateDetail.getDataValue("fecha_cambio_estado"),
                    observations: tramiteStateDetail.getDataValue("observaciones")
                }
                return tramiteStateDetailParsed;
            }));
            console.log(tramiteStatesDetailsParsed);
            const response: GetTramiteHistoricDTO = {
                idTramite: tramiteId,
                tramiteStateDetail: tramiteStatesDetailsParsed
            }
            return response;
        } catch (error) {
            throw new Error(`Can't get Tramite`);
        }

    }
}