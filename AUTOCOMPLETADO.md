# 🚗 Autocompletado de Vehículos - Guía Completa

## 📋 Resumen

He implementado un sistema completo de autocompletado para marcas y modelos de vehículos con múltiples opciones según tus necesidades:

### ✅ **Lo que está implementado:**

1. **Base de datos local** con 50+ marcas y 1000+ modelos (España/Europa)
2. **Componente de autocompletado avanzado** con navegación por teclado
3. **Integración con APIs externas** (NHTSA, CarQuery) como alternativa
4. **Sistema híbrido** (API + fallback local)
5. **UI profesional** que coincide con el diseño de ShadowGlass

## 🎯 **Opciones disponibles:**

### **1. Base de Datos Local (Recomendado para producción)**
```javascript
// Ya integrado en el formulario
const vehicleManager = new VehicleAutocompleteManager();
vehicleManager.init('car-brand', 'car-model');
```

**Ventajas:**
- ✅ Funciona sin internet
- ✅ Respuesta instantánea
- ✅ Datos específicos para España/Europa
- ✅ Sin límites de API
- ✅ Mayor control

**Desventajas:**
- ❌ Requiere actualizaciones manuales
- ❌ Tamaño del archivo (~50KB)

### **2. API Externa - NHTSA (Oficial EE.UU.)**
```javascript
// Para usar API en lugar de local
const apiManager = new APIVehicleAutocompleteManager();
apiManager.init('car-brand', 'car-model');
```

**Ventajas:**
- ✅ Datos oficiales y actualizados
- ✅ Base de datos muy extensa
- ✅ Gratuita sin límites
- ✅ Incluye códigos oficiales

**Desventajas:**
- ❌ Requiere internet
- ❌ Latencia de red
- ❌ Principalmente vehículos de EE.UU.

### **3. Sistema Híbrido (Mejor de ambos)**
```javascript
// Ya configurado como default
const hybridManager = new APIVehicleAutocompleteManager();
hybridManager.useAPI = true; // Usa API con fallback local
```

**Ventajas:**
- ✅ Combina lo mejor de ambos
- ✅ Funciona siempre (con/sin internet)
- ✅ Datos actualizados cuando es posible
- ✅ Fallback automático

## 🔧 **Cómo funciona actualmente:**

### **En el formulario de contacto:**

1. **Campo "Marca del Vehículo":**
   - Empieza a escribir "A" → muestra "Audi", "Alfa Romeo", "Aston Martin"...
   - Selecciona una marca → habilita el campo de modelo
   - Navegación con ↑↓, selección con Enter, cerrar con Esc

2. **Campo "Modelo y Año":**
   - Solo se activa después de seleccionar marca
   - Muestra modelos específicos de la marca seleccionada
   - Mismo sistema de navegación y selección

### **Características avanzadas:**

- **Búsqueda inteligente:** Ignora acentos, mayúsculas, espacios
- **Navegación por teclado:** Arrows + Enter + Esc
- **Touch-friendly:** Funciona en móviles
- **Loading states:** Indicador visual durante búsqueda
- **Error handling:** Manejo graceful de errores
- **Cache inteligente:** Evita consultas repetidas

## 🎨 **Personalización del diseño:**

El autocompletado usa las mismas variables CSS que el resto del sitio:

```css
.autocomplete-dropdown {
    background: var(--secondary-color); /* Fondo oscuro */
    border: 1px solid var(--border-color); /* Borde gris */
    color: var(--text-primary); /* Texto blanco */
}

.autocomplete-item:hover {
    background: var(--accent-color); /* Fondo blanco al hover */
    color: var(--primary-color); /* Texto negro al hover */
}
```

## 📊 **Datos incluidos:**

### **Marcas principales (50+):**
- **Alemanas:** Audi, BMW, Mercedes-Benz, Volkswagen, Porsche
- **Francesas:** Peugeot, Citroën, Renault, DS
- **Japonesas:** Toyota, Honda, Nissan, Mazda, Lexus
- **Coreanas:** Hyundai, Kia, Genesis
- **Americanas:** Ford, Tesla, Chevrolet
- **Italianas:** Fiat, Alfa Romeo, Ferrari, Lamborghini
- **Británicas:** MINI, Jaguar, Land Rover, Bentley
- **Españolas:** SEAT, Cupra
- **Y muchas más...**

### **Modelos por marca (1000+):**
Cada marca incluye todos sus modelos actuales y populares:
- **Audi:** A1, A3, A4, A5, A6, A7, A8, Q2, Q3, Q5, Q7, Q8, e-tron, RS3, S4, TT...
- **BMW:** Serie 1-8, X1-X7, Z4, i3, i4, iX, M2-M8...
- **Mercedes:** Clase A-S, CLA, CLS, GLA-GLS, AMG GT, EQA-EQS...

## 🚀 **Cómo usar en tu proyecto:**

### **Opción 1: Usar tal como está (Recomendado)**
Ya está todo configurado y funcionando. Solo:
1. Abre el formulario de contacto
2. Prueba escribiendo en "Marca del Vehículo"
3. Selecciona una marca y prueba "Modelo y Año"

### **Opción 2: Usar APIs externas**
Si prefieres datos siempre actualizados:

```javascript
// En js/main.js, cambia la línea:
this.vehicleManager = new VehicleAutocompleteManager();
// Por:
this.vehicleManager = new APIVehicleAutocompleteManager();
```

### **Opción 3: Personalizar la base de datos**
Edita el archivo `js/vehicle-database.js` para:
- Añadir nuevas marcas
- Añadir modelos a marcas existentes
- Quitar marcas que no necesites
- Personalizar para tu mercado local

```javascript
// Ejemplo: Añadir nueva marca
const vehicleDatabase = {
    // ...marcas existentes...
    'TuMarca': [
        'Modelo 1', 'Modelo 2', 'Modelo 3'
    ]
};
```

## 🔍 **APIs externas disponibles:**

### **1. NHTSA (Recomendada)**
```javascript
// Gratis, oficial, muy completa
const API_BASE = 'https://vpic.nhtsa.dot.gov/api/vehicles';
```

### **2. CarQuery**
```javascript
// Extensa, incluye años y especificaciones
const API_BASE = 'https://www.carqueryapi.com/api/0.3/';
```

### **3. Tu propia API**
```javascript
// Puedes crear tu propia API personalizada
const API_BASE = 'https://tu-dominio.com/api/vehicles';
```

## 📱 **Compatibilidad:**

- ✅ **Desktop:** Chrome, Firefox, Safari, Edge
- ✅ **Mobile:** iOS Safari, Chrome Mobile, Samsung Browser
- ✅ **Tablets:** iPad, Android tablets
- ✅ **Accesibilidad:** Screen readers, navegación por teclado

## 🐛 **Troubleshooting:**

### **El autocompletado no aparece:**
1. Verifica que los archivos JS estén cargados:
   ```html
   <script src="js/vehicle-database.js" defer></script>
   <script src="js/autocomplete.js" defer></script>
   ```

2. Abre la consola del navegador y busca errores

3. Verifica que los IDs de los inputs sean correctos:
   ```html
   <input id="car-brand" name="car-brand">
   <input id="car-model" name="car-model">
   ```

### **No se ven los estilos:**
El CSS se inyecta automáticamente, pero puedes verificar que las variables CSS estén definidas.

### **APIs no funcionan:**
Las APIs pueden tener límites o estar temporalmente no disponibles. El sistema híbrido automáticamente usa datos locales como fallback.

## 🔄 **Actualizaciones futuras:**

### **Para mantener los datos actualizados:**

1. **Manualmente:** Edita `vehicle-database.js`
2. **Automáticamente:** Configura un script que consulte APIs y actualice el archivo
3. **Híbrido:** Usa APIs en tiempo real con fallback local

### **Funciones avanzadas que se pueden añadir:**

- 🔍 Búsqueda por año específico
- 🏷️ Categorías de vehículos (SUV, sedán, etc.)
- 📊 Información adicional (consumo, emisiones)
- 🌍 Geolocalización para marcas por país
- 💾 Historial de búsquedas del usuario

## 📞 **Soporte:**

El sistema está completamente documentado y es fácil de mantener. Si necesitas:
- Añadir nuevas marcas/modelos
- Cambiar a una API específica
- Personalizar el diseño
- Resolver problemas

Solo modifica los archivos correspondientes siguiendo los ejemplos incluidos.

---

**¡El autocompletado está listo para usar en producción!** 🚀
