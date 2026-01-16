/* eslint-disable */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DomiciliarioService } from './domiciliario.service';
import { CreateDomiciliarioDto } from './dto/create-domiciliario.dto';
import { UpdateDomiciliarioDto } from './dto/update-domiciliario.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';



@Controller('domiciliario')
export class DomiciliarioController {
  constructor(private readonly domiciliarioService: DomiciliarioService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Domiciliario' })
  @ApiBody({ type: CreateDomiciliarioDto })
  @ApiResponse({
    status: 201,
    description: 'The domiciliario has been successfully created.',
  })
  create(@Body() createDomiciliarioDto: CreateDomiciliarioDto) {
    return this.domiciliarioService.create(createDomiciliarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Domiciliarios' })
  @ApiResponse({
    status: 200,
    description: 'List of all domiciliarios.',
  })
  findAll() {
    return this.domiciliarioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Domiciliario by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Domiciliario ID' })
  @ApiResponse({
    status: 200,
    description: 'The found domiciliario.',
  })
  @ApiResponse({
    status: 404,
    description: 'Domiciliario not found.',
  })
  findOne(@Param('id') id: string) {
    return this.domiciliarioService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Domiciliario by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Domiciliario ID' })
  @ApiBody({ type: UpdateDomiciliarioDto })
  @ApiResponse({
    status: 200,
    description: 'The domiciliario has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Domiciliario not found.',
  })
  update(
    @Param('id') id: string,
    @Body() updateDomiciliarioDto: UpdateDomiciliarioDto,
  ) {
    return this.domiciliarioService.update(+id, updateDomiciliarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Domiciliario by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Domiciliario ID' })
  @ApiResponse({
    status: 200,
    description: 'The domiciliario has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Domiciliario not found.',
  })
  remove(@Param('id') id: string) {
    return this.domiciliarioService.remove(+id);
  }
}
