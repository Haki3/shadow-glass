#!/bin/bash

# 🚀 ShadowGlass - Script de Despliegue Simplificado para Heroku

echo "🔧 Preparando despliegue de ShadowGlass..."

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json. Ejecuta desde el directorio raíz del proyecto."
    exit 1
fi

# Verificar que Heroku CLI está instalado
if ! command -v heroku &> /dev/null; then
    echo "❌ Error: Heroku CLI no está instalado."
    echo "📥 Instala desde: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# Verificar que el usuario está logueado en Heroku
if ! heroku auth:whoami &> /dev/null; then
    echo "🔐 Necesitas hacer login en Heroku..."
    heroku login
fi

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Verificar sintaxis del servidor
echo "🔍 Verificando servidor..."
node -c server.js
if [ $? -ne 0 ]; then
    echo "❌ Error: Problema con server.js"
    exit 1
fi

echo "✅ Verificaciones completadas"

# Preguntar por el nombre de la app
read -p "📝 Nombre de la app en Heroku (o presiona Enter para 'shadowglass-website'): " APP_NAME
APP_NAME=${APP_NAME:-shadowglass-website}

# Verificar si la app ya existe
if heroku apps:info "$APP_NAME" &> /dev/null; then
    echo "📱 La app '$APP_NAME' ya existe en Heroku"
    read -p "🔄 ¿Quieres continuar con el despliegue? (y/n): " CONTINUE
    if [ "$CONTINUE" != "y" ] && [ "$CONTINUE" != "Y" ]; then
        echo "🚫 Despliegue cancelado"
        exit 0
    fi
else
    echo "🆕 Creando nueva app '$APP_NAME' en Heroku..."
    if heroku create "$APP_NAME"; then
        echo "✅ App creada exitosamente"
    else
        echo "❌ Error creando la app. Probablemente el nombre ya está tomado."
        read -p "🔄 Intentar con nombre aleatorio? (y/n): " RANDOM_NAME
        if [ "$RANDOM_NAME" = "y" ] || [ "$RANDOM_NAME" = "Y" ]; then
            if heroku create; then
                echo "✅ App creada con nombre aleatorio"
                # Obtener el nombre de la app creada
                APP_NAME=$(heroku apps:info --json | grep '"name"' | cut -d'"' -f4)
                echo "📱 Nombre de la app: $APP_NAME"
            else
                echo "❌ Error creando la app"
                exit 1
            fi
        else
            exit 1
        fi
    fi
fi

# Configurar variables de entorno
echo "⚙️ Configurando variables de entorno..."
heroku config:set NODE_ENV=production --app "$APP_NAME"
heroku config:set NPM_CONFIG_PRODUCTION=true --app "$APP_NAME"

# Verificar que todos los cambios están guardados
if [ -n "$(git status --porcelain)" ]; then
    echo "💾 Guardando cambios..."
    git add .
    git commit -m "Preparar para despliegue en Heroku - $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Verificar si tenemos remote de heroku
if ! git remote | grep -q heroku; then
    echo "🔗 Añadiendo remote de Heroku..."
    heroku git:remote -a "$APP_NAME"
fi

# Desplegar a Heroku
echo "🚀 Desplegando a Heroku..."
if git push heroku HEAD:main; then
    echo "✅ Despliegue exitoso!"
    
    # Verificar que la app está corriendo
    echo "🔍 Verificando despliegue..."
    sleep 10
    
    if curl -f "https://$APP_NAME.herokuapp.com/health" &> /dev/null; then
        echo "✅ App respondiendo correctamente!"
    else
        echo "⚠️ La app puede tardar un momento en estar disponible"
    fi
    
    # Abrir la aplicación
    echo "🌐 Abriendo aplicación..."
    heroku open --app "$APP_NAME"
    
    # Mostrar información útil
    echo ""
    echo "🎉 ¡ShadowGlass desplegado exitosamente!"
    echo "🔗 URL: https://$APP_NAME.herokuapp.com"
    echo ""
    echo "📊 Comandos útiles:"
    echo "   Ver logs:     heroku logs --tail --app $APP_NAME"
    echo "   Reiniciar:    heroku restart --app $APP_NAME"
    echo "   Info:         heroku info --app $APP_NAME"
    echo "   Health check: curl https://$APP_NAME.herokuapp.com/health"
    echo ""
else
    echo "❌ Error en el despliegue"
    echo "🔍 Verifica los logs con: heroku logs --tail --app $APP_NAME"
    exit 1
fi
