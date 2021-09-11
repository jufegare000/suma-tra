import { GetTramiteDTO } from '../../../components/tramite/model/dto/get-tramite/getTramite.dto';
import { assert } from "chai";
import { createTramiteDTOMock } from "../mock/createTramite.mock.dto";
import { CreateTramiteDTO } from "../../../components/tramite/model/dto/create-tramite/create-tramite.dto";
import { Logger } from "tslog";
import { GetTramiteService } from "../../../components/tramite/service/get-tramite/get-tramite.service";
import { CreateTramiteService } from "../../../components/tramite/service/create-tramite/create-tramite.service";

const log: Logger = new Logger();
describe('Tramite service testing', function () {

  const createTramiteService: CreateTramiteService = new CreateTramiteService();
  const getTramiteService: GetTramiteService = new GetTramiteService();

  it('Get complete Tramite information', async function () {

    const tramiteMapped: GetTramiteDTO = await getTramiteService.getTramiteById(45);
    log.info('get tramite: ', tramiteMapped);
    assert.isNotNull(tramiteMapped, 'Must not be null!!!')
  });

  it('Create tramite in service', async function () {
    const tramiteForCreation: CreateTramiteDTO = createTramiteDTOMock;
    log.info(`Creating tramite: ${tramiteForCreation}`)
    const tramiteMapped: CreateTramiteDTO | undefined = await createTramiteService.createTramite(tramiteForCreation, "nuevo@juangallo.tr");

    console.log('get tramite: ', tramiteMapped);
    assert.isNotNull(tramiteMapped, 'Must not be null!!!')
  });
});
