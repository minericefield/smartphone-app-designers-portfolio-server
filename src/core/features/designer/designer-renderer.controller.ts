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
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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

import { DesignerService } from './designer.service';
import { UpdateDesignerFileDto, UpdateDesignerDto } from './dto';

@Controller('designer')
@UseGuards(AuthenticatedGuard)
@UseFilters(AuthenticatedExceptionRendererFilter)
export class DesignerRendererController {
  constructor(
    private readonly designerService: DesignerService,
    private readonly flashService: FlashService,
  ) {}

  @Get()
  @UseInterceptors(MeInterceptor)
  @Render('designer')
  async index() {
    return {
      designer: await this.designerService.find(),
    };
  }

  @Put()
  @UseGuards(new RoleGuard([ROLES['FULL CONTROL']]))
  @UseInterceptors(FileInterceptor('file'))
  @UseFilters(
    PermissionExceptionRendererFilter,
    ValidationExceptionRendererFilter,
  )
  @Redirect('/designer')
  async updateOrCreate(
    @UploadedFile(new ValidationPipe())
    updateDesignerFileDto: UpdateDesignerFileDto,
    @Body() updateDesignerDto: UpdateDesignerDto,
    @Req() req: Request,
  ) {
    await this.designerService.updateOrCreate(
      updateDesignerFileDto,
      updateDesignerDto,
    );
    this.flashService.store(req, {
      successMessage: 'Designer successfully updated',
    });
  }
}
