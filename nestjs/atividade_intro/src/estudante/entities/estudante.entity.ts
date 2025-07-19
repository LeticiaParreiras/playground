import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cidade } from '../../cidades/entities/cidade.entity';
@Entity('estudante')
export class Estudante {
  @PrimaryGeneratedColumn()
  id: string;
  
  @Column()
  nome: string;

  @Column()
  matricula: string;

  @Column()
  email: string;

  @Column()
  dt_nascimento: string;

  @ManyToOne(() => Cidade, (cidade) => cidade.estudantes, { eager: true }) // eager carrega junto
  @JoinColumn({ name: 'cidade_id' }) // nome da coluna FK
  cidade: Cidade;
}
