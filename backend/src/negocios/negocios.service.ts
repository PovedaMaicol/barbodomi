/* eslint-disable */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateNegocioDto } from './dto/create-negocio.dto';
import { UpdateNegocioDto } from './dto/update-negocio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Negocio } from './entities/negocio.entity';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class NegociosService {
  private readonly logger = new Logger(NegociosService.name);
  constructor(
    @InjectRepository(Negocio)
    private readonly negocioRepository: Repository<Negocio>,
    private readonly supabaseService: SupabaseService,
  ) {}

  async create(
    createNegocioDto: CreateNegocioDto,
    file?: Express.Multer.File,
  ): Promise<Negocio> {
    try {
      let img_url = null;
      let img_path = null;

      // Si hay archivo, subirlo a Supabase
      if (file) {
        const bucketName = 'negocios'; // ← Nombre del bucket
        const uploadResult = await this.supabaseService.uploadFile(
          bucketName,
          file.buffer,
          file.mimetype,
          file.originalname,
        );

        img_url = uploadResult.publicUrl;
        img_path = uploadResult.path;
      }

      // Crear negocio con las URLs
      const newNegocio = this.negocioRepository.create({
        ...createNegocioDto,
        img_url,
        img_path,
      });

      return await this.negocioRepository.save(newNegocio);
    } catch (error) {
      this.logger.error(
        `Error creating negocio: ${error.message}`,
        error.stack,
      );
      throw new Error('Error al crear el negocio');
    }
  }

  async findAll(): Promise<Negocio[]> {
    return this.negocioRepository.find();
  }

  async findOne(id: number) {
    const negocio = await this.negocioRepository.findOne({ where: { id } });
    if (!negocio) {
      throw new NotFoundException(`Negocio with ID ${id} not found`);
    }
    return negocio;
  }

  async update(
    id: number,
    updateNegocioDto: UpdateNegocioDto,
  ): Promise<Negocio> {
    const negocio = await this.findOne(id);

    const datosActualizados = { ...updateNegocioDto };

    const negocioActualizado = this.negocioRepository.merge(
      negocio,
      datosActualizados,
    );

    try {
      return await this.negocioRepository.save(negocioActualizado);
    } catch (error) {
      this.logger.error(
        `Error updating negocio: ${error.message}`,
        error.stack,
      );
      throw new Error('Error al actualizar el negocio');
    }
  }

  async remove(id: number) {
    const result = await this.negocioRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Negocio with ID ${id} not found`);
    }
    return `This action removes a #${id} negocio`;
  }
}
