import { NextFunction, Request, Response } from "express";

import paginate from '@config/paginate';

export default function pagination(req: Request, res: Response, next: NextFunction) : void{
    req.body.page = req.body?.page || 1;
    req.body.limit = req.body?.limit || paginate.limit;
    next();
}