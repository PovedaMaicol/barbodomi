/* eslint-disable */
import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateDomiciliarioDto } from './dto/create-domiciliario.dto';
import { UpdateDomiciliarioDto } from './dto/update-domiciliario.dto';
import { Domiciliario } from './entities/domiciliario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DomiciliarioService {
  private readonly logger = new Logger(DomiciliarioService.name);
  constructor(
    @InjectRepository(Domiciliario)
    private readonly domiciliarioRepository: Repository<Domiciliario>,
  ) {}

  async create(
    createDomiciliarioDto: CreateDomiciliarioDto,
  ): Promise<Domiciliario> {
    try {
      const newDomiciliario = this.domiciliarioRepository.create(
        createDomiciliarioDto,
      );
      const savedDomiciliario =
        await this.domiciliarioRepository.save(newDomiciliario);

      return savedDomiciliario;
    } catch (error) {
      this.logger.error(
        `Error creating domiciliario: ${error.message}`,
        error.stack,
      );
      if (error.code === '23505') {
        // Código para violación de unique constraint en PostgreSQL
        throw new ConflictException('El domiciliario ya existe');
      }
      throw new InternalServerErrorException('Error al crear el domiciliario');
    }
  }

  async findAll(): Promise<Domiciliario[]> {
    return this.domiciliarioRepository.find();
  }

  async findOne(id: number) {
    const domiciliario = await this.domiciliarioRepository.findOne({
      where: { id },
    });

    if (!domiciliario) {
      throw new NotFoundException(`Domiciliario with ID ${id} not found`);
    }
    return domiciliario;
  }

  async update(
    id: number,
    updateDomiciliarioDto: UpdateDomiciliarioDto,
  ): Promise<Domiciliario> {
    const domiciliario = await this.findOne(id);

    const datosActualizados = { ...updateDomiciliarioDto };

    const domiciliarioActualizado = this.domiciliarioRepository.merge(
      domiciliario,
      datosActualizados,
    );

    try {
      return await this.domiciliarioRepository.save(domiciliarioActualizado);
    } catch (error) {
      this.logger.error(
        `Error updating domiciliario: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Error al actualizar el domiciliario');
    }
  }

  async remove(id: number) {
    const result = await this.domiciliarioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Domiciliario with ID ${id} not found`);
    }
  }
}
