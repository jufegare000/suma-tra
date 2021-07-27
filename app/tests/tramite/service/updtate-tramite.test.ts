import { GetTramiteDTO } from '../../../components/tramite/model/dto/get-tramite/getTramite.dto';
import { assert } from "chai";
import { Logger } from "tslog";
import { GetTramiteService } from "../../../components/tramite/service/get-tramite/get-tramite.service";
import { TramiUserService } from '../../../components/users/services/trami-user.service';
import { GetUserDTO } from '../../../components/users/model/dto/get-user.dto';
import { AttendTramiteService } from '../../../components/tramite-attending/service/attend-tramite.service';
import { UpdateTramiteDTO } from '../../../components/tramite/model/dto/update-tramite/update-tramite.dto';
import { UpdateTramiteService } from '../../../components/tramite/service/update-tramite/update-tramite.service';
import { UpdateTramiteDocumentsService } from '../../../components/tramite/service/update-tramite/update-documents/update-tramite-documents.service';
import { PDF_BASE_64 } from '../../s3-bucket/mock/pdfBase64.mock';
import { UserI } from '../../../components/users/model/interfaces/tramiUser.interface';
import { USER_MOCK } from '../../s3-bucket/mock/user-dummy.mock';
import { UpdateArchivosTramiteDTO } from '../../../components/tramite/model/dto/update-tramite/update-archivos-tramite.dto';
import { GetUserObjectMapper } from '../../../components/users/services/object-mapper/get-user.objectMapper';

const log: Logger = new Logger();
describe('Update tramite service', function () {


    const tramiUserService: TramiUserService = new TramiUserService();
    const getTramiteService: GetTramiteService = new GetTramiteService();
    const attendTramiteService: AttendTramiteService = new AttendTramiteService();
    const updateTramiteService: UpdateTramiteService = new UpdateTramiteService();
    const updateDocumentsService: UpdateTramiteDocumentsService = new UpdateTramiteDocumentsService()
    const userObjectMapper: GetUserObjectMapper = new GetUserObjectMapper()
    const updateTramiteDto: UpdateTramiteDTO = {
        cedula_comprador: "xx",
        cedula_vendedor: "1214",
        id: 79,
        modelo: 1555
    };


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

    it('update general information', async function () {
        const updateTramiteDto: UpdateTramiteDTO = {
            cedula_comprador: "xx",
            cedula_vendedor: "1214",
            id: 79,
            modelo: 1555
        };
        const userDto: GetUserDTO = {
            email: "xxx",
            role: "solicitante",
            id: 2
        }
        await updateTramiteService.updateTramite(updateTramiteDto, userDto);
        const tramiteMapped: GetTramiteDTO = await getTramiteService.getTramiteById(79);
        assert.equal(tramiteMapped.cedula_comprador, updateTramiteDto.cedula_comprador);
    });

    xit('update some documents in tramite', async function () {
        const updateDocumentsTramiteDto: UpdateArchivosTramiteDTO = {
            documentos: {
                comprador: {
                    b64: PDF_BASE_64,
                    ext: 'pdf'
                }
            }
        }

        const userI: UserI = USER_MOCK
        await updateDocumentsService.checkWhichDocumentsToUpdate(updateDocumentsTramiteDto, userI, 0)
    });

});
