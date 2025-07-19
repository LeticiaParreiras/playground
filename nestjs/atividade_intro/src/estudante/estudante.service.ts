import { Inject, Injectable } from '@nestjs/common';
import { CreateEstudanteDto } from './dto/create-estudante.dto';
import { UpdateEstudanteDto } from './dto/update-estudante.dto';
import { Repository } from 'typeorm';
import { Estudante } from './entities/estudante.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EstudanteService {
  constructor(
    @InjectRepository(Estudante)
    private readonly repository: Repository<Estudante>) {}
    async create(createEstudanteDto: CreateEstudanteDto) {
      const estudante = this.repository.create({
        ...createEstudanteDto,
        cidade: { id: createEstudanteDto.cidade_id }, // define a relação com a cidade
      });
  
      return this.repository.save(estudante);
    }
  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, updateEstudanteDto: UpdateEstudanteDto) {
    const estudante = await this.repository.findOneBy({ id });
    if(!estudante) return null;
    this.repository.merge(estudante, updateEstudanteDto);
    return this.repository.save(estudante);
  }

  async remove(id: string) {
    const estudante = await this.repository.findOneBy({ id });
    if(!estudante) return null;
    return this.repository.remove(estudante);
  }
}
