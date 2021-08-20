import { assert } from "chai";
import { AttachExpenditureDTO } from "../../components/tramite-expenditures/model/dto/attach-expediture.dto";
import { ExpenditureDTO } from "../../components/tramite-expenditures/model/dto/expenditure.dto";
import { AttachExpenditureService } from "../../components/tramite-expenditures/service/attach-expenditures.service";


describe('Attach expenditures to tramite', function () {

  const attachExpenditureService: AttachExpenditureService = new AttachExpenditureService();

  it('Attach expenditures to tramite and change state', async function () {
      const ependitures: ExpenditureDTO[] = [
          { 
              description: "proof", 
              id_concept: 7,
              value: 5000
          }
      ]
      const attachExpenditureDTO: AttachExpenditureDTO = {
        tramite_id: 1,
          expenditures:ependitures
      }
    const tramiteMapped = await attachExpenditureService.attachExpenditure(attachExpenditureDTO, 1);
      
    console.log('get tramites: ', tramiteMapped);
    assert.isNotNull(tramiteMapped, 'Must not be null!!!')
  });
});
