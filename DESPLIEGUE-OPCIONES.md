# 🚀 OPCIONES DE DESPLIEGUE SHADOWGLASS

## ✅ PROBLEMA SOLUCIONADO
El error `timeout: command not found` era porque el comando `timeout` no existe en macOS por defecto.

## 🛠️ SCRIPTS DISPONIBLES

### 1. **Script Simplificado (Recomendado para macOS)**
```bash
./deploy-heroku-simple.sh
```
- ✅ Compatible con macOS
- ✅ Sin dependencias externas
- ✅ Verificación de sintaxis
- ✅ Manejo de errores mejorado

### 2. **Script Original (Linux/Windows)**
```bash
./deploy-heroku.sh
```
- ⚠️ Requiere comando `timeout`
- ✅ Test completo del servidor

### 3. **Test Local**
```bash
./test-local.sh
```
- 🧪 Prueba el servidor localmente
- 🔍 Verificación completa
- 🌐 Abre en http://localhost:3000

### 4. **Manual**
```bash
heroku create tu-app-name
heroku config:set NODE_ENV=production
git push heroku main
heroku open
```

## 🎯 RECOMENDACIÓN

**Para macOS (tu caso):**
```bash
# 1. Probar localmente (opcional)
./test-local.sh

# 2. Desplegar a Heroku
./deploy-heroku-simple.sh
```

**Para Linux/Windows:**
```bash
./deploy-heroku.sh
```

## 🔧 SI TIENES PROBLEMAS

### Problema: `timeout: command not found`
**Solución:** Usar `deploy-heroku-simple.sh`

### Problema: `heroku: command not found`
**Solución:** 
```bash
# Instalar Heroku CLI
# macOS:
brew install heroku/brew/heroku

# O descargar desde:
# https://devcenter.heroku.com/articles/heroku-cli
```

### Problema: `Permission denied`
**Solución:**
```bash
chmod +x deploy-heroku-simple.sh
chmod +x test-local.sh
```

### Problema: Puerto 3000 ocupado
**Solución:**
```bash
lsof -ti:3000 | xargs kill -9
```

## 🚀 DESPLIEGUE RÁPIDO

```bash
# Todo en uno
chmod +x deploy-heroku-simple.sh && ./deploy-heroku-simple.sh
```

**¡Usa `./deploy-heroku-simple.sh` y listo!** 🎉
