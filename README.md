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

Se consideran la URL para conectar con el backend.
Se condera la URL para conectar la base de datos de MongoDB.

```bash
touch .env
NUXT_PUBLIC_API_URL=http://localhost:3000
MONGODB_URI=<MONGODB_URI>
```

### Tecnologías usadas
- **mongoose:** Para el manejo de base de datos en MongoDB Atlas.
- **nuxt-toast:** Para mostrar popups de éxito o error en operaciones.
- **Tailwind CSS:** Para describir estilos a las páginas.

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

Asegurarse de tener el backend corriendo localmente en:

```bash
http://localhost:3000
```


## Cómo probar las funcionalidades

1. Inicio del sitio

- Abrir http://localhost:5173 en el navegador.
- Se debe ver una página base que permite elegir 3 opciones:
- Ver productos, ver usuarios o ver carrito

2. Gestión de usuarios

- Desde la pagina principal `/users`, se listan los usuarios.
- Cada uno tiene la opcion de actualizar o eliminar.
- Hay un botón para crear nuevo usuario.

3. Gestión de productos

- Desde la pagina principal `/products`, se listan los productos.
- Cada uno tiene la opcion de actualizar o eliminar.
- Hay un botón para crear nuevo productos.

4. Carrito de compras

- En la página `/cart`, se accede a los items de carrito de un usuario mediante su ID.
- En la parte izquierda, se renderiza el catálogo de productos disponibles.
- En la parte derecha, se renderiza la lista de items elegidos.
- Una vez seleccionado un item, se puede editar su cantidad con botones o escribiendo directamente la cantidad deseada, siempre que esté en stock.
- El frontend envía la petición al backend usando la URL configurada en .env

## Estructura general del proyecto

```bash
pages/ --> Vistas principales (inicio, productos, carrito, usuarios)
components/ --> Componentes reutilizables (formularios)
composables/ --> Funciones auxiliares y lógica reutilizable
assets/ --> Archivos de estilos o imágenes
.env --> Variables de entorno
```
