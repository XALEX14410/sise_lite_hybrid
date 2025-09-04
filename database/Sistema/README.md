## Guía para crear la base de datos y tablas

Antes de importar las tablas, asegúrate de **crear primero la base de datos**.

### 1. Crear la base de datos

Ejecuta el siguiente comando en tu gestor SQL:

```sql
CREATE DATABASE nombre_de_la_base_de_datos;
```

### 2. Importar las tablas

El archivo `sisesqlhybrid.sql` contiene todas las tablas y estructuras necesarias.

#### Opciones para importar:

- **Interfaz gráfica**  
    Utiliza la opción de importar o ejecutar script SQL y selecciona el archivo `sisesqlhybrid.sql`.

- **Terminal**  
    Ejecuta el siguiente comando, reemplazando los valores según corresponda:

    ```bash
    mysql -u usuario -p nombre_de_la_base_de_datos < sisesqlhybrid.sql
    ```

---

Una vez completados estos pasos, tendrás todas las tablas y estructuras listas en tu base de datos.