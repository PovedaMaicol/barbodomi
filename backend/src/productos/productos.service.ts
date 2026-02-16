/* eslint-disable */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ProductosService {
  private readonly logger = new Logger(ProductosService.name);
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    private readonly supabaseService: SupabaseService,
  ) {}

  async create(
    createProductoDto: CreateProductoDto,
    file?: Express.Multer.File,
  ): Promise<Producto> {
    try {
      let img_url = null;
      let img_path = null;

      // Si hay archivo, subirlo a Supabase
      if (file) {
        const bucketName = 'productos'; // ← Nombre del bucket
        const uploadResult = await this.supabaseService.uploadFile(
          bucketName,
          file.buffer,
          file.mimetype,
          file.originalname,
        );

        img_url = uploadResult.publicUrl;
        img_path = uploadResult.path;
      }

      // Crear producto con las URLs
      const newProducto = this.productoRepository.create({
        ...createProductoDto,
        img_url,
        img_path,
      });
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
    file?: Express.Multer.File,
  ): Promise<Producto> {
    const producto = await this.findOne(id);

    if (file) {
      // Si el producto ya tiene una imagen, eliminarla de Supabase
     const { publicUrl, path} = await this.supabaseService.uploadFile(
        'productos',
        file.buffer,
        file.mimetype,
        file.originalname,
      );

      if (producto.img_path) {
        await this.supabaseService.deleteFile('productos', producto.img_path);
      }

      producto.img_url = publicUrl;
      producto.img_path = path;
    }

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
