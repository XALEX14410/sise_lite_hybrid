# 🔒 Restricciones en la rama `develop`

La rama `develop` está protegida para asegurar calidad y evitar conflictos.  
👉 **Nadie puede trabajar directo en `develop`**. Todos los cambios entran vía **Pull Request (PR)**.

## 📋 Restricciones activas
- ❌ **Sin pushes directos**: no se puede crear, actualizar ni borrar `develop` con `git push`.
- ⛔ **Sin `--force`**: no se permite reescribir el historial.
- 📜 **Historia lineal**: solo se aceptan merges por **Squash** o **Rebase**.
- ✅ **Pull Request obligatorio**:
  - 2 aprobaciones mínimas.
  - Revisión obligatoria de **Code Owners**.
  - Revisiones viejas se invalidan si hay nuevos commits.
  - Todas las conversaciones deben quedar resueltas.
- 🔐 **CODEOWNERS activo**: cada carpeta debe ser aprobada por su responsable.

## 👨‍💻 Flujo correcto
1. Crear rama desde `develop`:
  ```bash
  git checkout develop
  git pull
  git checkout -b feature/nueva-funcionalidad
  ```


2. Realiza tus cambios y haz commits descriptivos:
  ```bash
  git add .
  git commit -m "feat: descripción clara del cambio"
  ```
  - El prefijo `feat:` indica que tu commit agrega una nueva funcionalidad al sistema (puede ser backend, frontend, base de datos, etc.).
  - Otros prefijos útiles: `fix:` para correcciones, `docs:` para documentación, `test:` para pruebas, `chore:` para tareas menores.

3. Sube tu rama al repositorio remoto:
  ```bash
  git push origin feature/nueva-funcionalidad
  ```


4. Abre un Pull Request (PR) en GitHub/GitLab:
  - Elige `develop` como rama destino.
  - Agrega una descripción clara de lo que resuelve tu PR.
  - Solicita revisión a los responsables (Code Owners) y QA.
  - [Abrir un Pull Request en GitHub (ejemplo)](https://github.com/XALEX14410/sise_lite_hybrid/compare/develop...feature/nueva-funcionalidad)

5. Espera las revisiones y responde comentarios:
  - Realiza cambios si te los solicitan y vuelve a subirlos.
  - No hagas merge hasta tener las aprobaciones requeridas.

6. Una vez aprobado, realiza el merge usando **Squash** o **Rebase** para mantener el historial limpio.

7. Elimina tu rama si ya no la necesitas.

---

<span style="color: red; font-weight: bold;">❗ Importante: Si intentas hacer push directo a <code>develop</code>, el sistema lo rechazará. Siempre usa PR y sigue el flujo para evitar bloqueos y conflictos.</span>
