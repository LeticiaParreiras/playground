import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudanteModule } from './estudante/estudante.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CidadesModule } from './cidades/cidades.module';
import { UfsModule } from './ufs/ufs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities:[__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    EstudanteModule,
    CidadesModule,
    UfsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
