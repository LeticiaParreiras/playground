import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Uf } from "../../ufs/entities/uf.entity";
import { Estudante } from "../../estudante/entities/estudante.entity";
import { generate } from "rxjs";
import { before } from "node:test";

@Entity("cidade")
export class Cidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToOne(() => Uf, (uf) => uf.cidades, { eager: true })
  @JoinColumn({ name: "uf_id" }) // essa é a FK
  uf: Uf;

  @OneToMany(() => Estudante, (estudante) => estudante.cidade)
  estudantes: Estudante[];
}
