# NestJs TesloShop App

- For run locally the data base you need:

`docker-compose up -d`

- The -d, means **detached**

- Local Mongo DB URL: `mongodb://localhost:27017/teslodb`

## Cofigurar las variables de entorno:

Rename the file **.env.template** to **.env**

## Llenar la base de dato con información de prueba:

Hacer petición al end point: `http://localhost:3000/api/seed`
