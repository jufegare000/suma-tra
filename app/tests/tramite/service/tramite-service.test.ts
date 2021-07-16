import { TramiteService } from "../../../components/tramite/service/tramite.service";
import {GetTramiteDTO} from '../../../components/tramite/model/dto/getTramite.dto';
import { assert } from "chai";
import { createdTramiteDTOMock, createTramiteDTOMock } from "../mock/createTramite.mock.dto";
import { CreateTramiteDTO } from "../../../components/tramite/model/dto/create-tramite/create-tramite.dto";
describe('Tramite service testing', function() {
  
  const tramiUserService: TramiteService = new TramiteService();

    it('Get complete Tramite information', async function() {

        const tramiteMapped: GetTramiteDTO|null = await tramiUserService.getTramiteById(1);
        console.log('get tramite: ', tramiteMapped);
        assert.isNotNull(tramiteMapped, 'Must not be null!!!')
    }); 

    it('Create tramite in service', async function() {
      const tramiteForCreation: CreateTramiteDTO = createdTramiteDTOMock;
      const tramiteMapped: GetTramiteDTO|null = await tramiUserService.createTramite(tramiteForCreation);
      /*
      1. create tramite in database
      2. upload files to S3
      3. register files one by one in database with id tramite
      4. return response
      */

      console.log('get tramite: ', tramiteMapped);
      assert.isNotNull(tramiteMapped, 'Must not be null!!!')
  }); 
  });
  