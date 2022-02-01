# Graphql Con Upload de avatar y carga de uno o varios archivos

Crear un .env y llenan sus datos de logeo con Mongodb
y en aws crean un usuario en IAM, y le dan permisos administrador a S3, no olviden de igual forma configurar su carpeta de S3 para que sea publica.

# .env

PORT=4000
MONGODB_LOCAL_URL=mongodb://localhost:27017/graphql-upload
BASE_URL = http://localhost:
SECRET_KEY=
AWS_ID=
AWS_SECRET=
AWS_BUCKET_NAME=