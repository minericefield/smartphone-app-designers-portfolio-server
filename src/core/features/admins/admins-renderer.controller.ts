import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  UseFilters,
  Render,
  Req,
  Redirect,
} from '@nestjs/common';
import { Request } from 'express';

import { ROLES } from '../../commons/constants';
import { Flash } from '../../commons/decorators/flash.decorator';
import { AuthenticatedExceptionRendererFilter } from '../../commons/filters/authenticated-exception-renderer.filter';
import { PermissionExceptionRendererFilter } from '../../commons/filters/permission-exception-renderer.filter';
import { ValidationExceptionRendererFilter } from '../../commons/filters/validation-exception-renderer.filter';
import { AuthenticatedGuard } from '../../commons/guards/authenticated.guard';
import { RoleGuard } from '../../commons/guards/role.guard';
import { ValidationGuard } from '../../commons/guards/validation.guard';
import { FlashData, storeToFlash } from '../../commons/helpers/flash.helper';
import { RolesService } from '../roles/roles.service';

import { AdminsService } from './admins.service';
import { CreateTemporaryAdminDto, ResendVerifyAdminDto } from './dto';

@Controller('admins')
@UseGuards(AuthenticatedGuard, new RoleGuard([ROLES['FULL CONTROL']]))
@UseFilters(
  AuthenticatedExceptionRendererFilter,
  PermissionExceptionRendererFilter,
)
export class AdminsRendererController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly rolesService: RolesService,
  ) {}

  @Get()
  @Render('admins')
  async index(@Flash() flashData: FlashData) {
    return {
      admins: await this.adminsService.findAll(),
      ...flashData,
    };
  }

  @Get('/new')
  @Render('admins_new')
  async newIndex(@Flash() flashData: FlashData) {
    return {
      roles: await this.rolesService.findAll(),
      ...flashData,
    };
  }

  @Post('/create')
  @UseGuards(new ValidationGuard(CreateTemporaryAdminDto))
  @UseFilters(ValidationExceptionRendererFilter)
  @Redirect('/admins')
  async newCreate(
    @Body() createTemporaryAdminDto: CreateTemporaryAdminDto,
    @Req() req: Request,
  ) {
    await this.adminsService.createTemporaryAdmin(createTemporaryAdminDto);
    storeToFlash(req, {
      successMessage: 'Admin successfully created',
    });
  }

  @Get('/:id')
  @Render('admins_update')
  async updateIndex(@Param('id') id: string, @Flash() flashData: FlashData) {
    const admin = await this.adminsService.findOneById(id);
    return {
      ...admin,
      ...flashData,
    };
  }

  @Delete('/:id')
  @Redirect('/admins')
  async remove(@Param('id') id: string, @Req() req: Request) {
    await this.adminsService.remove(id);
    storeToFlash(req, {
      successMessage: 'Admin successfully deleted',
    });
  }

  @Post('/resend_verify/:id')
  @Redirect('/admins')
  async resendVerify(
    @Param('id') id: string,
    @Body() resendVerifyAdminDto: ResendVerifyAdminDto,
    @Req() req: Request,
  ) {
    await this.adminsService.sendVerifyEmail(id, resendVerifyAdminDto.email);
    storeToFlash(req, {
      successMessage: 'Email successfully resent',
    });
  }
}
