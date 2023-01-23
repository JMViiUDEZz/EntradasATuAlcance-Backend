<h1 align="center">EntradasATuAlcance - Backend</h1>
<p align="center"> Logo e imagen o gif de la interfaz principal de la herramienta</p>
<p align="center"><img src="https://www.webdevelopersnotes.com/wp-content/uploads/create-a-simple-home-page.png"/></p> 

## Tabla de contenidos:
---

- [Requisitos previos](#requisitos-previos)
- [Configuración del proyecto](#configuración-del-proyecto)
- [Guía de instalación](#lanzar-y-descubrir)
- [Cómo contribuir](#cómo-contribuir)
- [Código de conducta](#código-de-conducta)
- [Autor/es](#autores)
- [Información adicional](#información-adicional)
- [Licencia](#licencia)
- [Limitación de responsabilidades - Solo BID](#limitación-de-responsabilidades)

<!-- [![License](https://img.shields.io/github/license/saluki/nestjs-template.svg)](https://github.com/saluki/nestjs-template/blob/master/LICENSE) -->



## Requisitos previos

Antes de comenzar, asegúrese de tener al menos estos componentes en su estación de trabajo:

- Una versión actualizada de [NodeJS](https://nodejs.org/) y NPM
- Una base de datos [PostgreSQL](https://www.postgresql.org/). 
- [Docker](https://www.docker.com/) es útil para pruebas avanzadas y creación de imágenes, aunque no es necesario para el desarrollo.

Puede utilizar tanto el archivo `docker-compose` como el `Dockerfile` proporcionado en el siguien enlace: [GitHub](https://github.com/JMViiUDEZz/HLC-AltaDisponibilidad/tree/master/Docker).

## Configuración del proyecto

Comience clonando este proyecto en su estación de trabajo.

``` sh
git clone https://github.com/JMViiUDEZz/EntradasATuAlcance-Backend
```

Lo siguiente será instalar todas las dependencias del proyecto.

```sh
cd ./EntradasATuAlcance-Backend
npm install
```

Una vez que se instalan las dependencias, ahora puede configurar su proyecto creando un nuevo archivo `.env` que contiene las variables de entorno utilizadas para el desarrollo.

```
touch .env
nano .env
```

Para una configuración de desarrollo estándar, puede dejar los valores predeterminados para `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_NAME` y `DB_PASSWORD` en la sección `Configuración de API`. La regla `SWAGGER_ENABLE` le permite controlar el módulo de documentación de Swagger para NestJS. Déjalo en `1` al iniciar este ejemplo.

Luego viene la configuración de TypeORM: cambie todo de acuerdo con la configuración de su propia base de datos. También puede ser útil cambiar `TYPEORM_SYNCHRONIZE` a `true` para evitar migraciones durante la fase de desarrollo. No modifique los valores en la sección `TypeORM internals`, a menos que cambie la estructura de carpetas.

Por último, pero no menos importante, defina un `JWT_SECRET` para firmar los tokens JWT o deje el valor predeterminado en un entorno de desarrollo. Actualice el `JWT_ISSUER` al valor correcto según lo establecido en el JWT.

## Lanzar y descubrir

Ahora está listo para iniciar la aplicación NestJS usando el siguiente comando.

```sh
# Perform migrations in your database using TypeORM
npm run migration:run

# Launch the development server with TSNode
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
├── migrations/  # TypeORM migrations created using "npm run migration:create"
├── modules
│   ├── app.module.ts
│   ├── common/  # The common module contains pipes, guards, service and provider used in the whole application
│   ├── passenger/  # A module example that manages "passenger" resources
│   │   ├── controller/
│   │   │   └── passenger.controller.ts
│   │   ├── flow/  # The "flow" directory contains the pipes, interceptors and everything that may change the request or response flow
│   │   │   └── passenger.pipe.ts
│   │   ├── model/
│   │   │   ├── passenger.data.ts  # The model that will be returned in the response
│   │   │   ├── passenger.entity.ts  # The actual TypeORM entity
│   │   │   └── passenger.input.ts  # The model that is used in the request
│   │   ├── passenger.module.ts
│   │   ├── service/
│   │   │   └── passenger.service.ts
│   │   └── spec/
│   └── tokens.ts
└── server.ts
```

## Comandos NPM predeterminados

Los siguientes comandos de NPM ya están incluidos con esta plantilla y se pueden usar para ejecutar, compilar y probar rápidamente su proyecto.

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
```

## Objetivos del proyecto

El objetivo de este proyecto es proporcionar un "paquete de inicio" limpio y actualizado para proyectos de API REST que se crean con NestJS.

## Roadmap

The following improvements are currently in progress : 

- [x] Configuration validation
- [ ] Dockerfile improvements and better usage of environment variables
- [x] Project structure documentation
- [x] TypeORM migration support
- [ ] Healtcheck support
- [ ] Better logging configuration with environment variables
- [ ] Working further on examples for production instructions

## 6. Contributing

Feel free to suggest an improvement, report a bug, or ask something: [https://github.com/saluki/nestjs-template/issues](https://github.com/saluki/nestjs-template/issues)



*Esta herramienta digital forma parte del catálogo de herramientas del **Banco Interamericano de Desarrollo**. Puedes conocer más sobre la iniciativa del BID en [code.iadb.org](https://code.iadb.org)*




## Badges o escudos
---
Es común en muchos repositorios open source el uso de badges o escudos para dar visbilidad el uso de microservicios, licencias, descargas, etc. Recomendamos revisar la iniciativa https://shields.io/ donde según consideres necesario podrás generar badges para tu repo. 

### Ejemplos de badges

- code coverage percentage: ![coverage](https://img.shields.io/badge/coverage-80%25-yellowgreen)
- stable release version: ![version](https://img.shields.io/badge/version-1.2.3-blue)
- package manager release: ![gem](https://img.shields.io/badge/gem-2.2.0-blue)
- status of third-party dependencies: ![dependencies](https://img.shields.io/badge/dependencies-out%20of%20date-orange)
- static code analysis grade: ![codacy](https://img.shields.io/badge/codacy-B-green)
- [SemVer](https://semver.org/) version observance: ![semver](https://img.shields.io/badge/semver-2.0.0-blue)
- amount of [Liberapay](https://liberapay.com/) donations per week: ![receives](https://img.shields.io/badge/receives-2.00%20USD%2Fweek-yellow)
- Python package downloads: ![downloads](https://img.shields.io/badge/downloads-13k%2Fmonth-brightgreen)
- Chrome Web Store extension rating: ![rating](https://img.shields.io/badge/rating-★★★★☆-brightgreen)
- [Uptime Robot](https://uptimerobot.com) percentage: ![uptime](https://img.shields.io/badge/uptime-100%25-brightgreen)

### Badges que solicitamos:
---
En la iniciativa Código para el Desarrollo solicitamos a los equipos que suman sus herramientas al catálogo de sumar el badge generado por el uso del microservicio de evaluación estática de código SonarCloud.

El badge se ve así y redirige al reporte de evaluación estática del último commit de la herramienta:

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=EL-BID_guia-de-publicacion&metric=alert_status)](https://sonarcloud.io/dashboard?id=EL-BID_guia-de-publicacion)


## Descripción y contexto
---
Esto es un archivo README. Debe contener la documentación de soporte uso de la herramienta digital. Las siguientes secciones son las secciones recomendadas que debes poner incluir en cualquier herramienta digital. Puedes descargar este archivo para que te sirva como plantilla.

Asegúrate de empezar este archivo con una breve descripción sobre las funcionalidades y contexto de la herramienta digital. Sé conciso y al grano.

## Guía de usuario
---
Explica los pasos básicos sobre cómo usar la herramienta digital. Es una buena sección para mostrar capturas de pantalla o gifs que ayuden a entender la herramienta digital.
 	
## Guía de instalación
---
Paso a paso de cómo instalar la herramienta digital. En esta sección es recomendable explicar la arquitectura de carpetas y módulos que componen el sistema.

Según el tipo de herramienta digital, el nivel de complejidad puede variar. En algunas ocasiones puede ser necesario instalar componentes que tienen dependencia con la herramienta digital. Si este es el caso, añade también la siguiente sección.

La guía de instalación debe contener de manera específica:
- Los requisitos del sistema operativo para la compilación (versiones específicas de librerías, software de gestión de paquetes y dependencias, SDKs y compiladores, etc.).
- Las dependencias propias del proyecto, tanto externas como internas (orden de compilación de sub-módulos, configuración de ubicación de librerías dinámicas, etc.).
- Pasos específicos para la compilación del código fuente y ejecución de tests unitarios en caso de que el proyecto disponga de ellos.

### Dependencias
Descripción de los recursos externos que generan una dependencia para la reutilización de la herramienta digital (librerías, frameworks, acceso a bases de datos y licencias de cada recurso). Es una buena práctica describir las últimas versiones en las que ha sido probada la herramienta digital. 

    Puedes usar este estilo de letra diferenciar los comandos de instalación.

## Cómo contribuir
---
Esta sección explica a desarrolladores cuáles son las maneras habituales de enviar una solicitud de adhesión de nuevo código (“pull requests”), cómo declarar fallos en la herramienta y qué guías de estilo se deben usar al escribir más líneas de código. También puedes hacer un listado de puntos que se pueden mejorar de tu código para crear ideas de mejora.

## Código de conducta 
---
El código de conducta establece las normas sociales, reglas y responsabilidades que los individuos y organizaciones deben seguir al interactuar de alguna manera con la herramienta digital o su comunidad. Es una buena práctica para crear un ambiente de respeto e inclusión en las contribuciones al proyecto. 

La plataforma Github premia y ayuda a los repositorios dispongan de este archivo. Al crear CODE_OF_CONDUCT.md puedes empezar desde una plantilla sugerida por ellos. Puedes leer más sobre cómo crear un archivo de Código de Conducta (aquí)[https://help.github.com/articles/adding-a-code-of-conduct-to-your-project/]

## Autor/es
---
Nombra a el/los autor/es original/es. Consulta con ellos antes de publicar un email o un nombre personal. Una manera muy común es dirigirlos a sus cuentas de redes sociales.

## Información adicional
---
Esta es la sección que permite agregar más información de contexto al proyecto como alguna web de relevancia, proyectos similares o que hayan usado la misma tecnología.

## Licencia 
---

La licencia especifica los permisos y las condiciones de uso que el desarrollador otorga a otros desarrolladores que usen y/o modifiquen la herramienta digital.

Incluye en esta sección una nota con el tipo de licencia otorgado a esta herramienta digital. El texto de la licencia debe estar incluído en un archivo *LICENSE.md* o *LICENSE.txt* en la raíz del repositorio.

Si desconoces qué tipos de licencias existen y cuál es la mejor para cada caso, te recomendamos visitar la página https://choosealicense.com/.

Si la herramienta que estás publicando con la iniciativa Código para el Desarrollo ha sido financiada por el BID, te invitamos a revisar la [licencia oficial del banco para publicar software](https://github.com/EL-BID/Plantilla-de-repositorio/blob/master/LICENSE.md)

## Limitación de responsabilidades
Disclaimer: Esta sección es solo para herramientas financiadas por el BID.

El BID no será responsable, bajo circunstancia alguna, de daño ni indemnización, moral o patrimonial; directo o indirecto; accesorio o especial; o por vía de consecuencia, previsto o imprevisto, que pudiese surgir:

i. Bajo cualquier teoría de responsabilidad, ya sea por contrato, infracción de derechos de propiedad intelectual, negligencia o bajo cualquier otra teoría; y/o

ii. A raíz del uso de la Herramienta Digital, incluyendo, pero sin limitación de potenciales defectos en la Herramienta Digital, o la pérdida o inexactitud de los datos de cualquier tipo. Lo anterior incluye los gastos o daños asociados a fallas de comunicación y/o fallas de funcionamiento de computadoras, vinculados con la utilización de la Herramienta Digital.