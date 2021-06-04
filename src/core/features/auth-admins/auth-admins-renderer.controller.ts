import {
  Controller,
  Render,
  Get,
  Post,
  UseGuards,
  Req,
  UseFilters,
  Param,
  Body,
  UseInterceptors,
  Put,
  Redirect,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthenticatedExceptionRendererFilter } from '../../commons/filters/authenticated-exception-renderer.filter';
import { PermissionExceptionRendererFilter } from '../../commons/filters/permission-exception-renderer.filter';
import { ValidationExceptionRendererFilter } from '../../commons/filters/validation-exception-renderer.filter';
import { AuthenticatedGuard } from '../../commons/guards/authenticated.guard';
import { ValidationGuard } from '../../commons/guards/validation.guard';
import { LayoutRendererInterceptor } from '../../commons/interceptors/layout-renderer.interceptor';
import { MeInterceptor } from '../../commons/interceptors/me.interceptor';
import { ValidationPipe } from '../../commons/pipes/validation.pipe';
import { FlashService } from '../../globals/services/flash.service';
import { AdminsService } from '../admins/admins.service';

import { AuthAdminsService } from './auth-admins.service';
import {
  LoginAuthAdminsDto,
  VerifyAuthAdminsDto,
  ResetPasswordAuthAdminsDto,
  UpdateMeAuthAdminsDto,
} from './dto';
import { LoginExceptionRendererFilter } from './filters/login-exception-renderer.filter';
import { LoginGuard } from './guards/login.guard';
import { VerifyGuard } from './guards/verify.guard';
import { ManuallyUpdateAuthAdminsInterceptor } from './interceptors/manually-update-auth-admins.interceptor';

@Controller('auth')
export class AuthRendererController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly authAdminsService: AuthAdminsService,
    private readonly flashService: FlashService,
  ) {}

  @Get()
  @UseInterceptors(new LayoutRendererInterceptor('empty'))
  @Render('login')
  index() {
    return;
  }

  @Post()
  @UseGuards(new ValidationGuard(LoginAuthAdminsDto), LoginGuard)
  @UseFilters(ValidationExceptionRendererFilter, LoginExceptionRendererFilter)
  @Redirect('/')
  login() {
    return;
  }

  @Get('/logout')
  @Redirect('/')
  logout(@Req() req) {
    req.logout();
  }

  @Get('/verify/:id')
  @UseGuards(VerifyGuard)
  @UseFilters(PermissionExceptionRendererFilter)
  @UseInterceptors(new LayoutRendererInterceptor('empty'))
  @Render('verify')
  async verifyIndex(@Param('id') id: string) {
    const { email } = await this.adminsService.findOneById(id);
    return {
      email,
    };
  }

  @Post('/verify')
  @UseFilters(ValidationExceptionRendererFilter)
  @UseInterceptors(ManuallyUpdateAuthAdminsInterceptor)
  @Redirect('/')
  async verifyCreate(
    @Body(new ValidationPipe()) verifyAuthAdminsDto: VerifyAuthAdminsDto,
    @Req() req: Request,
  ) {
    const admin = await this.authAdminsService.verifyAdmin(verifyAuthAdminsDto);
    this.flashService.store(req, {
      successMessage: 'Verification completed',
    });
    return admin;
  }

  @Get('/reset_password')
  @UseInterceptors(new LayoutRendererInterceptor('empty'))
  @Render('reset_password')
  resetPasswordIndex() {
    return;
  }

  @Put('/reset_password')
  @UseGuards(new ValidationGuard(ResetPasswordAuthAdminsDto))
  @UseFilters(ValidationExceptionRendererFilter)
  @Redirect('/auth/reset_password')
  async resetPasswordUpdate(
    @Body() resetPasswordAuthAdminsDto: ResetPasswordAuthAdminsDto,
    @Req() req: Request,
  ) {
    try {
      await this.authAdminsService.resetPassword(resetPasswordAuthAdminsDto);
    } catch (_) {
    } finally {
      this.flashService.store(req, { successMessage: 'Please check email' });
    }
  }

  @Get('/me')
  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthenticatedExceptionRendererFilter)
  @UseInterceptors(MeInterceptor)
  @Render('me')
  meIndex() {
    return;
  }

  @Put('/me')
  @UseGuards(AuthenticatedGuard, new ValidationGuard(UpdateMeAuthAdminsDto))
  @UseFilters(
    AuthenticatedExceptionRendererFilter,
    ValidationExceptionRendererFilter,
  )
  @UseInterceptors(ManuallyUpdateAuthAdminsInterceptor)
  @Redirect('/auth/me')
  async meUpdate(
    @Body() updateMeAuthAdminsDto: UpdateMeAuthAdminsDto,
    @Req() req: Request,
  ) {
    const admin = await this.adminsService.update(
      String(req.user._id),
      updateMeAuthAdminsDto,
    );
    this.flashService.store(req, { successMessage: 'Successfully updated' });
    return admin;
  }
}
