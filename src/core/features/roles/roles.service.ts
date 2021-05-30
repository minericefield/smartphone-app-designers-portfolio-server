import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateRoleDto } from './dto/';
import { Role, RoleDocument } from './schemas/role.schema';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  findAll() {
    return this.roleModel.find().sort('_id').exec();
  }

  create(createRoleDto: CreateRoleDto) {
    return new this.roleModel(createRoleDto).save();
  }
}
