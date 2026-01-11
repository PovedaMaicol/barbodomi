/* eslint-disable */

import { PartialType } from '@nestjs/swagger';
import { CreateDomiciliarioDto } from './create-domiciliario.dto';

export class UpdateDomiciliarioDto extends PartialType(CreateDomiciliarioDto) {}
