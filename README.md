# Tienda online 

Proyecto de tienda online con Node.js y MongoDB, autenticación segura con cookie y sesión, un panel de administración y, del lado cliente, las vistas de productos y de crear pedido. Todo se renderiza en el servidor con Pug.

Son dos aplicaciones Express independientes que comparten la misma base de datos:

- `/backend`: panel de administración para admin (puerto 3000)
- `/frontend`: tienda para los clientes (puerto 4000)

## Contexto

Este proyecto es un challenge del programa **CodePro** de **Penguin Academy**. La consigna planteaba un escenario ficticio: construir una tienda online para una comunidad de pingüinos, con un panel de administración para gestionar el negocio.

Por eso el catálogo de ejemplo tiene tres categorías (peces, bandejas de hielo y esmoquin).

La consigna también imponía restricciones técnicas que condicionan el diseño:

- Renderizado en el servidor con Pug, sin JavaScript en el navegador.
- Autenticación con sesiones y cookies `httpOnly`, y contraseñas hasheadas.
- Panel de administración (`/backend`) y tienda (`/frontend`) como aplicaciones separadas, con MongoDB como base de datos.


## Herramientas usadas

- Node.js
- Express
- MongoDB (Atlas) y Mongoose
- Pug
- bcrypt
- express-session y connect-mongo

## Requisitos

- Node.js instalado
- Una base de datos MongoDB (por ejemplo, una cuenta gratuita en MongoDB Atlas)

## Instalación

Clonar el repositorio:

```bash
git clone <URL-del-repositorio>
cd <carpeta-del-repositorio>
```

### Backend (panel de administración)

```bash
cd backend
npm install
```

Copiá `.env.example` a `.env` y completá las variables. Después, creá al admin con el seed (explicado más adelante en en el apartado *Crear el admin*) y luego arrancá el servidor con:

```bash
npm run dev
```

Disponible en http://localhost:3000/login

### Frontend (tienda)

En otra terminal:

```bash
cd frontend
npm install
```

Copia `.env.example` a `.env`, completa las variables y arrancá con:

```bash
npm run dev
```

Disponible en http://localhost:4000/productos

## Crear al admin

Desde la carpeta `backend`, una vez configurado el `.env`:

```bash
node src/scripts/seed.js
```

## Variables de entorno

Los archivos `.env.example` de cada proyecto muestran las variables que hay que completar.

**Backend:** `MONGODB_URI`, `SESSION_SECRET`, `ADMIN_PASSWORD`

**Frontend:** `MONGODB_URI`

Las dos aplicaciones usan la misma `MONGODB_URI`, porque comparten la base de datos.

## Limitaciones conocidas

- El stock no se descuenta al crear un pedido.
- La página de confirmación no muestra el detalle del pedido.
