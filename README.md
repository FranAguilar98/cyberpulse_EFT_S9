# CyberPulse Gaming

Tienda online de videojuegos, creada para EFT del ramo de Frontend I con **React**, **Vite** y **Bootstrap 5**.

---

## Descripción

CyberPulse Gaming es un sitio web para una tienda de videojuegos. Permite ver el catálogo, filtrar por categoría, buscar por título, armar un carrito de compras y escribir al administrador mediante un formulario de contacto con validación.

El sitio tiene tres secciones:

| Sección | Contenido |
|---|---|
| **Inicio** | Carrusel de banners y tres videojuegos destacados |
| **Productos** | Catálogo completo con búsqueda, filtro por categoría y carrito |
| **Contacto** | Formulario validado y datos de la tienda |

La información de "Quiénes somos" y las redes sociales está en el pie de página.

## Funcionalidades

- **Catálogo dinámico:** los videojuegos se cargan con `fetch` desde `public/datos.json` y se muestran en tarjetas generadas con `.map()`.
- **Tarjetas de producto:** imagen, categoría, desarrollador, nombre, descripción, precio normal, precio de oferta y porcentaje de descuento calculado automáticamente.
- **Filtro por categoría** mediante botones (Todos, Acción, Aventura, Terror).
- **Búsqueda por título** con campo de texto.
- **Carrito de compras:** agregar, quitar, vaciar y total en pesos chilenos. Se guarda en `localStorage`, por lo que no se pierde al recargar la página.
- **Formulario de contacto validado:** nombre obligatorio, correo con formato válido, motivo seleccionado y detalle obligatorio. Muestra un mensaje de error bajo cada campo incorrecto y un mensaje de éxito al enviar.
- **Estados de carga y error:** indicador "Cargando videojuegos..." mientras se obtienen los datos y aviso si la carga falla.
- **Diseño responsivo** para celular, tablet y escritorio.

## Tecnologías

| Tecnología | Uso |
|---|---|
| React 19 | Componentes, estado (`useState`) y efectos (`useEffect`) |
| Vite | Servidor de desarrollo y empaquetado |
| Bootstrap 5.3 | Grilla responsiva, tarjetas, formularios y componentes |
| Bootstrap Icons | Iconografía |
| CSS3 (Grid y Flexbox) | Estilos personalizados y tema neón |
| JavaScript (ES6+) | Lógica, filtros y validaciones |
| HTML5 semántico | `header`, `nav`, `section`, `article`, `aside`, `footer` |
| gh-pages | Publicación en GitHub Pages |

## Instalación y ejecución

**Requisitos:** Node.js 18 o superior y npm.

```bash
# 1. Clonar el repositorio
git clone https://github.com/FranAguilar98/cyberpulse_EFT_S9.git
cd cyberpulse_EFT_S9

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

Abre en el navegador la dirección que muestra la terminal (normalmente `http://localhost:5173/cyberpulse_EFT_S9/`).


## Estructura del proyecto

```
cyberpulse_EFT_S9/
├── public/
│   ├── datos.json              # Catálogo de videojuegos
│   └── imag/                   # Portadas y banners
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx      # Logo, botón de carrito y menú de navegación
│   │   │   ├── Carrusel.jsx    # Carrusel de banners de Inicio
│   │   │   └── Footer.jsx      # Quiénes somos, contacto y redes sociales
│   │   ├── pages/
│   │   │   ├── Inicio.jsx      # Carrusel y videojuegos destacados
│   │   │   ├── Producto.jsx    # Búsqueda, filtros, lista y carrito
│   │   │   └── Contacto.jsx    # Formulario con validación
│   │   └── videojuegos/
│   │       ├── ListaVideoJ.jsx   # Filtra y recorre los videojuegos
│   │       ├── TarjetaVideoJ.jsx # Tarjeta de un videojuego
│   │       └── Carrito.jsx       # Panel del carrito
│   ├── utils/
│   │   └── formato.js          # Formato de precios en CLP
│   ├── Cargando.jsx            # Indicador de carga
│   ├── App.jsx                 # Estado global y carga de datos
│   ├── App.css                 # Estilos personalizados (tema neón)
│   ├── index.css
│   └── main.jsx                # Punto de entrada
├── index.html
├── vite.config.js
└── package.json
```

## Cómo funciona

### Flujo de datos

`App.jsx` concentra el estado de la aplicación y lo reparte a los demás componentes mediante **props**:

| Estado | Descripción |
|---|---|
| `vista` | Página que se muestra: inicio, producto o contacto |
| `categoriaFiltro` | Categoría seleccionada al ir a Productos |
| `videojuegos` | Catálogo cargado desde `datos.json` |
| `cargando` y `error` | Estado de la carga de datos |
| `carrito` | Productos agregados (con persistencia en `localStorage`) |

```
App
├── Header          ← vista, setVista, irAProducto, totalCarrito
├── Inicio          ← videojuegos, carrito, alAgregar, alQuitar
│   ├── Carrusel
│   └── ListaVideoJ → TarjetaVideoJ
├── Producto        ← videojuegos, categoriaInicial, carrito, alAgregar, alQuitar, alVaciar
│   ├── ListaVideoJ → TarjetaVideoJ
│   └── Carrito
├── Contacto
└── Footer
```

### Conceptos de React aplicados

- **`useState`:** vista actual, catálogo, carrito, texto de búsqueda y campos del formulario.
- **`useEffect`:** carga de datos con `fetch` al iniciar y guardado del carrito en `localStorage`.
- **Props:** comunicación de padres a hijos (datos y funciones como `alAgregar`).
- **Renderizado condicional:** estado de carga, mensajes de error, carrito vacío, botón "Agregar" o "Quitar" según corresponda.
- **Listas con `key`:** tarjetas y elementos del carrito generados con `.map()`.

### Validación del formulario de contacto

| Campo | Regla | Mensaje de error |
|---|---|---|
| Nombre | No puede estar vacío | Debe ingresar un nombre |
| Correo | Formato `usuario@dominio.ext` | Debe ingresar un correo válido |
| Motivo | Debe elegir una opción | Debe seleccionar un motivo |
| Detalle | No puede estar vacío | Debe ingresar el detalle de su mensaje |

Si todo es válido, se muestra "¡Hemos enviado su requerimiento!" y el formulario se limpia. El envío es simulado: no existe un servidor.

## Cómo agregar un videojuego

1. Copia la portada en `public/imag/` (recomendado: vertical 3:4, por ejemplo 896 × 1200 px; sin espacios ni tildes en el nombre).
2. Agrega un objeto en `public/datos.json`:

```json
{
  "id": 4,
  "titulo": "Nombre del juego",
  "categoria": "Acción",
  "desarrollador": "Nombre del estudio",
  "descripcion": "Descripción corta del juego.",
  "precio": 29990,
  "precioOferta": 24990,
  "img": "nombre_del_archivo.jpg"
}
```

| Campo | Notas |
|---|---|
| `id` | Número único |
| `categoria` | Debe coincidir exactamente con una de las categorías de `Producto.jsx` (mismas tildes y mayúsculas) |
| `precio` / `precioOferta` | Números sin puntos ni símbolo `$`. La oferta debe ser menor al precio para que aparezca el descuento |
| `img` | Solo el nombre del archivo, sin carpeta |

3. Si usas una categoría nueva, agrégala a la constante `CATEGORIAS` en `src/components/pages/Producto.jsx`.

## Responsividad

El sitio se adapta a distintos tamaños de pantalla:

- **Grilla de Bootstrap** en el catálogo: 1 columna en celular, 2 en tablet y 3 en pantallas grandes.
- **CSS Grid** en el formulario de contacto, el pie de página y el layout de productos y carrito.
- **Flexbox** en el encabezado, el menú y las tarjetas.
- **Media queries** a 900 px y 600 px para apilar columnas y reducir tamaños.
- Imágenes con `object-fit` y proporción fija para que no se deformen.

## Publicación en GitHub Pages

El proyecto usa `base: '/cyberpulse_EFT_S9/'` en `vite.config.js` y las rutas de imágenes y datos se construyen con `import.meta.env.BASE_URL`, para que funcionen tanto en local como en Pages.

```bash
npm run deploy
```

Después, en GitHub: **Settings → Pages → Source: Deploy from a branch → rama `gh-pages` → `/ (root)`**.

> Si cambias el nombre del repositorio, actualiza el valor de `base` en `vite.config.js`.
