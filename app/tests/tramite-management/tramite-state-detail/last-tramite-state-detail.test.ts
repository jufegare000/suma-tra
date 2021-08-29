



//getTramiteStateDetailByLastStateAndIdTramite

import { expect } from 'chai';
import { Logger } from "tslog";
import { TramiteStateDetailModel } from '../../../components/tramte-management/model/bd/detalle-estado-tramite.model';
import { TramiteStateDetailRepository } from '../../../components/tramte-management/repository/tramite-state-detail.repository';


const log: Logger = new Logger();

describe('Get last tramiteStateDeail', function () {

  const tramiteStateDetailRepo: TramiteStateDetailRepository = new TramiteStateDetailRepository();


  it.only('Find TramiteStateDetil with idTramite and lastStateId', async function () {
    const lastTramiteStaeDetail = await tramiteStateDetailRepo.getTramiteStateDetailByLastStateAndIdTramite(108, 4)
    
    expect(lastTramiteStaeDetail).to.be.instanceOf(TramiteStateDetailModel)
  });

});
