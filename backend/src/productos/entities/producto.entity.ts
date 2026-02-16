/* eslint-disable */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  img_url: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  img_path: string | null;
}
