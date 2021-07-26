import { expect } from 'chai';
import { TramiteStateDetailRepository } from '../../../../components/tramte-management/repository/tramite-state-detail.repository';
import { TramiteStateDetailAnnexRepository } from '../../../../components/tramte-management/repository/tramite-state-detail-annex.repository';

import { TramiteStateDetailI } from '../../../../components/tramte-management/model/interface/detalle-estado-tramite.interface';
import { TramiteStateDetailModel } from '../../../../components/tramte-management/model/bd/detalle-estado-tramite.model';
import { TramiteStateDetailAnnexModel } from '../../../../components/tramte-management/model/bd/estado_tramite_anexo.model';
import { AnexoEstadoTramiteI } from '../../../../components/tramte-management/model/interface/estado_tramite_anexo.interface';
import { Logger } from "tslog";


const log: Logger = new Logger();

describe('Update tramite from information pending to in validation', function () {

  const tramiteStateDetailRepo: TramiteStateDetailRepository = new TramiteStateDetailRepository();
  const tramiteStateDetailAnnexRepo: TramiteStateDetailAnnexRepository = new TramiteStateDetailAnnexRepository();

  const tramiteId: number = 1;

  const tramiteStateDetailI: TramiteStateDetailI = {
    fecha_cambio_estado : new Date(),
    id_estado_actual: 3,
    id_estado_anterior: 2,
    id_informador: 2,
    id_tramite: tramiteId,
    observaciones: "detalle trámite de prueba"
  }  

  it('Should create an estado_tramite_detalle in database', async function () {
    const tramiteStateDetail = await tramiteStateDetailRepo.saveTramiteStateDetail(tramiteStateDetailI);
    
    expect(tramiteStateDetail).to.be.instanceOf(TramiteStateDetailModel);

    const tramiteStateDetailId: number = tramiteStateDetail.getDataValue("id");
    const tramiteStrateDetailAnnex: AnexoEstadoTramiteI = {
        id_detalle: tramiteStateDetailId,
        url_anexo: 'urldeprueba',
        comentario: 'anexo deprueba',
        descripcion_anexo: 'anexo_de_prueba'
    }
    const annexCreated = await tramiteStateDetailAnnexRepo.saveTramiteStateDetailAnnex(tramiteStrateDetailAnnex);

    expect(annexCreated).to.be.instanceOf(TramiteStateDetailAnnexModel);

    log.warn('detailes going to be deleted');

    await annexCreated.destroy();
    await tramiteStateDetail.destroy();

  });

});
