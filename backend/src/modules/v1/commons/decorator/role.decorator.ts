import { Reflector } from '@nestjs/core';
import { RoleType } from '../types/modles.types';

const Roles = Reflector.createDecorator<RoleType[]>();

export default Roles;
