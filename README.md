# Ritmo Diario

Aplicación web para organizar hábitos, registrar el cumplimiento diario y consultar la evolución de la constancia. Construida con Vue 3 y Composition API, con persistencia local y soporte para móvil, tablet y escritorio.

**[Ver la aplicación](https://nelsonolarteherrera.github.io/ritmo-diario/)**

## Funcionalidades

- Crear, editar y eliminar hábitos con nombre, descripción, categoría y color.
- Marcar o desmarcar el cumplimiento del día y consultar el progreso general.
- Filtrar los hábitos por salud, estudio, trabajo y vida personal.
- Consultar días completados, racha actual, mejor racha y porcentaje de cumplimiento.
- Revisar hasta 14 días de historial y corregir fechas anteriores mediante confirmación.
- Alternar entre los temas claro y oscuro.
- Exportar e importar respaldos JSON validados, con confirmación antes de reemplazar datos.
- Restablecer los tres hábitos de ejemplo conservando la preferencia de tema.

## Tecnologías

| Área               | Herramientas                                |
| ------------------ | ------------------------------------------- |
| Interfaz           | Vue 3, Composition API y JavaScript         |
| Navegación         | Vue Router                                  |
| Estado             | Pinia                                       |
| Estilos            | CSS nativo, variables CSS y fuentes locales |
| Persistencia       | localStorage                                |
| Desarrollo y build | Vite                                        |
| Pruebas            | Vitest                                      |
| Calidad            | ESLint y Prettier                           |
| Publicación        | GitHub Pages                                |

## Ejecutar en local

Requiere Node.js 20.19.x o Node.js 22.12 o posterior compatible con Vite, y npm. El entorno de validación utiliza Node.js 22.23.3.

```bash
git clone https://github.com/NelsonOlarteHerrera/ritmo-diario.git
cd ritmo-diario
npm ci
npm run dev
```

Abre la URL que indique la terminal. La aplicación se sirve bajo la ruta `/ritmo-diario/`:

```text
http://localhost:5173/ritmo-diario/
```

Si ese puerto está ocupado, Vite puede asignar otro. No se necesitan variables de entorno, cuentas ni una base de datos.

## Organización del código

```text
src/
├── components/   Componentes base, layout y piezas del dominio
├── views/        Resumen, Hábitos, Estadísticas y Configuración
├── stores/       Estado compartido y acciones de hábitos y tema
├── composables/  Persistencia, estadísticas y coordinación reutilizable
├── data/         Catálogos, validadores, ejemplos y contrato de respaldo
├── router/       Rutas de la aplicación
└── assets/       Estilos globales y fuentes
tests/
├── unit/         Pruebas de dominio y stores
└── fixtures/     Respaldos de prueba
scripts/          Generación de entradas estáticas para las rutas
```

Las vistas coordinan cada pantalla, los componentes presentan contenido y emiten eventos, y los stores concentran las operaciones sobre el estado compartido. Los cálculos y la persistencia reutilizables viven en composables.

Los componentes separan plantilla `.vue`, lógica `.js` y estilos `.css` cuando necesitan esas responsabilidades. Los porcentajes y las rachas se calculan a partir de los registros, sin guardar copias de esos resultados.

## Accesibilidad y diseño

- HTML semántico, etiquetas asociadas y mensajes de validación.
- Navegación por teclado, foco visible y gestión del foco en rutas y diálogos.
- Confirmación para eliminar, importar, restablecer y corregir el historial.
- Estados de cumplimiento que combinan texto, forma y color.
- Diseño responsive y soporte para `prefers-reduced-motion`.
- Manrope y Source Sans 3 servidas localmente.

Las licencias de las fuentes se incluyen en [public/fonts](public/fonts/).

## Datos y privacidad

Los hábitos, su historial y el tema se guardan en `localStorage` del navegador. La aplicación funciona sin backend ni sincronización remota.

Para trasladar información a otro navegador o dispositivo, utiliza **Configuración → Gestión de datos**. El respaldo contiene los hábitos y su historial; el tema se conserva en el navegador. Los archivos de hasta 1 MiB se validan antes de solicitar confirmación para el reemplazo.

Borrar los datos del navegador puede eliminar los registros locales. No utilices la aplicación ni sus respaldos para guardar información sensible.

## Comandos

| Comando                | Propósito                                          |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Iniciar desarrollo                                 |
| `npm run build`        | Compilar y generar las entradas estáticas por ruta |
| `npm run preview`      | Revisar el build localmente                        |
| `npm test`             | Ejecutar las pruebas                               |
| `npm run test:watch`   | Ejecutar pruebas durante el desarrollo             |
| `npm run lint`         | Comprobar el código sin admitir advertencias       |
| `npm run format`       | Aplicar formato                                    |
| `npm run format:check` | Comprobar formato                                  |
| `npm run deploy`       | Compilar y publicar dist en gh-pages               |

## Validación

```bash
npm run format:check
npm test
npm run lint
npm run build
```

Las pruebas cubren validación de colores, operaciones del store, persistencia del tema, estadísticas y respaldos. La revisión de interfaz incluye los cuatro módulos, ambos temas, teclado, diálogos y anchos de 375 a 1920 px.

## Publicación

El build genera `dist/` y una entrada física para cada ruta pública:

- `/ritmo-diario/`
- `/ritmo-diario/habitos/`
- `/ritmo-diario/estadisticas/`
- `/ritmo-diario/configuracion/`

GitHub Pages sirve el contenido de la rama `gh-pages`. Si cambia el nombre del repositorio, revisa la propiedad `base` de `vite.config.js` y la configuración de publicación.

## Autor

[Nelson Olarte Herrera](https://github.com/NelsonOlarteHerrera)
