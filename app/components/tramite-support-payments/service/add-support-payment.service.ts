
import { TramiteExpenditureRepository } from "../../tramite-expenditures/repository/tramite-expenditure.repository";
import { UploadAnnexService } from "../../tramte-management/services/upload-annex.service";
import { GetUserDTO } from "../../users/model/dto/get-user.dto";
import { AddSupportPaymentDTO } from "../model/add-support-payment.dto";

export class AddSupportPaymentService {


    private uploadAnnexService: UploadAnnexService = new UploadAnnexService();
    private expenditureRepository: TramiteExpenditureRepository = new TramiteExpenditureRepository();


    async addSupportPaymentDocument(addSupportPaymentDTO: AddSupportPaymentDTO, userDto: GetUserDTO) {
        const { id_expenditure, support_file } = addSupportPaymentDTO

        this.uploadAnnexService.setUserContext(userDto);
        const urlResultFromS3 = await this.uploadAnnexService.uploadFilesToS3Buckets(support_file, `pago para gasto: ${id_expenditure}`)
        
        return await this.expenditureRepository.updateTramiteExpenditureWithSupportURL(id_expenditure, urlResultFromS3);
    }

    async addSupportPaymentDocumentByPetitioner(addSupportPaymentDTO: AddSupportPaymentDTO, userDto: GetUserDTO) {
        const { id_expenditure, support_file } = addSupportPaymentDTO

        this.uploadAnnexService.setUserContext(userDto);
        const urlResultFromS3 = await this.uploadAnnexService.uploadFilesToS3Buckets(support_file, `pago para gasto: ${id_expenditure} solicitante`)
        
        return await this.expenditureRepository.updateTramiteExpenditureWithSupportURLByPetitioner(id_expenditure, urlResultFromS3);
    }
}