/* eslint-disable*/
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('negocios')
export class Negocio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    address: string;

    @Column({ type: 'varchar', length: 15 })
    phone: string;

    @Column({ type: 'text', nullable: true })
    description: string | null;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    website: string | null;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'varchar', length: 100, nullable: true })
    category: string | null;

    @Column({ type: 'varchar', nullable: true })
    img_url: string | null;
 }
