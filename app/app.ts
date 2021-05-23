import express from 'express';
import cors from 'cors';
import {logger} from 'express-winston';
import {loggerOptions, debugLog} from  './components/common/loggers/logger';
import {RoutesModule} from './components/common/routes/common.routes.module';
import {Server, createServer}from 'http';
import { CommonRoutesConfig } from './components/common/routes/common.routes.config';

const app: express.Application = express();
const server: Server = createServer(app);
const port: number = 3000;


app.use(express.json()); 
app.use(express.urlencoded({extended:true}));

app.use(cors());
// app.use(logger(loggerOptions));

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(`Server is running`);
});

const routesModule: RoutesModule = new RoutesModule(app);

server.listen(port, () => {
    
    debugLog(`Server running at http:/localhost:${port}`);
    routesModule.routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configurd for ${route.getName()}`);
    });

});