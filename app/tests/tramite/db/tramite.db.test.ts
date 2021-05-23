import { expect } from 'chai';
import { TramiUserModel } from '../../../models/tramiUser.model';
import { TramiteRepository } from '../../../components/tramite/repository/tramite.repository';


describe('get tramite from database', function () {

  const tramiteRepo: TramiteRepository = new TramiteRepository();

  it('Should get a tramite from database', async function () {
    const tramite = await tramiteRepo.getTramiteById(1)
    expect(tramite).to.be.instanceOf(TramiUserModel);
  });

  it.only('Should get all tramites from database', async function () {
    const tramites = await tramiteRepo.getAllTramites();
    console.log(Object.getPrototypeOf(tramites))
    expect(tramites).to.be.instanceOf(Array);
  });
});
