import { UserI } from "../../../components/users/model/interfaces/tramiUser.interface"; 
import { SolicitanteEnum } from "../../../enums/user/solicitante.enum";

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
            role: SolicitanteEnum.role,
            pass: '12313'
        };


