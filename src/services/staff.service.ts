import { Staff } from "../models/staff.model";
import { StaffRepository } from "../repositories/staff.repository";
import { BaseService } from "./base.service";

export class StaffService extends BaseService<Staff, StaffRepository> {
  constructor() {
    super(new StaffRepository());
  }
}