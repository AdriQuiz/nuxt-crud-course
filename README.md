# Nuxt Crud Course

Este proyecto es una simulación de un carrito de compras desarrollado con Nuxt + Vue y Nest JS. En este README se detalla el desarrollo del lado del Front-End.
Consume la API REST del backend para manejar productos, usuarios y carritos.

## Instrucciones de setup

1. Clonar el repositorio:

```bash
git clone https://github.com/AdriQuiz/nuxt-crud-course.git
cd nuxt-crud-course
```

2. Instalar dependencias y crear .env

```bash
npm install
# o
yarn install
```

Se consideran estas URLs de ejemplo, la URI de mongoDB debe reemplazarse con la correcta.

```bash
touch .env
NUXT_PUBLIC_API_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://christina:<your_password>@cluster0.7klddq6.mongodb.net/?appName=Cluster0
```

### Librerías usadas
- **mongoose:** Para el manejo de base de datos en MongoDB Atlas.
- **nuxt-toast:** Para mostrar popups de éxito o error en operaciones.

3. Correr el servidor:

```bash
npm run dev
# o
yarn dev
```

4. Abrir el navegador, el frontend estará disponible en:

```bash
http://localhost:5173
```

## Funcionalidades

1. Usuarios
2. Productos
3. Carritos