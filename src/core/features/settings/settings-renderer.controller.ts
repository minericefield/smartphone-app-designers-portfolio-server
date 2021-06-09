import {
  Controller,
  Get,
  Body,
  UseGuards,
  UseFilters,
  Render,
  Req,
  Redirect,
  UseInterceptors,
  Put,
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

import { UpdateSettingsDto } from './dto';
import { SettingsService } from './settings.service';

@Controller('settings')
@UseGuards(AuthenticatedGuard, new RoleGuard([ROLES['FULL CONTROL']]))
@UseFilters(
  AuthenticatedExceptionRendererFilter,
  PermissionExceptionRendererFilter,
)
export class SettingsRendererController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly flashService: FlashService,
  ) {}

  @Get()
  @UseInterceptors(MeInterceptor)
  @Render('settings')
  async index() {
    return {
      settings: await this.settingsService.find(),
    };
  }

  @Put()
  @UseFilters(ValidationExceptionRendererFilter)
  @Redirect('/settings')
  async update(
    @Body(new ValidationPipe()) updateSettingsDto: UpdateSettingsDto,
    @Req() req: Request,
  ) {
    await this.settingsService.update(updateSettingsDto);
    this.flashService.store(req, {
      successMessage: 'Settings successfully updated',
    });
  }
}
