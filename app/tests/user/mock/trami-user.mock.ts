import { GetUserDTO } from "../../../components/users/model/dto/get-user.dto";
import { UserI } from "../../../components/users/model/interfaces/tramiUser.interface";
import { UserEnum } from "../../../enums/user/solicitante.enum";

export const tramiUserTramitadorMock: UserI
    =
{
    email: 'tramitador@tramisama.tr',
    role: 'tramitador',
    id: 1,
    pass: '12313'
};

export const tramiUserSolicitanteMock: UserI
    =
{
    email: 'solicitante@tramisama.tr',
    role: UserEnum.solicitanteRole,
    pass: '12313'
};

export const tramiUserSolicitanteDTO: GetUserDTO = {
    id: 2,
    email: 'solicitante@tramisama.tr',
    role: UserEnum.solicitanteRole
}

export const tramiUserTramitadorDTO: GetUserDTO = {
    id: 1,
    email: 'tramitador@tramisama.tr',
    role: UserEnum.solicitanteRole
}

