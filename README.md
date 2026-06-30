# Preguntas de reflexión

## 1. Justifiquen la decisión de la Parte 1 (`ApiService` genérico vs. services por dominio).

Se eligió la opción B de trabajar con services por dominio. Elegi esta porque me organiza mejor el codigo. Teniendo en cuenta que teniamos muchas secciones para hacer el service (proveedores, productos, categorias, etc.) iba a ser muy dificil de hacer mantenimiento del proyecto con la otra opción.

---

## 2. ¿Cómo decidieron almacenar y verificar el `rol` del usuario en el frontend? ¿Qué pasa si alguien edita manualmente el `localStorage` para cambiar su rol?

El rol del usuario se guarda en el store de autenticación de Pinia, a partir de la respuesta del backend al iniciar sesión. También se mantiene persistido para conservar la sesión al recargar la página.

Sin embargo, el frontend no es la fuente de verdad. Si una persona modifica manualmente el `localStorage` y cambia su rol, podría modificar lo que ve en la interfaz, pero no debería poder realizar acciones protegidas, porque el backend valida nuevamente el token y los permisos en cada request.

El rol del usuario se guarda en el store de auth de Pinia, tomando los valores de respuesta del backend al hacer `/login`. También pude hacer que la sesión persista al recargar la pagina.

Por otro lado, si alguien modifica manualmente el `localStorage` podria tener algun impacto en el front, osea en la parte visual. Pero todas las acciones reales que puedan afectar el backend están protegidas y revisan que tenga el token.

---

## 3. La validación de stock insuficiente existe tanto en el frontend como en el backend. ¿Por qué es necesaria esa duplicación? ¿Cuál es la fuente de verdad?

La validación del front sirve para mejorar la experiencia del usuario. Avisar algun problema antes de enviar la request al backend.

Pero la validacion principal está en el backend creo yo, porque la validacion del front es, como dije antes, para mejorar la pagina para el usuario, pero no es algo seguro, podria ser salteado. En cambio el backend si nos da una seguridad real y por eso es tan importante.

---

## 4. ¿Qué problemas de CORS pueden surgir al consumir esta API desde Vite, y cómo se resuelven en este proyecto (`vite.config.js`)?

Al consumir una API desde Vite puede haber problemas porque el frontend y el backend corren en distintas direcciones.

En mi caso fueron:

```text
http://localhost:5173
http://127.0.0.1:5001
```

En este proyecto se resuelve permitiendo el origen del frontend en Flask y configurando los headers necesarios.

Este es un fragmente del codigo del backend:

```python
app = Flask(__name__)

CORS(app, origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173"
])
```

Y previamente tuve que instalar CORS en el back:

```bash
pip install flask-cors
```
