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
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { NegociosService } from './negocios.service';
import { CreateNegocioDto } from './dto/create-negocio.dto';
import { UpdateNegocioDto } from './dto/update-negocio.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('negocios')
@UseGuards(JwtAuthGuard)
export class NegociosController {
  constructor(private readonly negociosService: NegociosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a new Negocio' })
  @ApiBody({ type: CreateNegocioDto })
  @ApiResponse({
    status: 201,
    description: 'The negocio has been successfully created.',
  })
  create(@Body() createNegocioDto: CreateNegocioDto, @UploadedFile() file?: Express.Multer.File) {
    return this.negociosService.create(createNegocioDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Negocios' })
  @ApiResponse({
    status: 200,
    description: 'List of all negocios.',
  })
  findAll() {
    return this.negociosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Negocio by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found negocio.',
  })
  @ApiResponse({
    status: 404,
    description: 'Negocio not found.',
  })
  findOne(@Param('id') id: string) {
    return this.negociosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Negocio by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Negocio ID' })
  @ApiBody({ type: UpdateNegocioDto })
  @ApiResponse({
    status: 200,
    description: 'The negocio has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Negocio not found.',
  })
  update(@Param('id') id: string, @Body() updateNegocioDto: UpdateNegocioDto) {
    return this.negociosService.update(+id, updateNegocioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Negocio by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Negocio ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  remove(@Param('id') id: string) {
    return this.negociosService.remove(+id);
  }
}
