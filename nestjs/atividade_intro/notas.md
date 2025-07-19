# Sobre
Esse código foi uma atividade da faculdade aonde baseado no video: [Introdução ao NestJS](https://www.youtube.com/watch?v=dFFpjjD9cj4) tinha que fazer um código e anotações 

***  
# Anotação 

## Criando o projeto
Comando para iniciar o projeto:
```
nest new .
```
Cria um novo projeto NestJS dentro da pasta atual.

Ao ser solicitado, escolha o gerenciador de pacotes npm.

### Instalando pacotes 
```
npm i nanoid@3 sqlite3 typeorm @nestjs/typeorm class-validator class-transformer
```
* nanoid@3: Gera IDs únicos.

* sqlite3: Banco de dados leve para desenvolvimento local.

* typeorm: ORM para manipular o banco de dados usando classes.

* @nestjs/typeorm: Integra o TypeORM com NestJS.

* class-validator: Valida os dados recebidos nas requisições.

* class-transformer: Converte objetos recebidos para instâncias de classes.


##  Criando a API
```
nest g resource developers
```
Responda:

* REST API

* Y para gerar o CRUD automático

## Rodando o Projeto
```
npm run:dev
```

instale a extensão REST Client
crie aiquivo .http
```
### Listar todos os developers
GET http://localhost:3000/developers

### Obter um developer por ID
GET http://localhost:3000/developers/dev_123

### Criar um developer
POST http://localhost:3000/developers

### Atualizar um developer
PATCH http://localhost:3000/developers/dev_123
Content-Type: application/json

### Deletar um developer
DELETE http://localhost:3000/developers/dev_123

```
## Validação de Dados

Crie ou edite o arquivo ``src/developers/dto/create-developer.dto.ts``:
```
import { IsDateString, IsEmail, IsNumber, IsString } from "class-validator";

export class CreateDeveloperDto{

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsDateString()
    dateOfBirth: string;
}
```
### Habilitando a Validação Global
edite em ``main.ts``
```
import { ValidationPipe } from '@nestjs/common';

app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
```
Explicando as opções:

* transform: true: converte os dados para o tipo esperado.

* whitelist: true: ignora propriedades não definidas nos DTOs.
### Testando
para testar se as regra estão funcioanado volte ``CreateDeveloperDto.ts`` de um send request na create developers e mensagem esperada:
```
"message": [
    "nome must be a string",
    "email must be an email",
    "dateOfBirth must be a valid ISO 8601 date string"
  ],
```
pra adicionarmos valores:
```
### create developers
POST http://localhost:3000/developers
Content-Type: application/json

{
    "nome": "nome",
    "email": "email@gmail.com",
    "dateOfBirth": "2000-11-11"
}
```

## Typeorm e sqlite
Vamos criar nossa entidade para interagir com banco de dados dentro do service.
### Configurando Typeorm
no ``app.moudle.ts`` edite:

```
imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities:[__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    DevelopersModule
  ],
```
⚠️ O ``synchronize: true`` é usado apenas para desenvolvimento. 

Agora no nosso ``DevelopersModule.ts`` adicionamos:

```
imports: [TypeOrmModule.forFeature([Developers])],
```
 ### Configurando entidade
no .entity.ts vamos configurar as colunas da entidade:
```
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("developers")
export class Developer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    email: string;

    @Column()
    dateOfBirth: string;

}
```
No video ele ensina fazer um id em alpha numérico usando o nanoid que foi instalado no começo
```
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

 const { nanoid } = require("nanoid")

@Entity("developers")
export class Developer {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string

    @Column()
    email: string;

    @Column()
    dateOfBirth: string;

     @BeforeInsert
    generateID(){
    this.id = `dev_${nanoid()}`;
    }

}
```

### Configurando o service
Edite o ``developers.service.ts`` para injetar o repositório:
```
constructor(
    @InjectRepository(Developer)
    private readonly repository: Repository<Developer>) {}
```
agora vamos configurar nossas proximas funçoes:

Create:
```
create( dto: CreateDeveloperDto){
    const developer = this.repository.create(dto);
    return this.repository.save(developer);
}
```

FindAll & FindOne:
```
FindAll(){
    return this.repository.find();
}
FindOne(id: string){
    return this.repository.findOneby({ id });
}
```
Update:

```
async update (id: string, dto: UpdateDeveloperDto){
    const developer = await this.repository.findOneby({ id });
    if(!developer) return null;
    this.repository.merge(developer, dto);
    return this.repository.save(developer);
}
```
Delete: 

```
async delete (id: string, dto: UpdateDeveloperDto){
    const developer = await this.repository.findOneby({ id });
    if(!developer) return null;
    return this.repository.remove(developer);
}
```

## Boas praticas
Melhorando as respostas no Controller:
```
@Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateDeveloperDto) {
    const developer = await this.developerService.update(id, updatedeveloperDto);
    if (!developer) throw new NotFoundException();
    return developer;
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const developer = await this.DeveloperService.remove(id);
    if (!developer) throw new NotFoundException();
  }
```
>! Se o ID estiver como string, remova qualquer + no @Param('id') nos métodos do controller 