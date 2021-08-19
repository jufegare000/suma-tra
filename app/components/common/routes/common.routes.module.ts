
import { TramiteRoutes } from '../../tramite/tramite.routes.config';
import { TramiteSolicitanteRoutes } from '../../users/tramite-solicitante.routes.config'
import { CommonRoutesConfig } from './common.routes.config';
import { Application } from 'express';
import { TramiteTramitadorRoutes } from '../../users/tramite-tramitador.routes.config';
import { TramiteManagementRoutes } from '../../tramte-management/tramite-management.routes';
import { TramiteAttendingRoutes } from '../../tramite-attending/tramite-attending.routes.config';
import { TramiteHistoricRoutes } from '../../tramite-historic/tramite-historic.routes';
import { TramiteExpenditureRoutes } from '../../tramite-expenditures/tramite-expenditures.routes'
import { ExpenditureConceptRoutes } from '../../tramite-expenditures/expenditure-concept.routes';
import { TramiteHistoryExpenditureRoutes } from '../../tramite-expenditures/tramite-expenditure-historic.routes';
export class RoutesModule {
    routes: Array<CommonRoutesConfig> = [];
    app: Application;

    constructor(app: Application) {
        this.app = app;
        this.routes.push(new TramiteTramitadorRoutes(app))
        this.routes.push(new TramiteSolicitanteRoutes(app))
        this.routes.push(new TramiteRoutes(app))
        this.routes.push(new TramiteManagementRoutes(app))
        this.routes.push(new TramiteAttendingRoutes(app))
        this.routes.push(new TramiteHistoricRoutes(app))
        this.routes.push(new TramiteExpenditureRoutes(app))
        this.routes.push(new ExpenditureConceptRoutes(app))
        this.routes.push(new TramiteHistoryExpenditureRoutes(app))
    }

}