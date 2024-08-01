# Aplicación de películas - Back-end

Este proyecto expone los servicios necesarios para la aplicación de películas, maneja seguridad por roles; en su defecto, se crea el rol cliente; sin embargo, se puede parametrizar por permisos cada servicio.

La seguridad está desarrollada con JWT la cual trabaja como middleware para cada servicio seguro.

Para comenzar la aplicación se debe configurar el archivo .env que, por seguridad, no se sube al repositorio, pero el archivo .env.example indica las variables que se requieren.

```
PORT=
NODE_ENV=
DOCKERFILE=

DB_PORT=
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=

JWT_SECRET=
JWT_EXPIRES_IN=

PASSWORD_HASH_SALT=

THEMOVIE_URL=
THEMOVIE_TIMEOUT=
THEMOVIE_KEY=
THEMOVIE_TOKEN=
```

Este proyecto cuenta con una base de datos relacional y un servidor para levantar la API. Esto se hace gracias a Docker el cual crea la base de datos y el servicio. Este proyecto maneja el perfil desplegar en desarrollo y en producción. Para cada uno se encuentra el comando a continuación a ejecutar:

### Para modo de desarrollo.

```
npm run docker:dev
```

### Para modo de producción

```
npm run docker:prod
```

Esto crea lo necesario de acuerdo con el perfil seleccionado.

Para realizar la migración de tablas, lo cual no se recomienda tener activado para ningún ambiente, ya que altera la base de datos. Se debe ingresar al archivo src/app/app.module.ts y el flag synchronize se pondrá en true y este se debe regresar a false nuevamente.

El servicio tendrá unas 2 rutas principales, las cuales se verán al momento de levantar la API que son:

/docs
Para revisar la documentación de los servicios.

/api
Para acceder a los servicios.
