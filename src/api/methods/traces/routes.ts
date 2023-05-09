import { Router, Request, Response } from 'express';
import { isNativeError } from "util/types";
import { postHandler } from './handlers'

const routes = Router();

routes.post("/traces", async (req: Request, res: Response) => {
    try {
      const response = await postHandler(req);
      res.send(response);
  
    } catch (error) {
      res.send({
        code: 500,
        message: isNativeError(error) ? error.message : "Something unexpected occured!"
      });
    }
  });


export default routes;