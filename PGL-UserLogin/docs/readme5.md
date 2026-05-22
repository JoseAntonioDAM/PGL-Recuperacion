# Ejercicio 5 - Endpoint de bienvenida

## Implementación

La pantalla de bienvenida `app/welcome.tsx` incluye un botón que llama al endpoint `GET /welcome` con el token del usuario autenticado.

### Llamada al endpoint

```typescript
async function handleWelcome() {
  const token = await getToken();
  if (!token) {
    Alert.alert("Error", "No hay sesión activa");
    return;
  }
  const response = await getWelcome(token);
  Alert.alert("👋 Bienvenido", response.message);
}
```

### Cabecera de autorización

La petición incluye el token en la cabecera `Authorization` como Bearer token, gestionado por el servicio base HTTP:

```typescript
if (token) {
  headers["Authorization"] = `Bearer ${token}`;
}
```

### Respuestas controladas

| Código | Descripción | Acción |
|--------|-------------|--------|
| 200 | Mensaje de bienvenida personalizado | Alerta con el mensaje |
| 401 | Token inválido o expirado | Alerta de error |

### Capturas

#### Mensaje de bienvenida recibido
![Bienvenida](../assets/capturas/bienvenida.png)