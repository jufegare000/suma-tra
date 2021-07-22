import { assert } from "chai";
import { SolicitanteTramitesService } from "../../../components/users/services/solicitante-tramites.service";
import { tramiUserSolicitanteDTO } from '../mock/trami-user.mock';

describe('Solicitante Tramite user service testing', function () {

  const tramiUserService: SolicitanteTramitesService = new SolicitanteTramitesService();

  it('get tramites for solicitante', async function () {
    const tramiteMapped = await tramiUserService
      .getTramitesSolicitante(tramiUserSolicitanteDTO);
    console.log('get tramites: ', tramiteMapped);
    assert.isNotNull(tramiteMapped, 'Must not be null!!!')
  });
});
