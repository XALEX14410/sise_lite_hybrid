
# Arquitectura (con usuarios y gobernanza)

**Fecha:** 2025-08-25  
Stack: Next.js + Node.js + MariaDB (Docker)  
Revisores: ver `/.github/CODEOWNERS`

## Arranque rápido
```bash
cp .env.example .env
docker compose up -d --build
# Web: http://localhost:3000
# API: http://localhost:4000
# DB:  localhost:3306
```

---

## Colaboración y flujo de trabajo Git

Este repositorio sigue un flujo de trabajo colaborativo para evitar conflictos y mantener un historial claro.

- **Estructura de ramas:** main, develop, feature/*, hotfix/*, release/*.
- **Política de commits y PRs:** Mensajes claros, PRs revisados por al menos 2 miembros, squash merge.
- **Permisos:** Ramas protegidas, responsables definidos en CODEOWNERS.


Consulta detalles y ejemplos en [`docs/GIT_WORKFLOW.md`](docs/GIT_WORKFLOW.md).

### Restricciones en la rama develop
Para conocer las reglas y el flujo correcto para trabajar con la rama `develop`, revisa el archivo:
[`docs/devops/Restricciones en la rama develop.md`](docs/devops/Restricciones%20en%20la%20rama%20develop.md)
