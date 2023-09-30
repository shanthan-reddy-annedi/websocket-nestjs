import { IsNotEmpty, IsOptional, IsString, IsUUID, Validate, ValidateIf, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { GlobalDto } from 'src/gobalDto/global.dto';

@ValidatorConstraint({ name: 'eitherRecipientIdOrRoomId', async: false })
export class EitherRecipientIdOrRoomIdConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const recipientId = args.object['recipientId'];
    const roomId = args.object['roomId'];

    if ((!recipientId && !roomId) || (recipientId && roomId)) {
      return false; // Validation fails if both are missing or both are present
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Either recipientId or roomId should be present, but not both.';
  }
}

export class PostMessage extends GlobalDto {

  @IsUUID()
  @IsOptional()
  recipientId: string;

  @IsString()
  @IsOptional()
  roomId: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @Validate(EitherRecipientIdOrRoomIdConstraint, {
    message: 'Either recipientId or roomId should be present, but not both.',
  })
  eitherRecipientIdOrRoomId: string;
}
