import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSettingsDto {
  @IsNotEmpty()
  @IsNumber()
  isUnderMaintenance: number;

  @IsNotEmpty({ message: 'Maintenance message should not be empty' })
  @IsString()
  maintenanceMessage: string;
}
