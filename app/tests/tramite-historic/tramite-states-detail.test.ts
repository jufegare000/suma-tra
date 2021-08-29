import { TramiteStateDetailAnnexRepository } from "../../components/tramte-management/repository/tramite-state-detail-annex.repository";
import { TramiteStateDetailRepository } from "../../components/tramte-management/repository/tramite-state-detail.repository";
import { expect, assert } from 'chai';
import { TramiteStateDetailModel } from "../../components/tramte-management/model/bd/detalle-estado-tramite.model";
import { TramiteStateDetailAnnexModel } from "../../components/tramte-management/model/bd/estado_tramite_anexo.model";
import { TramiteStateDetailAnnexDTO } from "../../components/tramite-historic/model/dto/tramite-state-detail-annex.dto";
import { TramiteStateDetailDto } from "../../components/tramite-historic/model/dto/tramite-state-detail.dto";

describe('Tramite historic of states', function () {

    const tramiteStateDetailRepo: TramiteStateDetailRepository = new TramiteStateDetailRepository();
    const tramiteStateDetailAnnexRepo: TramiteStateDetailAnnexRepository = new TramiteStateDetailAnnexRepository();


    it('get tramite states details ', async function () {
        const tramitesStateDetail = await tramiteStateDetailRepo.getTramiteStateDetailByIdTramite(99);
        expect(tramitesStateDetail[0]).to.be.instanceOf(TramiteStateDetailModel);
    });

    it('map tramiteStateDetail to DTO', async function () {
        const tramitesStateDetailAnnexes = await tramiteStateDetailAnnexRepo.getTramiteStateDetailAnnexesByIdStateDetail(8);
        expect(tramitesStateDetailAnnexes[0]).to.be.instanceOf(TramiteStateDetailAnnexModel);
        
    });

    it('map tramiteStateDetail to DTO', async function () {
        const tramitesStateDetail = await tramiteStateDetailRepo.getTramiteStateDetailByIdTramite(99);
        expect(tramitesStateDetail[0]).to.be.instanceOf(TramiteStateDetailModel);
        const tramiteStatesDetailsParsed =  await Promise.all(tramitesStateDetail.map(async (tramiteStateDetail: TramiteStateDetailModel) => {
            const annexes: TramiteStateDetailAnnexModel[] | [] = await tramiteStateDetailAnnexRepo.getTramiteStateDetailAnnexesByIdStateDetail(tramiteStateDetail.getDataValue("id"));
            const parsedAnnexes: TramiteStateDetailAnnexDTO[] = 
            annexes.length > 0? annexes.map((annex: TramiteStateDetailAnnexModel)=> {
                const annexParsed: TramiteStateDetailAnnexDTO = {
                    description: annex.getDataValue("descripcion_anexo"),
                    url: annex.getDataValue("url_anexo")
                }
                return (annexParsed);
            }): [];

            const tramiteStateDetailParsed: TramiteStateDetailDto = {
                annexes: parsedAnnexes,
                idCurrentState: tramiteStateDetail.getDataValue("id_estado_actual"),
                idPreviousState: tramiteStateDetail.getDataValue("id_estado_anterior"),
                stateChangeDate: tramiteStateDetail.getDataValue("fecha_cambio_estado")
            }
            return tramiteStateDetailParsed;      
        }));
        assert.isNotNull(tramiteStatesDetailsParsed, 'Must not be null!!!')
    });

});
