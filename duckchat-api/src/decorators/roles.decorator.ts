import { ArgumentsHost, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const Roles1 = (...roles: string[]) => SetMetadata('roles', roles);

export const Roles2 = Reflector.createDecorator<string[]>();
