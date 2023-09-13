# Documentación

Archivo de documentación interna, para su uso en la comunicación del desarrollo.

## E1

### Creación proyecto

La creación del proyecto fue realizada acorde a la [Cápsula 3 Parte I - React Set Up](https://youtu.be/LN0yLqjr_6s?feature=shared): Se utilizó el comando `yarn create vite`, con las opciones `secret-santa`, `React`, y `JavaScript + SWC`. Posteriormente, se creó el `yarn.lock` mediante la ejecución de `yarn`. 

### Git flow

#### Branches

Uso de ramas: `main` contiene versión utilizable y estable, `develop` aloja proyecto en estado de desarrollo, y se utilizarán ramas para cada `feature`:

- `main`
- `develop`
- `landing`
- `navbar`
- `principal`
- `instrucciones`

*Notar*: La rama de cada feature será creada oportunamente por la persona encargada de esta (por lo que es posible que al momento de leer esto no todas las ramas existan).

### Frontend

#### Colores

Paleta de colores a utilizar:

| Color | Hex | 50% Lighter |
| --- | --- | --- |
| Negro | #333333 | - |
| Gris | #666666 | - |
| Blanco | #EEEDF2 | - |
| Rosado fuerte | #D27E93 | #EFAEBF |
| Rosado débil | #F2D6E2 | #F9E8F1 |
| Amarillo | #E6B979 | #F0D7AC |

#### Íconos

Los íconos para el proyecto han sido obtenidos de [svgrepo.com](https://www.svgrepo.com/), en específico, de los siguientes links:

- [Heart](https://www.svgrepo.com/svg/513367/ribbon)
- [Gift](https://www.svgrepo.com/svg/513462/present)
- [Home](https://www.svgrepo.com/svg/513464/house)
- [Info](https://www.svgrepo.com/svg/507330/help-circle)
- [Friends](https://www.svgrepo.com/svg/495588/profile-2user)
- [User](https://www.svgrepo.com/svg/495804/user)
- [Add](https://www.svgrepo.com/svg/494973/add-square)
- [Shuffle](https://www.svgrepo.com/svg/526228/shuffle)

Todos estos íconos se encuentran en `src/assets/icons`, en sus versiones en blanco (`#EEEDF2`) y negro (`#333333`).
