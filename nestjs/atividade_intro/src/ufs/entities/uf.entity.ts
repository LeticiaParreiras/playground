import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cidade } from '../../cidades/entities/cidade.entity';
@Entity('uf')
export class Uf {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sigla: string;

  @OneToMany(() => Cidade, cidade => cidade.uf)
  cidades: Cidade[];
}
