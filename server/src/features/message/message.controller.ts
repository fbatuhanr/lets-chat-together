import { Request, Response, NextFunction } from "express"
import * as messageService from './message.service'

async function createMessage(req: Request, res: Response, next: NextFunction) {
    try {
        res.json(await messageService.createMessage(req.body));
    } catch (err) {
        console.error(`Error while creating message`, err);
        next(err);
    }
}
async function getMessage(req: Request, res: Response, next: NextFunction) {
    try {
        res.json(await messageService.getMessage(req.params));
    } catch (err) {
        console.error(`Error while creating message`, err);
        next(err);
    }
}

export { createMessage, getMessage }