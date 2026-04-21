---
## 📄 CORE_DECISIONS.md (Propuesta de contenido)

### 🏗️ Arquitectura Hexagonal - Refactor del Core

Este documento resume las decisiones técnicas y de diseño tomadas durante la migración a Arquitectura Hexagonal en el ecosistema **React + Vite + Zustand + Axios**.
---

### 1. Gestión de Infraestructura HTTP (Axios)

**Decisión:** Centralizar la instancia de Axios en `core/infrastructure/axios` como un motor de comunicación de bajo nivel, no como lógica de negocio.

- **Implementación:** Se creó una instancia única con interceptores de tipo seguro (cero `any`).
- **Regla de Oro:** Los adaptadores de las features (`features/*/infrastructure`) consumen esta instancia, pero el resto de la aplicación (UI y Casos de Uso) solo conocen los datos o los errores ya procesados.
- **Beneficio:** Si se decide cambiar Axios por `fetch` o `Ky`, solo se modifica el core.

### 2. Mapeo de Errores de Dominio (`AppError`)

**Decisión:** Convertir los errores técnicos de infraestructura (`AxiosError`) en entidades de error de dominio inmediatamente al fallar una petición.

- **Contrato:** Se definió la interfaz `AppError` en la capa de dominio.
- **Interceptor:** El `errorInterceptor` valida la respuesta de la API (ej. Jikan API) y "limpia" el objeto de error, eliminando el acoplamiento a la estructura interna de Axios.
- **Beneficio:** Los componentes manejan errores predecibles y tipados, facilitando el uso de _Error Boundaries_ y notificaciones al usuario (Sonner/Toast).

### 3. Uso de un schema custom para los métodos comúnes de axios (`Axios`)

**Decisión:** Implementar el tipo de retorno en una petición para cualquier método http soportado por axios usando un genérico T.

- **Contrato:** Se definió la interfaz `CustomAxiosInstance` que define el comportamiento de los métodos "get" | "post" | "put" | "delete" | "patch" para que reciben un genérico en su definición.
- **Beneficio:** Permite que cuando se realice el llamado a la axiosInstance, se pueda tipar la respuesta en el formato esperado aprovechando las bondades de TS.

### 4. Abstracción de Persistencia (Storage Port)

**Decisión:** No permitir que las stores de **Zustand** dependan directamente de la API global `window.localStorage`.

- **Patrón:** Se implementó un `StorageProvider` (Port) y un `LocalStorageAdapter` (Adapter).
- **Configuración:** Zustand usa este adaptador a través del middleware `persist`.
- **Beneficio:** Facilita el testing (mocking) y permite migrar a `IndexedDB` o encriptar datos sin tocar las stores de las features.

### 5. Estructura de Capas en Features

Para mantener la coherencia con el Core, cada feature debe seguir este flujo:

1.  **Domain:** Definición de entidades (`Anime.entity.ts`) y contratos de repositorios (`IAnimeRepository`).
2.  **Infrastructure:** Adaptadores que implementan los contratos usando el cliente de Axios del Core.
3.  **Application:** Casos de uso u orquestación (opcional según complejidad).
4.  **UI/Components:** Solo reacciona al estado y llama a los servicios/hooks.

---

### 🛠️ Próximos Pasos (Definir un próximos pasos, este es boilerplate)

- [ ] Migrar la feature `anime` para que use el `AppError`.
- [ ] Implementar el `StorageProvider` en la `watched.store.ts`.
- [ ] Refactorizar el `AnimeService` para que actúe como un adaptador de infraestructura real.

---
