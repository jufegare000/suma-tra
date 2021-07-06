import { assert } from "chai";
import { SolicitanteTramitesService } from "../../../components/users/services/solicitante-tramites.service";
import { tramiUserSolicitanteMock } from '../mock/trami-user.mock';

describe('Solicitante Tramite user service testing', function () {

  const tramiUserService: SolicitanteTramitesService = new SolicitanteTramitesService();

  it('get tramites for solicitante', async function () {
    const tramiteMapped = await tramiUserService
      .getTramitesSolicitanteByMail(tramiUserSolicitanteMock.email);
    console.log('get tramites: ', tramiteMapped);
    assert.isNotNull(tramiteMapped, 'Must not be null!!!')
  });
});
