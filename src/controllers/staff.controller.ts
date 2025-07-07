import { NextFunction, Request, Response } from "express";
import { BaseController } from "./base.controller";
import { Staff } from "../models/staff.model";
import { StaffService } from "../services/staff.service";
import { ApiResponse } from "../utils/api.response";

export class StaffController extends BaseController<Staff> {
  protected service: StaffService;

  constructor() {
    const service = new StaffService();
    super(service);
    this.service = service;
  }
}
