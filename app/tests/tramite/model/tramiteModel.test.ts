import { expect, assert } from 'chai';
import { TramiteModel } from '../../../components/tramite/model/db/tamite.model';
import { TramiteRepository } from '../../../components/tramite/repository/tramite.repository';
import { tramitePendienteDeaprobacionMock } from '../mock/tramite.mock';

describe('Tramite model testing', function() {
  
  const tramiteRepo: TramiteRepository = new TramiteRepository();

    it('Obtener el modelo de un trámite mockeado pendiente de aprobación', async function() {
      
      const nuevoTramite:TramiteModel = await tramiteRepo.guardarTramiteModel(tramitePendienteDeaprobacionMock);
      
      expect(nuevoTramite).to.be.instanceOf(TramiteModel);

      await tramiteRepo.eliminarTramite(nuevoTramite);
      
      const idGenerado: number = nuevoTramite?.getDataValue("id");
      console.log(`Id generado es: ${idGenerado}`);
      assert.isAbove(idGenerado, 1, 'Debe ser un id válido')
    }); 
  });