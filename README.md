# webcis-frontend

## Proyecto desarrollado con Vue 3 + Vite + TailwindCSS 4
Este es el repositorio para el desarrollo único del front. Se usará Vue.js y Tailwind para crear las interfaces del proyecto WebCIS.

## Requisitos Previos

| Herramienta                  | Versión recomendada                    | Descripción                 |
| ---------------------------- | -------------------------------------- | --------------------------- |
| **Node.js**                  | 20.x o superior                        | https://nodejs.org/es/download |
| **npm**                      | 9.x o superior                         | Administrador de paquetes   |

### Comandos para verificación de requisitos previos:
node -v \n
npm -v

## Clona el Repo
https://github.com/Danielitros1221/webcis-frontend.git  
cd webcis-frontend/project  
npm install  

## Ejecución del proyecto
npm run dev  
El proyecto quedará en la ruta del puerto: http://localhost:5173

## Uso de Ramas (Git Flow del Proyecto)
El proyecto sigue una estrategia Git Flow Adaptado, pensada para trabajo en equipo:  
#### Rama main: Contiene el código estable, probado y listo para producción. Solo se hace merge desde dev.
#### Rama dev (rama de integración): Aquí se integran todas las funcionalidades antes de pasar a main. Es la rama donde normalmente debe estar trabajando el equipo.
#### Ramas feature: feature/<tarea-especifica>: Se crean para desarrollar funcionalidades nuevas.
  Ejemplos:  
  feature/login-usuario  
  feature/crear-componente-header  


