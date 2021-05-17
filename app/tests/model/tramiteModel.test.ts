import { expect } from 'chai';
import { TramiteModel } from '../../components/transactProcedure/model/db/tamite.model';
import { TramiteI } from "../../components/transactProcedure/model/interface/tramite.interface";
import { TramiteRepository } from '../../components/transactProcedure/repository/tramite.repository';
import { tramitePendienteDeaprobacionMock } from '../mock/tramite.mock';

describe('Tramite model testing', function() {
    it('Obtener el modelo de un trámite mockeado pendiente de aprobación', async function() {
      const tramiteRepo: TramiteRepository = new TramiteRepository();
  
      const rep = tramiteRepo.guardarTramiteModel(tramitePendienteDeaprobacionMock);
      console.log(rep);
      //expect(tramitePendienteDeaprobacionMock).to.be.instanceOf(TramiteModel);
    }); 
  });