<h1 align="center">EntradasATuAlcance - Backend</h1>
<p align="center">Logo u imagen</p>
<p align="center"><img src="https://github.com/JMViiUDEZz/EntradasATuAlcance-Backend/blob/master/assets/EntradasATuAlcanceDB.png"/></p> 

## Tabla de contenidos:
---
- [Objetivos del proyecto](#objetivos-del-proyecto)
- [Descripción y contexto](#descripción-y-contexto)
- [Requisitos previos](#requisitos-previos)
- [Guía de instalación](#guía-de-instalación)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Autor/es](#autores)
- [Información adicional](#información-adicional)


## Objetivos del proyecto
---

El objetivo de este proyecto es desarrollar el BackEnd de una API REST creada con NestJS utilizando Postman para probarla. Además, en Docker leventaremos un contenedor con PostgreSQL para la gestión de la base de datos.

## Descripción y contexto
---
El proyecto surge ante la necesidad de ayudar a los analistas a realizar un seguimiento de la actividad de ventas del sitio web ficticio EntradasATuAlcance, en el que los usuarios compran y venden en línea tickets para eventos deportivos, espectáculos y conciertos. En particular, los analistas pueden identificar los movimientos de tickets en el tiempo, las tasas de éxito de los vendedores y los eventos, lugares y temporadas más vendidos. Los analistas pueden usar esta información para ofrecer incentivos a los compradores y vendedores que frecuentan el sitio, a fin de atraer a nuevos usuarios e impulsar la publicidad y las promociones.

<p align="center"><img src="https://github.com/JMViiUDEZz/EntradasATuAlcance-Backend/blob/master/assets/EntradasATuAlcanceDB.png"/></p>

### Tabla CATEGORIES
| Nombre de la columna | Tipo de datos | Descripción |
| :-------- | :------- | :------------------------- |
| `CATID` | `SMALLINT` | Clave primaria, un valor de ID único para cada fila. Cada fila representa un tipo de evento específico para el cual se compran y venden tickets. |
| `CATGROUP` | `VARCHAR` | Nombre descriptivo de un grupo de eventos, como **Shows** y **Sports**. |
| `CATNAME` | `VARCHAR` | Nombre descriptivo abreviado de un tipo de eventos en un grupo, como **Operay Musicals**. |
| `CATDESC` | `VARCHAR` | Nombre descriptivo más largo del tipo de evento, como  **Musical theatre**. |

<!-- ### Tabla DATES
| Nombre de la columna | Tipo de datos | Descripción |
| :-------- | :------- | :------------------------- |
| `DATEID` | `SMALLINT` | Clave primaria, un valor de ID único para cada fila. Cada fila representa un día del año calendario. |
| `CALDATE` | `VARCHAR` | Fecha de calendario, como  **2008-06-24**. |
| `DAY` | `VARCHAR` | Día de la semana (abreviado), como **SA**. |
| `WEEK` | `SMALLINT` | Número de semana, como **26**. |
| `MONTH` | `VARCHAR` | Nombre del mes (abreviado), como **JUN**. |
| `WEEK` | `VARCHAR` | Número de trimestre (de **1** a **4**). |
| `QTR` | `SMALLINT` | Los cuatro dígitos del año **(2008)**. |
| `HOLIDAY` | `BOOLEAN` | La bandera indica si el día es un día festivo (EE. UU.). | -->

## Requisitos previos
---
Antes de comenzar, asegúrese de tener al menos estos componentes en su estación de trabajo:

- Una versión actualizada de [NodeJS](https://nodejs.org/) y NPM
- Una base de datos [PostgreSQL](https://www.postgresql.org/). 
- [Docker](https://www.docker.com/) es útil para pruebas avanzadas y creación de imágenes, aunque no es necesario para el desarrollo.

Puede utilizar tanto el archivo `docker-compose` como el `Dockerfile` proporcionado en el siguien enlace: [GitHub](https://github.com/JMViiUDEZz/HLC-AltaDisponibilidad/tree/master/Docker).

## Guía de instalación
---
<!-- Explica los pasos básicos sobre cómo usar la herramienta digital. Es una buena sección para mostrar capturas de pantalla o gifs que ayuden a entender la herramienta digital. -->
 	
Comience clonando este proyecto en su estación de trabajo.

``` sh
git clone https://github.com/JMViiUDEZz/EntradasATuAlcance-Backend
```

Lo siguiente será instalar todas las dependencias del proyecto.

```sh
cd ./EntradasATuAlcance-Backend
npm i -g @nestjs/cli
npm install --force
```

Una vez que se instalan las dependencias, ahora puede configurar su proyecto creando un nuevo archivo `.env` que contiene las variables de entorno utilizadas para el desarrollo.

```
touch .env
nano .env
```

Para una configuración de desarrollo estándar, puede dejar los valores predeterminados para `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_NAME` y `DB_PASSWORD` en la sección `Configuración de API`. La regla `SWAGGER_ENABLE` le permite controlar el módulo de documentación de Swagger para NestJS. Déjalo en `1` al iniciar este ejemplo.

Luego viene la configuración de TypeORM: cambie todo de acuerdo con la configuración de su propia base de datos. También puede ser útil cambiar `TYPEORM_SYNCHRONIZE` a `true` para evitar migraciones durante la fase de desarrollo. No modifique los valores en la sección `TypeORM internals`, a menos que cambie la estructura de carpetas.

Por último, pero no menos importante, defina un `JWT_SECRET` para firmar los tokens JWT o deje el valor predeterminado en un entorno de desarrollo. Actualice el `JWT_ISSUER` al valor correcto según lo establecido en el JWT.

<!-- Paso a paso de cómo instalar la herramienta digital. En esta sección es recomendable explicar la arquitectura de carpetas y módulos que componen el sistema.

Según el tipo de herramienta digital, el nivel de complejidad puede variar. En algunas ocasiones puede ser necesario instalar componentes que tienen dependencia con la herramienta digital. Si este es el caso, añade también la siguiente sección.

La guía de instalación debe contener de manera específica:
- Los requisitos del sistema operativo para la compilación (versiones específicas de librerías, software de gestión de paquetes y dependencias, SDKs y compiladores, etc.).
- Las dependencias propias del proyecto, tanto externas como internas (orden de compilación de sub-módulos, configuración de ubicación de librerías dinámicas, etc.).
- Pasos específicos para la compilación del código fuente y ejecución de tests unitarios en caso de que el proyecto disponga de ellos. -->

Ahora está listo para iniciar la aplicación NestJS usando el siguiente comando.

```sh
npm run start:dev
```

Ahora puede dirigirse a `http://localhost:8080` y ver la documentación. La API de EntradasATuAlcance se encuentra en el extremo `http://localhost:3000/api`.

Para rutas restringidas, para probar puede usar el siguiente JWT
```
eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJERUZBVUxUX0lTU1VFUiIsImlhdCI6MTYzMTEwNDMzNCwicm9sZSI6InJlc3RyaWN0ZWQifQ.o2HcQBBpx-EJMcUFiqmAiD_jZ5J92gRDOyhybT9FakE
```

> El JWT de muestra anterior no tiene fecha de caducidad, recuerde utilizar un JWT válido y hacer cumplir los reclamos requeridos en producción

## Estructura del proyecto

Esta plantilla se creó con una estructura de directorios bien definida.

```sh
src/
├── common/  # The common module contains pipes, guards, service and provider used in the whole application
├── modules/
│   ├── categories/  # A module example that manages "categories" resources
│   │   ├── dto/
│   │   │   ├── create-category.dto.ts
│   │   │   └── update-category.dto.ts
│   │   ├── entities/
│   │   │   └── category.entity.ts  # The actual TypeORM entity
│   │   ├── categories.controller.ts
│   │   ├── categories.module.ts
│   │   └── categories.service.ts
│   └── seed/ 
├── app.module.ts
└── main.ts
```

<!-- ## Dependencias

Descripción de los recursos externos que generan una dependencia para la reutilización de la herramienta digital (librerías, frameworks, acceso a bases de datos y licencias de cada recurso). Es una buena práctica describir las últimas versiones en las que ha sido probada la herramienta digital. 

Puedes usar este estilo de letra diferenciar los comandos de instalación. -->

<!-- ## Comandos NPM predeterminados -->

<!-- Los siguientes comandos de NPM ya están incluidos con esta plantilla y se pueden usar para ejecutar, compilar y probar rápidamente su proyecto.

```sh
# Start the application using the transpiled NodeJS
npm run start

# Run the application using "ts-node"
npm run dev

# Transpile the TypeScript files
npm run build

# Internal command used during the Docker build stage
npm run build:docker

# Run the project' functional tests
npm run test

# Lint the project files using TSLint
npm run lint

# Create a new migration named MyMigration
npm run migration:create [MyMigration]

# Run the TypeORM migrations
npm run migration:run

# Revert the TypeORM migrations
npm run migration:revert
``` -->

## Autor/es
---
[José María Viúdez](https://github.com/JMViiUDEZz/EntradasATuAlcance-Frontend)

## Información adicional
---
Obviamente, este proyecto cuenta con el desarrollo del [FrontEnd](https://github.com/JMViiUDEZz/EntradasATuAlcance-Frontend) de una APP creada con NextJS.
