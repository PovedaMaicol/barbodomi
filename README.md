# 📋 Descripción del Proyecto
Barbodomi es una plataforma fullstack para gestión de servicios de domicilios que conecta a clientes con domiciliarios. El sistema permite gestionar pedidos, asignar domiciliarios, y realizar seguimiento en tiempo real de los envíos.

# 🎯 Características Principales
Backend: API RESTful con NestJS, TypeORM y PostgreSQL

Frontend: App móvil con React Native/Expo

Autenticación: JWT con roles (admin, domiciliario, cliente)

Geolocalización: Seguimiento en tiempo real de domiciliarios

Notificaciones: Push notifications para actualizaciones de pedidos

Panel de administración: Gestión completa de usuarios y pedidos

## 📁 Estructura del Proyecto

```
barbodomi/
├── backend/ # API NestJS
│ ├── src/
│ │ ├── modules/ # Módulos de la aplicación
│ │ ├── common/ # Utilidades compartidas
│ │ └── config/ # Configuraciones
│ ├── test/ # Tests
│ └── package.json
│
├── frontend_bd/ # App móvil Expo

│ ├── src/
│ │ ├── screens/ # Pantallas de la app
│ │ ├── components/ # Componentes reutilizables
│ │ ├── navigation/ # Navegación
│ │ └── services/ # Conexión con API
│ └── app.json
│
└── README.md
```

