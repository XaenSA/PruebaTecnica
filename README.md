# Gestion de Eventos - Prueba

## Descripcion
Este proyecto es una aplicacion para gestionar eventos y reservas. donde se pueden agregar, editar y eliminar eventos,  los usuarios pueden realizar reservas para esos eventos. El sistema se construyo con React para el frontend y Express con MySQL para el backend.

---
# Recomendaciones
Recomiendo el uso de las aplicaciones como MySQL y Visual studio core para el correcto funcionamiento del sistema


## Instrucciones para configurar y ejecutar el proyecto

### Requisitos previos:
- Node.js (v14 o superior) - https://nodejs.org/en/download/package-manager
- MySQL (v5.7 o superior) - https://dev.mysql.com/downloads/installer/

### Pasos para configurar el backend:

1. **Clonar el repositorio del backend**:
    
    - Ingresa al repositorio del proyecto y descargarlo: https://github.com/XaenSA/PruebaTecnica
    - Desde la terminal (puede ser PowerShell o la terminal de VSC) ingresa a la carpeta "Gestioneventos" (cd Gestioneventos) 
    ```

2. **Configurar la base de datos**:
    - Asegurate de tener MySQL corriendo en tu maquina local.
    - Abre el archivo 1.sql y ejecutalo para crear la tabla de la base de datos (Simbolo de rayo superior) 
    - Abre el archivo 2.sql y ejecutalo para crear las tablas que usaremos (puedes reemplazar si quieres los datos del value ya que simplemente es un ejemplo) 
    - el archivo 3.sql lo puedes usar si quieres para algunos codigos de visualizacion
   

3. **Configurar las credenciales de MySQL**:
    - Abre el archivo `index.js` en la carpeta de Gestioneventos y actualiza las credenciales de MySQL en la conexion:
      ```javascript
      const db = mysql.createConnection({
        host: 'localhost',
        user: 'root', // root es el prederteminado cambialo si usuario de MySQL
        password: 'password, // Tu Clave de MySQL
        database: 'gestion_eventos'
      });
      ```

4. **Ejecutar el backend**:
    Dentro de la terminal que abrimos anteriormente de nuestra  Gestioneventos. escribiremos el siguiente codigo para iniciar nuestro backed

   -- " node index.js" --
    
    -  El backend estara corriendo en `http://localhost:3000`.

---

### Pasos para configurar el frontend:

1. **Clonar el repositorio del frontend**:
    Desde una terminal diferente a la que estamos usando (puede ser CMD o otro terminal de VSC) ingresaremos a la carpeta donde esta ubicado nuestro frontend (cd gestion-eventos-frontend)
    ```

32. **Ejecutar el frontend**:
    Desde nuestra terminal iniciaremos nuestro fronted utilizando el siguiente comando
    -- "npm start"--
    ```
-  El frontend estara corriendo en `http://localhost:3001`.

---

## Descripcion del esquema de la base de datos

La base de datos **`gestion_eventos`** tiene dos tablas principales:

### 1. **Eventos**
Contiene informacion sobre los eventos disponibles.

| Campo        | Tipo         | Descripcion                        |
|--------------|--------------|------------------------------------|
| `id`         | INT          | Identificador unico del evento (clave primaria). |
| `nombre`     | VARCHAR(255) | Nombre del evento.                |
| `descripcion`| TEXT         | Descripcion del evento.           |
| `fecha`      | DATE         | Fecha del evento.                 |
| `cupo`       | INT          | Numero de plazas disponibles.     |

### 2. **Reservas**
Contiene las reservas realizadas por los usuarios para los eventos.

| Campo          | Tipo         | Descripcion                                        |
|----------------|--------------|----------------------------------------------------|
| `id`           | INT          | Identificador unico de la reserva (clave primaria). |
| `evento_id`    | INT          | ID del evento al que corresponde la reserva (clave foranea de `Eventos`). |
| `nombre_usuario` | VARCHAR(255) | Nombre del usuario que realizo la reserva.        |
| `email`        | VARCHAR(255) | Correo electronico del usuario.                   |
| `numero_plazas`| INT          | Numero de plazas reservadas.                      |
| `estado`       | DEFAULT  | Estado de la reserva: `pendiente`, `confirmada`, o `cancelada`. |

---

## Descripcion de los endpoints disponibles

### **Eventos**

1. **GET /eventos**  
   Devuelve una lista de todos los eventos disponibles.
   - **Respuesta**:
     ```json
     [
       {
         "id": 1,
         "nombre": "Concierto de Rock",
         "descripcion": "Evento de musica rock",
         "fecha": "2024-12-15",
         "cupo": 100
       },
       ...
     ]
     ```

2. **POST /eventos**  
   Crea un nuevo evento.
   - **Cuerpo**:
     ```json
     {
       "nombre": "Concierto de Jazz",
       "descripcion": "Evento de musica jazz",
       "fecha": "2024-12-20",
       "cupo": 50
     }
     ```

3. **PUT /eventos/:id**  
   Actualiza un evento existente.
   - **Cuerpo**:
     ```json
     {
       "nombre": "Concierto de Rock Actualizado",
       "descripcion": "Nuevo evento de musica rock",
       "fecha": "2024-12-22",
       "cupo": 120
     }
     ```

4. **DELETE /eventos/:id**  
   Elimina un evento y todas sus reservas asociadas.

---

### **Reservas**

1. **GET /reservas/:evento_id**  
   Devuelve las reservas asociadas a un evento.
   - **Respuesta**:
     ```json
     [
       {
         "id": 1,
         "evento_id": 1,
         "nombre_usuario": "Juan Perez",
         "email": "juan@example.com",
         "numero_plazas": 2,
         "estado": "confirmada"
       },
       ...
     ]
     ```

2. **POST /reservas**  
   Realiza una nueva reserva para un evento.
   - **Cuerpo**:
     ```json
     {
       "evento_id": 1,
       "nombre_usuario": "Carlos Lopez",
       "email": "carlos@example.com",
       "numero_plazas": 2
     }
     ```

3. **PUT /reservas/:id/estado**  
   Actualiza el estado de una reserva (pendiente, confirmada, cancelada).
   - **Cuerpo**:
     ```json
     {
       "estado": "confirmada"
     }
     ```

4. **DELETE /reservas/:id**  
   Elimina una reserva y actualiza el cupo del evento.

---

## Indicaciones para probar la funcionalidad

### Pruebas del Backend:
- Si quieres puedes usar  **Postman** o **cURL** para realizar las solicitudes a los endpoints del backend.
   

### Pruebas del Frontend:
1. Inicia el frontend con `npm start`.
2. Abre tu navegador y navega a `http://localhost:3001`.
3. Interactua con la interfaz:
   - Agrega, edita y elimina eventos.
   - Realiza reservas para los eventos.

---

Este `README.md`  la informacion necesaria para que puedan configurar, ejecutar y probar mi proyecto (a la fecha de hoy en su primera version por lo que debe de tener algunos errores). Si necesitas mas detalles o ajustes adicionales, no dudes en preguntar.
