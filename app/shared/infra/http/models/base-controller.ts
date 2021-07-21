import * as express from 'express'
import { Logger } from "tslog";

const log: Logger = new Logger();
export abstract class BaseController {

    /**
     * This is the implementation that we will leave to the
     * subclasses to figure out. 
     */
  
    protected abstract executeImpl (
      req: express.Request, res: express.Response
    ): Promise<void | any>;
  
    /**
     * This is what we will call on the route handler.
     * We also make sure to catch any uncaught errors in the
     * implementation.
     */
  
    public async execute (
      req: express.Request, res: express.Response
    ): Promise<void> {
      try {
        await this.executeImpl(req, res);
      } catch (err) {
        log.error(`[BaseController]: Uncaught controller error`);
        log.error(err);
        this.fail(res, 'An unexpected error occurred')
      }
    }
  
    public static jsonResponse (
      res: express.Response, code: number, message: string
    ) {
      return res.status(code).json({ message })
    }
  
    public ok<T> (res: express.Response, dto?: T) {
      if (!!dto) {
        res.type('application/json');
        return res.status(200).json(dto);
      } else {
        return res.sendStatus(200);
      }
    }
  
    public created (res: express.Response) {
      return res.sendStatus(201);
    }
  
    public clientError (res: express.Response, message?: string) {
      return BaseController.jsonResponse(res, 400, message ? message : 'Unauthorized');
    }
  
    public unauthorized (res: express.Response, message?: string) {
      return BaseController.jsonResponse(res, 401, message ? message : 'Unauthorized');
    }
  
    public paymentRequired (res: express.Response, message?: string) {
      return BaseController.jsonResponse(res, 402, message ? message : 'Payment required');
    }
  
    public forbidden (res: express.Response, message?: string) {
      return BaseController.jsonResponse(res, 403, message ? message : 'Forbidden');
    }
  
    public notFound (res: express.Response, message?: string) {
      return BaseController.jsonResponse(res, 404, message ? message : 'Not found');
    }
  
    public conflict (res: express.Response, message?: string) {
      return BaseController.jsonResponse(res, 409, message ? message : 'Conflict');
    }
  
    public tooMany (res: express.Response, message?: string) {
      return BaseController.jsonResponse(res, 429, message ? message : 'Too many requests');
    }
  
    public todo (res: express.Response) {
      return BaseController.jsonResponse(res, 400, 'TODO');
    }
  
    public fail (res: express.Response, error: Error | string) {
      log.error(error);
      return res.status(500).json({
        message: error.toString()
      })
    }
  }