import { expect } from 'chai';
import { CreateTramiteObjectMapper } from '../../../components/tramite/service/create-tramite/createTramite.objectMapper';
import { createTramiteDTOMock, createdTramiteDTOMock } from '../../mock/createTramite.mock.dto';
import { tramitePendienteDeaprobacionMock } from '../../mock/tramite.mock'; 
import { TramiteI } from '../../../components/tramite/model/interface/tramite.interface';
import { TramiteModel } from '../../../components/tramite/model/db/tamite.model';
import { TramiteRepository } from '../../../components/tramite/repository/tramite.repository';
import { CreateTramiteDTO } from '../../../components/tramite/model/dto/createTramite.dto';

describe('Tramite object mapping testing', function() {
  const tramiteRepo: TramiteRepository = new TramiteRepository();
  const createTramiteObjectMapper: CreateTramiteObjectMapper = new CreateTramiteObjectMapper();

    it('Map CreateTramiteDTO to TramiteI', async function() {

        const tramiteMapped: TramiteI = createTramiteObjectMapper.mapDtoToTramiteI(createTramiteDTOMock);
        console.log('tramite mapped mock: ', tramiteMapped);
        console.log('TramiteI mock: ', tramitePendienteDeaprobacionMock);
        expect(tramiteMapped).to.eql(tramitePendienteDeaprobacionMock);
    }); 

    it.only('Map tramiteModel to CreateTramiteDTO', async function() {
      
        const tramiteFromDB:TramiteModel|null = await tramiteRepo.getTramiteById(1);
        
        expect(tramiteFromDB).to.be.instanceOf(TramiteModel);
        if(tramiteFromDB){
            const tramiteMapped: CreateTramiteDTO = createTramiteObjectMapper.mapModelToDto(tramiteFromDB);
            console.log('Tramite Model mapped to CreateTramiteDTO: ', tramiteMapped);
            expect(tramiteMapped).to.eql(createdTramiteDTOMock);
        }
      }); 
  });
  