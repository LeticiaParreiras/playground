import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cidade } from './entities/cidade.entity';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';

@Injectable()
export class CidadesService {
  constructor(
    @InjectRepository(Cidade)
    private readonly repository: Repository<Cidade>  ) {}

  async create(createCidadeDto: CreateCidadeDto) {
    const cidade = this.repository.create({
      ...createCidadeDto,
      uf: { id: createCidadeDto.uf_id }, // assumindo que o dto vem com o id da UF
    });
    return this.repository.save(cidade);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateCidadeDto: UpdateCidadeDto) {
    const cidade = await this.repository.findOneBy({ id });
    if (!cidade) return null;
    this.repository.merge(cidade, {
      ...updateCidadeDto,
      uf: { id: updateCidadeDto.uf_id }, 
    });
    return this.repository.save(cidade);
  }

  async remove(id: number) {
    const cidade = await this.repository.findOneBy({ id });
    if (!cidade) return null;
    return this.repository.remove(cidade);
  }
}
