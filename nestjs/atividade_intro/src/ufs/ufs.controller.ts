import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UfsService } from './ufs.service';
import { CreateUfDto } from './dto/create-uf.dto';
import { UpdateUfDto } from './dto/update-uf.dto';

@Controller('ufs')
export class UfsController {
  constructor(private readonly ufsService: UfsService) {}

  @Post()
  create(@Body() createUfDto: CreateUfDto) {
    return this.ufsService.create(createUfDto);
  }

  @Get()
  findAll() {
    return this.ufsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ufsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUfDto: UpdateUfDto) {
    return this.ufsService.update(+id, updateUfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ufsService.remove(+id);
  }
}
