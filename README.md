# Atom Task Manager - Cloud Functions Backend

Backend serverless para gestión de tareas, construido con Express y desplegado en Firebase Cloud Functions.

## Stack Tecnológico

| Categoría | Tecnología |
|---|---|
| Runtime | Node.js 20 |
| Framework | Express 5 |
| Lenguaje | TypeScript 5.7 |
| Base de datos | Firestore (NoSQL) |
| Autenticación | JWT (jsonwebtoken) |
| Validación | class-validator + class-transformer |
| Deploy | Firebase Cloud Functions / Docker (Cloud Run) |

## Estructura del Proyecto

```
functions/
├── src/
│   ├── index.ts                # Punto de entrada de la app Express
│   ├── database.ts             # Inicialización de Firestore
│   ├── collections.ts          # Nombres de colecciones
│   ├── route-modules.ts        # Configuración de rutas
│   ├── dtos/                   # Objetos de transferencia de datos
│   │   ├── auth.dto.ts         # Validación de autenticación
│   │   └── task.dto.ts         # Validación de tareas
│   ├── entities/               # Modelos de datos
│   │   ├── user.entity.ts
│   │   └── task.entity.ts
│   ├── enums/
│   │   └── task.enum.ts        # Estados de tarea (PENDING, DONE, EXPIRED)
│   ├── middleware/
│   │   ├── auth.middleware.ts   # Verificación JWT
│   │   └── validation.middleware.ts
│   ├── service/
│   │   └── jwt.service.ts      # Generación y verificación de tokens
│   └── routes/
│       ├── authentication.route.ts
│       └── tasks.route.ts
└── lib/                        # JavaScript compilado
```

## Instalación

```bash
cd functions
npm install
```

## Scripts Disponibles

```bash
npm run build          # Compilar TypeScript
firebase serve         # Compilar en modo watch (desarrollo)
```

## Variables de Entorno

| Variable | Descripción | Default |
|---|---|---|
| `JWT_SECRET` | Clave secreta para firmar tokens JWT | Se encuentra en el `"JWT_SECRET"` |
| `CORS_ORIGIN` | Origen permitido para CORS | — |
| `PORT` | Puerto del servidor (Cloud Run) | `8080` |

## API Endpoints

### Autenticación (`/api/auth`)

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/register` | Registrar nuevo usuario |
| POST | `/api/auth/login` | Iniciar sesión |

**Request body (ambos endpoints):**
```json
{
  "email": "usuario@ejemplo.com"
}
```

**Response:**
```json
{
  "email": "usuario@ejemplo.com",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Tareas (`/api/tasks`) — Requiere autenticación

Todos los endpoints de tareas requieren el header `Authorization: Bearer <token>`.

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/tasks` | Crear tarea |
| GET | `/api/tasks` | Obtener todas las tareas del usuario |
| GET | `/api/tasks/:id` | Obtener tarea por ID |
| PATCH | `/api/tasks/:id` | Actualizar tarea |
| DELETE | `/api/tasks/:id` | Eliminar tarea |

**Crear tarea - Request body:**
```json
{
  "title": "Mi tarea",
  "description": "Descripción de la tarea",
  "dateExpire": "2026-04-01T00:00:00.000Z",
  "stateTask": "PENDING"
}
```

**Estados posibles:** `PENDING` | `DONE` | `EXPIRED`

## Base de Datos (Firestore)

### Colección `users`
```
{
  id: string,
  email: string
}
```

### Colección `tasks`
```
{
  id: string,
  email: string,
  title: string,
  description: string,
  dateExpire: string (ISO 8601),
  stateTask: "PENDING" | "DONE" | "EXPIRED"
}
```

## Autenticación

La API utiliza JWT (JSON Web Tokens) con expiración de 1 hora. El flujo es:

1. El usuario se registra o inicia sesión en `/api/auth/register` o `/api/auth/login`
2. Recibe un token JWT en la respuesta
3. Incluye el token en las peticiones protegidas: `Authorization: Bearer <token>`
4. El middleware `authMiddleware` verifica el token y extrae el email del usuario