import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateSettingsDto {
  isUnderMaintenance: string;

  @IsNotEmpty({ message: 'Maintenance message should not be empty' })
  @IsString()
  maintenanceMessage: string;
}
