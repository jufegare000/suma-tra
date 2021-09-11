
import { assert } from "chai";

import { Logger } from "tslog";
import { DeliverTramiteDTO } from "../../components/tramite-finalization/model/dto/deliver-tramite.dto";
import { TramiteDeliveryService } from "../../components/tramite-finalization/service/tramite-delivery.service";
import { GetUserDTO } from "../../components/users/model/dto/get-user.dto";
import { matriculaFrontal } from "../tramite/mock/createTramite.mock.dto";

const log: Logger = new Logger();
describe('Tramite service testing', function () {

  const tramiteDeliverService = new TramiteDeliveryService();
  it('Deliver Tramite, change to finalization', async function () {
    const documentoTramite = matriculaFrontal;
    const tramite_id = 113
    const getUserDTO: GetUserDTO = {
        id: 14,
        email: 'nuevo@juangallo.tr',
        role: 'tramitador'
    }
    const tramiteDeliverDTO: DeliverTramiteDTO = {
        tramite_id: tramite_id,
        documentoTramite: documentoTramite
    }
    const resp = await  tramiteDeliverService.deliverTramite(getUserDTO, tramiteDeliverDTO);
    log.info(resp)
  });

});
