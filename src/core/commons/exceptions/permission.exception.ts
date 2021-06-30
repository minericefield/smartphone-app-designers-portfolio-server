import { ForbiddenException } from '@nestjs/common';

export class PermissionException extends ForbiddenException {}
