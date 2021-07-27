import { GetTramiteDTO } from '../../../components/tramite/model/dto/get-tramite/getTramite.dto';
import { assert } from "chai";
import { Logger } from "tslog";
import { GetTramiteService } from "../../../components/tramite/service/get-tramite/get-tramite.service";
import { TramiUserService } from '../../../components/users/services/trami-user.service';
import { GetUserDTO } from '../../../components/users/model/dto/get-user.dto';
import { AttendTramiteService } from '../../../components/tramite-attending/service/attend-tramite.service';
import { UpdateTramiteDTO } from '../../../components/tramite/model/dto/update-tramite/update-tramite.dto';
import { UpdateTramiteService } from '../../../components/tramite/service/update-tramite/update-tramite.service';

const log: Logger = new Logger();
describe('Update tramite service', function () {


    const tramiUserService: TramiUserService = new TramiUserService();
    const getTramiteService: GetTramiteService = new GetTramiteService();
    const attendTramiteService: AttendTramiteService = new AttendTramiteService();
    const updateTramiteService: UpdateTramiteService = new UpdateTramiteService();

    it('Set tramite to information pending', async function () {

        const tramiteMapped: GetTramiteDTO = await getTramiteService.getTramiteById(79);
        const userDto: GetUserDTO | null = await tramiUserService.getTramiUserById(1);
        if (userDto) {
            log.info('get tramite: ', userDto);
            assert.isNotNull(tramiteMapped, 'Must not be null!!!')
            const result = await attendTramiteService.handleTramiteWithTramitadorUser(userDto, 79);
            assert.isNotNull(result, 'Must not be null!!!')
        }
    });

    it.only('update general information', async function () {
        const updateTramiteDto: UpdateTramiteDTO = {
            cedula_comprador:"xx",
            cedula_vendedor: "1214",
            id:79,
            modelo:1555
        };

        await updateTramiteService.updateTramite(updateTramiteDto);
        const tramiteMapped: GetTramiteDTO = await getTramiteService.getTramiteById(79);
        assert.equal(tramiteMapped.cedula_comprador,updateTramiteDto.cedula_comprador);
    });

});
