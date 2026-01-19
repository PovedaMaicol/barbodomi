/* eslint-disable */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateNegocioDto } from './dto/create-negocio.dto';
import { UpdateNegocioDto } from './dto/update-negocio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Negocio } from './entities/negocio.entity';

@Injectable()
export class NegociosService {
  private readonly logger = new Logger(NegociosService.name);
  constructor(
    @InjectRepository(Negocio)
    private readonly negocioRepository: Repository<Negocio>,
  ) {}

  async create(createNegocioDto: CreateNegocioDto): Promise<Negocio> {
    try {
      const newNegocio = this.negocioRepository.create({ ...createNegocioDto });
      const savedNegocio = await this.negocioRepository.save(newNegocio);
      return savedNegocio;
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
