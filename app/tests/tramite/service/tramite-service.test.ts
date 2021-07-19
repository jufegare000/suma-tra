import { TramiteService } from "../../../components/tramite/service/tramite.service";
import {GetTramiteDTO} from '../../../components/tramite/model/dto/getTramite.dto';
import { assert } from "chai";
import { createTramiteDTOMock } from "../mock/createTramite.mock.dto";
import { CreateTramiteDTO } from "../../../components/tramite/model/dto/create-tramite/create-tramite.dto";
import { Logger } from "tslog";

const log: Logger = new Logger();
describe('Tramite service testing', function() {
  
  const tramiteService: TramiteService = new TramiteService();

    it('Get complete Tramite information', async function() {

        const tramiteMapped: GetTramiteDTO|null = await tramiteService.getTramiteById(1);
        log.info('get tramite: ', tramiteMapped);
        assert.isNotNull(tramiteMapped, 'Must not be null!!!')
    }); 

    it.only('Create tramite in service', async function() {
      const tramiteForCreation: CreateTramiteDTO = createTramiteDTOMock;
      log.info(`Creating tramite: ${tramiteForCreation}`)
      const tramiteMapped: GetTramiteDTO|null = await tramiteService.createTramite(tramiteForCreation, "xx@xxx");

      console.log('get tramite: ', tramiteMapped);
      assert.isNotNull(tramiteMapped, 'Must not be null!!!')
  }); 
  });
  