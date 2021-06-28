import { assert } from 'chai';
import { TramiteRepository } from '../../../components/tramite/repository/tramite.repository';
import { UsersRepository } from '../../../components/users/repository/users.repository';

describe('Tramites for users', function () {

  const tramitesRepo: TramiteRepository = new TramiteRepository();
  const usersRepo: UsersRepository = new UsersRepository();
  const tramitadorId: number = 1;
  const solicitanteId: number = 2;
  const tramitadorMail: string = 'tramitador@tramisama.tr';

  it('Should get tramites associated to tramitador', async function () {
    const tramitesForTramitador = await tramitesRepo.getTramitesTramitador(tramitadorId);
    if(tramitesForTramitador)
    assert.isAtLeast(tramitesForTramitador?.length, 0, 'must be grather than zero')
  });

  it('Should get tramites associated to solicitante', async function () {
    const tramitesForSolicitante = await tramitesRepo.getTramitesSolicitante(solicitanteId);
    if(tramitesForSolicitante)
    assert.isAtLeast(tramitesForSolicitante?.length, 0, 'must be grather than zero')
  });

  it('Should get tramites associated to tramitador by mail', async function () {
    const entireUser = await usersRepo.getUserByMail(tramitadorMail);
    const tramitadorId = entireUser?.getDataValue("id");
    const tramitesForTramitador = await tramitesRepo.getTramitesTramitador(tramitadorId);
    if(tramitesForTramitador)
        assert.isAtLeast(tramitesForTramitador?.length, 0, 'must be grather than zero')
  });

  it('Should get tramites associated to solicitante by mail', async function () {
    const entireUser = await usersRepo.getUserByMail(tramitadorMail);
    const solicitanteId = entireUser?.getDataValue("id");
    const tramitesForSolicitante = await tramitesRepo.getTramitesSolicitante(solicitanteId);
    if(tramitesForSolicitante)
        assert.isAtLeast(tramitesForSolicitante?.length, 0, 'must be grather than zero')
  });

});
