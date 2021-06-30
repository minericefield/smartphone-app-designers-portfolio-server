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
  UploadedFile,
  Put,
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
import { CategoriesService } from '../categories/categories.service';

import { DesignsService } from './designs.service';
import {
  CreateDesignFileDto,
  CreateDesignDto,
  UpdateDesignFileDto,
  UpdateDesignDto,
  UpdateDesignPublicDto,
} from './dto';

@Controller('designs')
@UseGuards(AuthenticatedGuard)
@UseFilters(AuthenticatedExceptionRendererFilter)
export class DesignsRendererController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly designsService: DesignsService,
    private readonly flashService: FlashService,
  ) {}

  @Get()
  @UseInterceptors(MeInterceptor)
  @Render('designs')
  async index() {
    return {
      designs: await this.designsService.findAll(),
    };
  }

  @Get('/new')
  @UseGuards(new RoleGuard([ROLES['FULL CONTROL']]))
  @UseFilters(PermissionExceptionRendererFilter)
  @UseInterceptors(MeInterceptor)
  @Render('designs_new')
  async newIndex() {
    return {
      categories: await this.categoriesService.findAll(),
    };
  }

  @Post('/create')
  @UseGuards(new RoleGuard([ROLES['FULL CONTROL']]))
  @UseInterceptors(FileInterceptor('file'))
  @UseFilters(
    PermissionExceptionRendererFilter,
    ValidationExceptionRendererFilter,
  )
  @Redirect('/designs')
  async newCreate(
    @UploadedFile(new ValidationPipe())
    createDesignFileDto: CreateDesignFileDto,
    @Body() createDesignDto: CreateDesignDto, // TODO: ValidationPipe to Body
    @Req() req: Request,
  ) {
    await this.designsService.create(createDesignFileDto, createDesignDto);
    this.flashService.store(req, {
      successMessage: 'Design successfully created',
    });
  }

  @Delete('/:id')
  @UseGuards(new RoleGuard([ROLES['FULL CONTROL']]))
  @UseFilters(PermissionExceptionRendererFilter)
  @Redirect('/designs')
  async remove(@Param('id') id: string, @Req() req: Request) {
    await this.designsService.remove(id);
    this.flashService.store(req, {
      successMessage: 'Design successfully deleted',
    });
  }

  @Get('/:id')
  @UseGuards(new RoleGuard([ROLES['FULL CONTROL']]))
  @UseFilters(PermissionExceptionRendererFilter)
  @UseInterceptors(MeInterceptor)
  @Render('designs_edit')
  async show(@Param('id') id: string) {
    return {
      design: await this.designsService.findOneById(id),
      categories: await this.categoriesService.findAll(),
    };
  }

  @Put('/:id')
  @UseGuards(new RoleGuard([ROLES['FULL CONTROL']]))
  @UseInterceptors(FileInterceptor('file'))
  @UseFilters(
    PermissionExceptionRendererFilter,
    ValidationExceptionRendererFilter,
  )
  @Redirect('/designs')
  async update(
    @Param('id') id: string,
    @UploadedFile(new ValidationPipe())
    updateDesignFileDto: UpdateDesignFileDto,
    @Body() updateDesignDto: UpdateDesignDto,
    @Req() req: Request,
  ) {
    await this.designsService.update(id, updateDesignFileDto, updateDesignDto);
    this.flashService.store(req, {
      successMessage: 'Design successfully updated',
    });
  }

  @Put('/:id/public')
  @UseGuards(new RoleGuard([ROLES['FULL CONTROL']]))
  @UseFilters(PermissionExceptionRendererFilter)
  @Redirect('/designs')
  async updatePublic(
    @Param('id') id: string,
    @Body() updateDesignPublicDto: UpdateDesignPublicDto,
    @Req() req: Request,
  ) {
    await this.designsService.updatePublic(id, updateDesignPublicDto.isPublic);
    this.flashService.store(req, {
      successMessage: 'Design successfully updated',
    });
  }
}
