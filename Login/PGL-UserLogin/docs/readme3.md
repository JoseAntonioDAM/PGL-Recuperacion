# Ejercicio 3 - Protección de rutas y drawer condicional

## Implementación

La lógica de protección de rutas se encuentra en `app/_layout.tsx`.

Al arrancar la app, el layout raíz comprueba si existe un token guardado en el dispositivo. Dependiendo del resultado:

- **Sin token**: redirige al login y no muestra el drawer ni la cabecera
- **Con token**: muestra el drawer y la cabecera y redirige a la pantalla de bienvenida

```typescript
async function checkToken() {
  try {
    const savedToken = await getToken();
    setToken(savedToken);
    setLoading(false);
    if (!savedToken && pathname !== "/register") {
      router.replace("/login");
    }
  } catch (error) {
    setLoading(false);
    router.replace("/login");
  }
}
```

El drawer solo se renderiza cuando el estado `token` no es nulo:

```typescript
if (!token) {
  return <Slot />;
}

return (
  <View style={styles.container}>
    {/* Header y Drawer solo visibles con sesión activa */}
    ...
  </View>
);
```

El `useEffect` se ejecuta cada vez que cambia el `pathname`, por lo que el token se recomprueba en cada cambio de ruta.