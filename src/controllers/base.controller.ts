import { Request, Response, NextFunction } from "express";
import { ICRUD } from "../interfaces/ICRUD.interface";
import { ApiResponse } from "../utils/api.response";
import { HttpError } from "../utils/http.error";

export abstract class BaseController<T> {
  constructor(protected service: ICRUD<T>) {}

  getAll = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.findAll();
      res.json(new ApiResponse(true, data));
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = String(req.params.id);
      const item = await this.service.findById(id);
      res.json(new ApiResponse(true, item));
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const created = await this.service.create(req.body);
      res.status(201).json(new ApiResponse(true, created));
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = String(req.params.id);
      const updated = await this.service.update(id, req.body);
      res.json(new ApiResponse(true, updated));
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = String(req.params.id);
      await this.service.delete(id);
      res.json(new ApiResponse(true, undefined, "Deleted"));
    } catch (err) {
      next(err);
    }
  };

  enable = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = String(req.params.id);
      const enabled = await this.service.enable(id);
      res.json(new ApiResponse(true, enabled, "Enabled"));
    } catch (err) {
      next(err);
    }
  };
}
