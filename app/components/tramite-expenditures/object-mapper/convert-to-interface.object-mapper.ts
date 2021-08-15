import { AttachExpenditureDTO } from "../model/dto/attach-expediture.dto";
import { ExpenditureDTO } from "../model/dto/expenditure.dto";
import { TramiteExpenditureI } from "../model/interface/tramite_expenditure.interface";

export class ConvertToInterfaceObjectMapper {

    mappDtoToInferface(attachExpenditureDTO: AttachExpenditureDTO): TramiteExpenditureI[] {
        const expenditures: ExpenditureDTO[] = attachExpenditureDTO.expenditures;
        const parsedExpenditures:TramiteExpenditureI[] = expenditures.map((expenditure: ExpenditureDTO) => {
            const parsedExpenditure: TramiteExpenditureI = {
                fecha_creacion : new Date(),
                gasto_id : expenditure.id_concept,
                tramite_id: attachExpenditureDTO.tramite_id,
                valor: expenditure.value,
                descripcion: expenditure.description
            }
            return (parsedExpenditure);
        });
        return parsedExpenditures;
    }
}