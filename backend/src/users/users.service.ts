/* eslint-disable  */
import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(createUserDto);
      const savedUser = await this.userRepository.save(newUser);
      return savedUser;
    } catch (error) {
      this.logger.error(
        `Error creating user: ${error.message}`,
        error.stack,
      );
      if (error.code === '23505') {
        // Código para violación de unique constraint en PostgreSQL
        throw new ConflictException('El usuario ya existe');
      }
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

   async findByUsername(username: string){
    const user = await this.userRepository.findOne({ where: { username } });

    try {
      return user;
    } catch (error) {
      this.logger.error(
        `Error finding username by username: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Error al buscar el usuario');
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<User> {
    const user = await this.findOne(id);

    const datosActualizados = { ...updateUserDto };

    const userActualizado = this.userRepository.merge(user, datosActualizados);

    try {
      return await this.userRepository.save(userActualizado);

    } catch (error) {
      this.logger.error(
        `Error updating user: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return `This action removes a #${id} user`;
  }
}
