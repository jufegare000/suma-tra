import { GetTramiteDTO } from '../../../components/tramite/model/dto/get-tramite/getTramite.dto';
import { assert } from "chai";
import { createTramiteDTOMock } from "../mock/createTramite.mock.dto";
import { CreateTramiteDTO } from "../../../components/tramite/model/dto/create-tramite/create-tramite.dto";
import { Logger } from "tslog";
import { GetTramiteService } from "../../../components/tramite/service/get-tramite/get-tramite.service";
import { CreateTramiteService } from "../../../components/tramite/service/create-tramite/create-tramite.service";
import { TramiUserService } from '../../../components/users/services/trami-user.service';
import { GetUserDTO } from '../../../components/users/model/dto/get-user.dto';
import { AttendTramiteService } from '../../../components/tramite/service/update-tramite/attend-tramite.service';

const log: Logger = new Logger();
describe('Update tramite service', function () {

    const createTramiteService: CreateTramiteService = new CreateTramiteService();
    const tramiUserService: TramiUserService = new TramiUserService();
    const getTramiteService: GetTramiteService = new GetTramiteService();
    const attendTramiteService: AttendTramiteService = new AttendTramiteService();
    it.only('Set tramite to information pending', async function () {

        const tramiteMapped: GetTramiteDTO = await getTramiteService.getTramiteById(79);
        const userDto: GetUserDTO | null = await tramiUserService.getTramiUserById(1);
        if (userDto) {
            log.info('get tramite: ', userDto);
            assert.isNotNull(tramiteMapped, 'Must not be null!!!')
            const result = await attendTramiteService.handleTramiteWithTramitadorUser(userDto, 79);
            console.log(result);
        }
    });

});