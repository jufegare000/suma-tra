import { expect } from 'chai';
import {TramiteModel} from '../../../components/tramite/model/db/tamite.model'
import { DocumentoTramiteRepository } from '../../../components/tramite/repository/documento-tramite.repository';


describe('get documento tramite from database', function () {

  const documentoTramiteRepo: DocumentoTramiteRepository = new DocumentoTramiteRepository();

  it.only('Should get a tramite from database', async function () {
    const tramite = await documentoTramiteRepo.getTramiteById(1)
    expect(tramite).to.be.instanceOf(TramiteModel);
  });

});
