import { expect } from 'chai';
import {sequalize} from '../../config/db/db';
import {TramiUserModel} from '../../models/tramiUser.model';

describe('get user from database', function() {
    it('add', async function() {
      const repo = await sequalize.getRepository(TramiUserModel)
      const dummt = await repo.findOne({where: {
          id: 1
      }})
      expect(dummt).to.be.instanceOf(TramiUserModel);
    }); 
  });