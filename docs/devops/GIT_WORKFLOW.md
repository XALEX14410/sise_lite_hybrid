# Flujo de trabajo Git y colaboración

## Estructura de ramas
- **main**: Rama principal y estable. Solo se mergea código validado.
- **develop**: Rama de integración para desarrollo. Todas las nuevas funcionalidades y correcciones se integran aquí antes de pasar a main.
- **feature/<nombre>**: Ramas para nuevas funcionalidades. Se crean desde develop y se mergean a develop.
- **hotfix/<nombre>**: Ramas para correcciones urgentes en producción. Se crean desde main y se mergean a main y develop.
- **release/<nombre>**: Ramas para preparar una nueva versión. Se crean desde develop y se mergean a main y develop.

## Política de commits
- Mensajes claros y descriptivos en presente.
- Prefijo según tipo: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
- Ejemplo: `feat: agregar login con JWT`

## Pull Requests (PRs)
- Todo cambio debe ir por PR, nunca directo a main o develop.
- Mínimo 2 revisores: QA/documentación y dueño del área impactada.
- No se permite mergear PRs propios sin revisión.
- Usar squash merge para mantener historial limpio.

## Permisos y protección de ramas
- Solo los responsables pueden aprobar y mergear a main/develop.
- Ramas main y develop protegidas contra push directo.
- Revisar y actualizar CODEOWNERS para mantener responsables claros.

## Apoyo y dudas
- Para dudas sobre ramas y convenciones, contactar a @Jesus Alejandro Lara Castro.
