/* eslint-disable */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {
  private readonly logger = new Logger(ProductosService.name);
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}
  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    try {
      const newProducto = this.productoRepository.create(createProductoDto);
      return await this.productoRepository.save(newProducto);
    } catch (error) {
      this.logger.error(
        `Error creating producto: ${error.message}`,
        error.stack,
      );
      throw new Error('Error al crear el producto');
    }
  }

  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find();
  }

  async findOne(id: number) {
    const producto = await this.productoRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`Producto with id ${id} not found`);
    }
    return producto;
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    const producto = await this.findOne(id);

    const datosActualizados = { ...updateProductoDto };

    const productoActualizado = this.productoRepository.merge(
      producto,
      datosActualizados,
    );

    try {
      return await this.productoRepository.save(productoActualizado);
    } catch (error) {
      this.logger.error(
        `Error updating producto with id ${id}: ${error.message}`,
        error.stack,
      );
      throw new Error('Error al actualizar el producto');
    }
  }

  async remove(id: number) {
    const result = await this.productoRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Producto with id ${id} not found`);
    }
    return `This action removes a #${id} producto`;
  }
}
