# Ejercicio 1 - Pantalla de registro de usuario

## Implementación

La pantalla de registro se encuentra en `app/register.tsx` y permite crear una nueva cuenta de usuario.

### Campos del formulario

- **Nombre completo**: campo de texto libre
- **Email**: campo con teclado de tipo email y validación de formato
- **Contraseña**: campo oculto con validación de seguridad

### Validaciones implementadas

Antes de realizar la llamada a la API se validan los siguientes campos:

- El nombre no puede estar vacío
- El email debe tener un formato válido (se usa una expresión regular)
- La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número

```typescript
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: string): boolean {
  return password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password);
}
```

### Llamada a la API

Si los datos son válidos se llama al endpoint `POST /auth/register` a través del servicio `auth.service.ts`:

```typescript
await register({ fullname, email, pswd: password });
```

### Respuestas de la API controladas

| Código | Descripción | Acción |
|--------|-------------|--------|
| 201 | Registro exitoso | Alerta de éxito y redirección al login |
| 400 | Cuerpo inválido | Alerta de error |
| 409 | Email ya registrado | Alerta de error |

### Capturas

#### Pantalla de registro vacía
![Registro vacío](../assets/capturas/registro-vacio.png)

#### Registro exitoso
![Registro exitoso](../assets/capturas/registro-exitoso.png)