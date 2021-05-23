import { expect } from 'chai';
import {sequalize} from '../../config/db/db';
import {TramiUserModel} from '../../models/tramiUser.model';


describe('get tramite from database', function() {
    it('Should get tramite from database', async function() {
      const repo = await sequalize.getRepository(TramiUserModel)
      const dummt = await repo.findOne({where: {
          id: 1
      }})
      expect(dummt).to.be.instanceOf(TramiUserModel);
    }); 
  });
  