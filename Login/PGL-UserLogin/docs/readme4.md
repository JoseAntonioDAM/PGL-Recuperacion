# Ejercicio 4 - Cierre de sesión

## Implementación

El cierre de sesión está implementado en el drawer de la aplicación, accesible desde cualquier pantalla protegida mediante el botón ☰ de la cabecera.

### Funcionamiento

Al pulsar el botón "🚪 Cerrar sesión":

1. Se elimina el token del almacenamiento interno del dispositivo
2. Se limpia el estado local del token
3. Se cierra el drawer
4. Se redirige al usuario a la pantalla de login

```typescript
async function handleLogout() {
  try {
    await removeToken();
    setToken(null);
    setDrawerOpen(false);
    router.replace("/login");
  } catch (error) {
    console.log("ERROR EN LOGOUT:", error);
  }
}
```

El servicio `storage.service.ts` se encarga de eliminar el token:

```typescript
export async function removeToken(): Promise<void> {
  await AsyncStorage.removeItem(TOKEN_KEY);
}
```

Tras el cierre de sesión el drawer desaparece automáticamente ya que el estado `token` pasa a ser `null`.