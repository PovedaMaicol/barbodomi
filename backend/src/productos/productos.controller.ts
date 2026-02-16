/* eslint-disable */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a new Producto' })
  @ApiBody({ type: CreateProductoDto })
  @ApiResponse({
    status: 201,
    description: 'The producto has been successfully created.',
  })
  create(
    @Body() createProductoDto: CreateProductoDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.productosService.create(createProductoDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Productos' })
  @ApiResponse({
    status: 200,
    description: 'List of all productos.',
  })
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Producto by ID' })
  @ApiResponse({
    status: 200,
    description: 'The producto with the specified ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto not found.',
  })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the producto' })
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Producto by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the producto' })
  @ApiBody({ type: UpdateProductoDto })
  @ApiResponse({
    status: 200,
    description: 'The producto has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto not found.',
  })
  update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productosService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Producto by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the producto' })
  @ApiResponse({
    status: 200,
    description: 'The producto has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto not found.',
  })
  remove(@Param('id') id: string) {
    return this.productosService.remove(+id);
  }
}
