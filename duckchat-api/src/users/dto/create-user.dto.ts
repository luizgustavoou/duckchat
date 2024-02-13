import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'minIfNotNull', async: false })
export class MinIfNotNullValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const maxLength = args.constraints[0] || 30;

    if (text === undefined) return true;

    return text.length <= maxLength;
  }

  defaultMessage(args: ValidationArguments) {
    const maxLength = args.constraints[0] || 30;
    return `about must be shorter than or equal to ${maxLength} characters`;
  }
}

export function MinIfNotNull(
  maxLength?: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'minIfNotNull',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [maxLength],
      validator: MinIfNotNullValidator,
    });
  };
}

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(3)
  password: string;

  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  lastName: string;

  @MinIfNotNull(30)
  about: string;

  avatarURL: string;
}
