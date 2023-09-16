# grupo_CodeTriad_frontend

## Integrantes

| Nombre | Usuario |
| -- | -- |
| Rafael Fabio | [@RafaelFabio](https://www.github.com/RafaelFabio)|
| Victoria Jiménez | [@vjimenezs](https://www.github.com/vjimenezs) |
| Radoslav Yuras | [@rzyuras](https://www.github.com/rzyuras)|

## Entregas

### E1

* **Uso de React**: Se hace uso de React, y se crea el proyecto con Vite.
* **Landing page**: La página inicial es la landing page (ruta `/` y `/landing`), su componente principal se encuentra en `src/App.jsx`, y los componentes que lo forman se encuentran en `src/landing/`.
* **Navbar**: Se tiene una navbar para la landing page (componente en `src/landing/navbar.jsx`) y otra para el resto de las páginas (componente y relacionado en `src/navigation/`). Para acceder a los contenidos pasada la landing page, se debe utilizar el botón **Iniciar sesión**, que por el momento permite acceder inmediatamente al sitio.
* **Página principal**: Se accede mediante la ruta `/principal`, o mediante el ícono de corazón en la barra de navegación (explicación en las instrucciones). Componente principal en `src/principal/Principal.jsx`, y lo relacionado en el directorio que lo contiene.
* **Página de instrucciones**: Se muestra luego de *Iniciar Sesión*, mediante la ruta `instructions`, o el ícono de pregunta en la barra de navegación. Componente principal en `src/isntructions/Instructions.jsx`, y lo relacionado en el directorio que lo contiene.
* **Componentes dinámicos**: Se cuenta con componentes dinámicos en la *Página principal* (interactuar mediante el toggle, se lleva el estado del modo actual, ver en `src/principal/Principal.jsx`) y en la *Página de instrucciones* (interactuar mediante la barra de progreso misma y los botones, se lleva el estado del paso, ver en `src/instructions/Instructions.jsx`).
* **GitFlow**: Se hace uso de ramas para cada feature (además de main y develop), pull requests (ver todos los en estado closed), y conventional commits.

### E0

Los documentos correspodientes a la entrega son:

* Docs/**Planificacion.pdf**: Descripción general e Historias de Usuario del proyecto.
* Docs/**Diagrama.pdf**: Diagrama E/R de la aplicación.