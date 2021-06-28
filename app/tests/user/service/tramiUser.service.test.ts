import { TramiteService } from "../../../components/tramite/service/tramite.service";
import {GetTramiteDTO} from '../../../components/tramite/model/dto/getTramite.dto';
import { assert } from "chai";
describe('Tramite service testing', function() {
  const tramiUserService: TramiteService = new TramiteService();

    it('Get complete Tramite information', async function() {

        const tramiteMapped: GetTramiteDTO|null = await tramiUserService.getTramiteById(1);
        console.log('get tramite: ', tramiteMapped);
        assert.isNotNull(tramiteMapped, 'Must not be null!!!')
    }); 
  });
  