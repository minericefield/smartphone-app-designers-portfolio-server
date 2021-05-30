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

import { Flash } from '../../commons/decorators/flash.decorator';
import { AuthenticatedExceptionRendererFilter } from '../../commons/filters/authenticated-exception-renderer.filter';
import { PermissionExceptionRendererFilter } from '../../commons/filters/permission-exception-renderer.filter';
import { ValidationExceptionRendererFilter } from '../../commons/filters/validation-exception-renderer.filter';
import { AuthenticatedGuard } from '../../commons/guards/authenticated.guard';
import { ValidationGuard } from '../../commons/guards/validation.guard';
import { FlashData, storeToFlash } from '../../commons/helpers/flash.helper';
import { LayoutRendererInterceptor } from '../../commons/interceptors/layout-renderer.interceptor';
import { MeInterceptor } from '../../commons/interceptors/me.interceptor';
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
  ) {}

  @Get()
  @UseInterceptors(new LayoutRendererInterceptor('empty'))
  @Render('login')
  index(@Flash() flashData: FlashData) {
    return flashData;
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
  async verifyIndex(@Param('id') id: string, @Flash() flashData: FlashData) {
    const { email } = await this.adminsService.findOneById(id);
    return {
      ...flashData,
      email,
    };
  }

  @Post('/verify')
  @UseGuards(new ValidationGuard(VerifyAuthAdminsDto))
  @UseFilters(ValidationExceptionRendererFilter)
  @Redirect('/auth')
  async verifyCreate(
    @Body() verifyAuthAdminsDto: VerifyAuthAdminsDto,
    @Req() req: Request,
  ) {
    await this.authAdminsService.verifyAdmin(verifyAuthAdminsDto);
    storeToFlash(req, {
      successMessage: 'Verification completed',
    });
  }

  @Get('/reset_password')
  @UseInterceptors(new LayoutRendererInterceptor('empty'))
  @Render('reset_password')
  resetPasswordIndex(@Flash() flashData: FlashData) {
    return flashData;
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
      storeToFlash(req, { successMessage: 'Please check email' });
    }
  }

  @Get('/me')
  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthenticatedExceptionRendererFilter)
  @UseInterceptors(MeInterceptor)
  @Render('me')
  meIndex(@Flash() flashData: FlashData) {
    return flashData;
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
    storeToFlash(req, { successMessage: 'Successfully updated' });
    return admin;
  }
}
