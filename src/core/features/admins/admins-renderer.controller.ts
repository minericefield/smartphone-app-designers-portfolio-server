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
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';

import { ROLES } from '../../commons/constants';
import { AuthenticatedExceptionRendererFilter } from '../../commons/filters/authenticated-exception-renderer.filter';
import { PermissionExceptionRendererFilter } from '../../commons/filters/permission-exception-renderer.filter';
import { ValidationExceptionRendererFilter } from '../../commons/filters/validation-exception-renderer.filter';
import { AuthenticatedGuard } from '../../commons/guards/authenticated.guard';
import { RoleGuard } from '../../commons/guards/role.guard';
import { MeInterceptor } from '../../commons/interceptors/me.interceptor';
import { ValidationPipe } from '../../commons/pipes/validation.pipe';
import { FlashService } from '../../globals/services/flash.service';
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
    private readonly flashService: FlashService,
  ) {}

  @Get()
  @UseInterceptors(MeInterceptor)
  @Render('admins')
  async index() {
    return {
      admins: await this.adminsService.findAll(),
    };
  }

  @Get('/new')
  @UseInterceptors(MeInterceptor)
  @Render('admins_new')
  async newIndex() {
    return {
      roles: await this.rolesService.findAll(),
    };
  }

  @Post('/create')
  @UseFilters(ValidationExceptionRendererFilter)
  @Redirect('/admins')
  async newCreate(
    @Body(new ValidationPipe())
    createTemporaryAdminDto: CreateTemporaryAdminDto,
    @Req() req: Request,
  ) {
    await this.adminsService.createTemporaryAdmin(createTemporaryAdminDto);
    this.flashService.store(req, {
      successMessage: 'Admin successfully created',
    });
  }

  @Get('/:id')
  @UseInterceptors(MeInterceptor)
  @Render('admins_update')
  async updateIndex(@Param('id') id: string) {
    const admin = await this.adminsService.findOneById(id);
    return {
      ...admin,
    };
  }

  @Delete('/:id')
  @Redirect('/admins')
  async remove(@Param('id') id: string, @Req() req: Request) {
    await this.adminsService.remove(id);
    this.flashService.store(req, {
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
    this.flashService.store(req, {
      successMessage: 'Email successfully resent',
    });
  }
}
