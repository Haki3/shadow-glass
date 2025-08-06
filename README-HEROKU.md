# 🚀 ShadowGlass - Despliegue en Heroku

## 📋 Guía de Despliegue

### 1. Preparación Previa

Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión 18.x)
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- [Git](https://git-scm.com/)

### 2. Configuración de Heroku

```bash
# Instalar dependencias
npm install

# Login en Heroku
heroku login

# Crear aplicación en Heroku
heroku create shadowglass-website

# O usar un nombre específico
heroku create tu-nombre-de-app
```

### 3. Variables de Entorno

```bash
# Configurar variables de entorno en Heroku
heroku config:set NODE_ENV=production
heroku config:set NPM_CONFIG_PRODUCTION=true

# Verificar configuración
heroku config
```

### 4. Desplegar

```bash
# Opción 1: Script automático simplificado (Recomendado para macOS)
./deploy-heroku-simple.sh

# Opción 2: Script original
./deploy-heroku.sh

# Opción 3: Manual
# Asegurar que todos los cambios están commiteados
git add .
git commit -m "Preparar para despliegue en Heroku"

# Subir a Heroku
git push heroku main

# O si estás en branch dev
git push heroku dev:main
```

### 4.1. Probar Localmente (Opcional)

```bash
# Probar que el servidor funciona localmente
./test-local.sh

# O manualmente
npm start
```

### 5. Verificar Despliegue

```bash
# Abrir la aplicación
heroku open

# Ver logs en tiempo real
heroku logs --tail

# Ver estado de la aplicación
heroku ps
```

### 6. Comandos Útiles

```bash
# Reiniciar la aplicación
heroku restart

# Ejecutar comandos en Heroku
heroku run node --version

# Ver información de la aplicación
heroku info

# Configurar dominio personalizado (opcional)
heroku domains:add tu-dominio.com
```

## 🔧 Estructura del Proyecto para Heroku

```
shadow-glass/
├── server.js          # Servidor Express
├── Procfile           # Comando de inicio para Heroku
├── app.json           # Configuración de la app
├── package.json       # Dependencias y scripts
├── index.html         # Página principal
├── css/               # Estilos CSS
├── js/                # JavaScript
├── assets/            # Recursos estáticos
└── README-HEROKU.md   # Esta guía
```

## 📊 Características del Servidor

- **Express.js** como servidor web
- **Compression** para archivos optimizados
- **Helmet** para seguridad
- **CORS** habilitado
- **Rutas API** para formulario de contacto
- **Sitemap.xml** automático
- **Robots.txt** automático
- **Health check** en `/health`

## 🌐 URLs Importantes

Después del despliegue:
- **Sitio web**: `https://tu-app.herokuapp.com/`
- **Health check**: `https://tu-app.herokuapp.com/health`
- **Sitemap**: `https://tu-app.herokuapp.com/sitemap.xml`
- **Robots**: `https://tu-app.herokuapp.com/robots.txt`

## 🚨 Troubleshooting

### Error: Application crashed
```bash
heroku logs --tail
heroku restart
```

### Error: Build failed
```bash
# Verificar que package.json tiene todas las dependencias
npm install
git add package*.json
git commit -m "Fix dependencies"
git push heroku main
```

### Error: Port binding
El servidor usa `process.env.PORT` automáticamente, no cambiar.

### Verificar que el sitio funciona localmente
```bash
npm start
# Debería abrir en http://localhost:3000
```

## 📈 Optimizaciones Incluidas

- ✅ **Compression gzip** automática
- ✅ **Headers de seguridad** con Helmet
- ✅ **Cache de archivos estáticos** (1 día)
- ✅ **MIME types** correctos
- ✅ **Error handling** robusto
- ✅ **Health monitoring**
- ✅ **SEO optimizado** (sitemap, robots)

## 🔗 Recursos Adicionales

- [Heroku Node.js Guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku CLI Commands](https://devcenter.heroku.com/articles/heroku-cli-commands)
- [Heroku Config Vars](https://devcenter.heroku.com/articles/config-vars)

---

**¡Tu sitio ShadowGlass está listo para el mundo! 🌍**
