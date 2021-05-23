import { expect } from 'chai';
import {UsersRepository} from '../../../components/users/repository/users.repository';
import {tramiUserSolicitanteMock} from '../mock/trami-user.mock';
import { UserModel } from '../../../components/users/model/db/user.model';

describe('get tramite from database', function () {

  const userRepo: UsersRepository = new UsersRepository();

  it('Should get a tramite from database', async function () {
    const tramite = await userRepo.getUserById(1);
    expect(tramite).to.be.instanceOf(UserModel);
  });

  it.skip('Should create TramiUser solicitante', async function () {
    const tramites = await userRepo.guardarUsuarioModel(tramiUserSolicitanteMock);
    console.log(Object.getPrototypeOf(tramites))
    expect(tramites).to.be.instanceOf(Array);
  });
});
