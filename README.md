<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Smart Workout API

Populate DB -> Mock Data in memory.

```
http://localhost:3000/seed
```

1. Clonar el proyecto
2. `pnpm install`
3. Clonar el archivo `.env.template` y renombrarlo a `.env`
4. Cambiar las variables de entorno.
5. Levantar la base de datos

```
docker-compose up -d
```

6. Levantar: `pnpm start:dev`
