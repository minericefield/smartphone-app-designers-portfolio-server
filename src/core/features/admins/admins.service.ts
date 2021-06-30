import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import urlJoin from 'url-join';

import { ROLES } from '../../commons/constants';
import { ADMIN_STATUS } from '../../commons/constants/';
import {
  MailhogEmailerService,
  AwsSdkEmailerService,
  EMAIL_SERVICE_PROVIDER_KEY,
} from '../../commons/services/emailer.service';
import { SimpleHashingService } from '../../commons/services/simple-hashing.service';

import {
  CreateAdminDto,
  CreateTemporaryAdminDto,
  UpdateAdminDto,
} from './dto/';
import { Admin, AdminDocument } from './schemas/admin.schema';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    private readonly simpleHashingService: SimpleHashingService,
    @Inject(EMAIL_SERVICE_PROVIDER_KEY)
    private readonly emailerService:
      | MailhogEmailerService
      | AwsSdkEmailerService,
  ) {}

  findAll() {
    return this.adminModel.find().populate('role').exec();
  }

  findOneById(id: string) {
    return this.adminModel.findById(id).populate('role').exec();
  }

  findOneByEmail(email: string) {
    return this.adminModel.findOne({ email }).populate('role').exec();
  }

  async create(createAdminDto: CreateAdminDto) {
    return new this.adminModel(
      await this.simpleHashingService.objWithPasswordToHashed(createAdminDto),
    ).save();
  }

  async createTemporaryAdmin(createTemporaryAdminDto: CreateTemporaryAdminDto) {
    const admin = await new this.adminModel({
      ...createTemporaryAdminDto,
      status: ADMIN_STATUS.PENDING,
      canVerify: true,
    }).save();
    await this.sendVerifyEmail(
      String(admin._id),
      createTemporaryAdminDto.email,
    );
    return admin;
  }

  async update(id: string, updateAdminDto: Partial<UpdateAdminDto>) {
    if (typeof updateAdminDto.password !== 'undefined') {
      updateAdminDto = await this.simpleHashingService.objWithPasswordToHashed(
        updateAdminDto as { [key: string]: string; password: string },
      );
    }

    // Cannot get updated doc with exec, and it needs callback(callback can be anything)
    return this.adminModel
      .findOneAndUpdate(
        { _id: id },
        {
          $set: updateAdminDto,
        },
        { returnOriginal: false },
        function () {
          return;
        },
      )
      .populate('role');
  }

  remove(id: string) {
    return this.adminModel
      .deleteOne({ _id: id, role: ROLES['BROWSING CONTROL'] })
      .exec();
  }

  sendVerifyEmail(_id: string, email: string) {
    const url = urlJoin(process.env.HOST, 'auth/verify', _id);
    return this.emailerService.send(
      email,
      'Please set your password',
      `<a href="${url}"> Please set your password from this link. </a>`,
    );
  }
}
