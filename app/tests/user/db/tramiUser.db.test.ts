import { expect } from 'chai';
import { UsersRepository } from '../../../components/users/repository/users.repository';
import { tramiUserSolicitanteMock } from '../mock/trami-user.mock';
import { UserModel } from '../../../components/users/model/db/user.model';
import { Logger } from "tslog";


const log: Logger = new Logger();

describe('Tramiusers database', function () {

  const userRepo: UsersRepository = new UsersRepository();

  it('Should get a tramiuser from database', async function () {
    const userFromDB = await userRepo.getUserById(1);
    expect(userFromDB).to.be.instanceOf(UserModel);
  });

  it('Should create TramiUser solicitante', async function () {
    const createdTramiUser = await userRepo.guardarUsuarioModel(tramiUserSolicitanteMock);
    log.silly(Object.getPrototypeOf(createdTramiUser))
    expect(createdTramiUser).to.be.instanceOf(UserModel);
  });
});
