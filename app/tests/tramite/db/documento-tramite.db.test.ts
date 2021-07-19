import { expect } from 'chai';
import { DocumentoTramiteModel } from '../../../components/tramite/model/db/documento-tramite.model';
import { DocumentoTramiteRepository } from '../../../components/tramite/repository/documento-tramite.repository';
import { Logger } from "tslog";
import { CreateDocumentObjectMapper } from '../../../components/tramite/service/create-tramite/create-documents.object-mapper';
import { TramiteDocumentoI } from '../../../components/tramite/model/interface/document-tramite.interface';

const log: Logger = new Logger();

describe('get documento tramite from database', function () {

  const documentoTramiteRepo: DocumentoTramiteRepository = new DocumentoTramiteRepository();
  const tramiteDocumentoObjectMapper: CreateDocumentObjectMapper = new CreateDocumentObjectMapper();

  it('Should get a tramite from database', async function () {
    const documentosTramite:DocumentoTramiteModel[] = await documentoTramiteRepo.getDocumentosTramiteByIdTramite(1);
    expect(documentosTramite.length > 0);
  });

  it('Should create a documento tramite in database', async function () {
   
    log.info('Mapping object to interface');
    const mappedTramiteDocumentoI: TramiteDocumentoI = tramiteDocumentoObjectMapper.mapDtoToTramiteI("dummy", 1, "urlproof");
    
    log.info('Creating documento tramite mock');
    const newDocumento:DocumentoTramiteModel = await documentoTramiteRepo.saveDocumentoTramite(mappedTramiteDocumentoI);
    const idCreated: number|undefined = newDocumento?.get('id');
    log.info(`Id tramite documento: ${idCreated}`);
    log.warn(`${idCreated} will be destroyed`);
    await newDocumento.destroy();
  });

});
