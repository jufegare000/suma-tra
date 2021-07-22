
import { assert } from "chai";
import { TramitadorTramitesService } from "../../../components/users/services/tramitador-tramites.service";
import { tramiUserTramitadorDTO } from '../mock/trami-user.mock';

describe('Tramitador Tramite user service testing', function () {

  const tramiUserService: TramitadorTramitesService = new TramitadorTramitesService();

  it('get tramites for tramitador', async function () {
    const tramiteMapped = await tramiUserService
      .getTramitesTramitadorByMail(tramiUserTramitadorDTO);
    console.log('get tramites: ', tramiteMapped);
    assert.isNotNull(tramiteMapped, 'Must not be null!!!')
  });
});
