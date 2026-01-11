/* eslint-disable */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn
} from 'typeorm';

@Entity('domiciliarios')
export class Domiciliario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    primer_nombre: string;

    @Column({ type: 'varchar', nullable: true, length: 100 })
    segundo_nombre: string;

    @Column({ type: 'varchar', length: 100 })
    primer_apellido: string;

    @Column({ type: 'varchar', nullable: true, length: 100 })
    segundo_apellido: string;

    @Column({ type: 'varchar', nullable: true, length: 15, unique: true })
    telefono: string

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'boolean', default: false })
    disponible: boolean;

    @Column({ type: 'varchar', length: 255, nullable: true })
    fotoUrl: string | null;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date; 


 }
