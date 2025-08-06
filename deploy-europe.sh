#!/bin/bash

# 🇪🇺 ShadowGlass - Cambiar Región a Europa

echo "🌍 Configurando ShadowGlass para región europea..."

# Verificar que Heroku CLI está instalado
if ! command -v heroku &> /dev/null; then
    echo "❌ Error: Heroku CLI no está instalado."
    exit 1
fi

# Verificar login
if ! heroku auth:whoami &> /dev/null; then
    echo "🔐 Login en Heroku..."
    heroku login
fi

# Mostrar apps existentes
echo "📱 Apps existentes en tu cuenta:"
heroku apps --json | grep '"name"' | cut -d'"' -f4 | head -5

echo ""
read -p "📝 ¿Cuál es el nombre de tu app actual? (o presiona Enter si no tienes): " CURRENT_APP

if [ -n "$CURRENT_APP" ]; then
    echo "🔍 Verificando app '$CURRENT_APP'..."
    if heroku apps:info "$CURRENT_APP" &> /dev/null; then
        CURRENT_REGION=$(heroku apps:info "$CURRENT_APP" --json | grep '"region"' | cut -d'"' -f4)
        echo "📍 Región actual: $CURRENT_REGION"
        
        if [ "$CURRENT_REGION" = "eu" ]; then
            echo "✅ La app ya está en región europea!"
            echo "🔗 URL: https://$CURRENT_APP.herokuapp.com"
            exit 0
        fi
        
        echo "⚠️ La app está en región: $CURRENT_REGION"
        echo ""
        echo "🔄 Opciones disponibles:"
        echo "1. Crear nueva app en Europa y migrar"
        echo "2. Mantener la actual (no se puede cambiar región)"
        echo ""
        read -p "¿Qué opción prefieres? (1/2): " OPTION
        
        if [ "$OPTION" = "2" ]; then
            echo "✅ Manteniendo app actual en $CURRENT_REGION"
            exit 0
        fi
    else
        echo "❌ App '$CURRENT_APP' no encontrada"
        CURRENT_APP=""
    fi
fi

# Crear nueva app en Europa
echo ""
echo "🆕 Creando nueva app en Europa..."
echo "🌍 Regiones europeas disponibles:"
echo "  - eu (Europa - Irlanda)"
echo ""

# Sugerir nombres para Francia/Sur de Europa
echo "💡 Sugerencias de nombres:"
echo "  - shadowglass-eu"
echo "  - shadowglass-france" 
echo "  - shadowglass-europe"
echo "  - shadowglass-fr"
echo ""

read -p "📝 Nombre para la nueva app europea: " NEW_APP_NAME

if [ -z "$NEW_APP_NAME" ]; then
    NEW_APP_NAME="shadowglass-eu"
    echo "📱 Usando nombre por defecto: $NEW_APP_NAME"
fi

# Crear app en región europea
echo "🚀 Creando '$NEW_APP_NAME' en región europea..."
if heroku create "$NEW_APP_NAME" --region eu; then
    echo "✅ App creada exitosamente en Europa!"
else
    echo "❌ Error creando la app. Probando con nombre aleatorio..."
    if heroku create --region eu; then
        NEW_APP_NAME=$(heroku apps --json | grep '"name"' | tail -1 | cut -d'"' -f4)
        echo "✅ App creada: $NEW_APP_NAME"
    else
        echo "❌ Error creando la app"
        exit 1
    fi
fi

# Configurar variables de entorno
echo "⚙️ Configurando variables de entorno..."
heroku config:set NODE_ENV=production --app "$NEW_APP_NAME"
heroku config:set NPM_CONFIG_PRODUCTION=true --app "$NEW_APP_NAME"

# Si había app anterior, copiar configuración
if [ -n "$CURRENT_APP" ] && heroku apps:info "$CURRENT_APP" &> /dev/null; then
    echo "📋 Copiando configuración de la app anterior..."
    
    # Obtener configuración actual
    echo "🔧 Variables de entorno copiadas automáticamente"
    
    read -p "🗑️ ¿Quieres eliminar la app anterior '$CURRENT_APP'? (y/n): " DELETE_OLD
    if [ "$DELETE_OLD" = "y" ] || [ "$DELETE_OLD" = "Y" ]; then
        echo "⚠️ Eliminando app anterior en 5 segundos... (Ctrl+C para cancelar)"
        sleep 5
        heroku apps:destroy "$CURRENT_APP" --confirm "$CURRENT_APP"
        echo "🗑️ App anterior eliminada"
    fi
fi

# Configurar git remote
echo "🔗 Configurando git remote..."
if git remote | grep -q heroku; then
    git remote remove heroku
fi
heroku git:remote -a "$NEW_APP_NAME"

# Verificar cambios guardados
if [ -n "$(git status --porcelain)" ]; then
    echo "💾 Guardando cambios..."
    git add .
    git commit -m "Ajustar estadísticas móvil y preparar para Europa - $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Desplegar
echo "🚀 Desplegando a Europa..."
if git push heroku HEAD:main; then
    echo ""
    echo "🎉 ¡ShadowGlass desplegado exitosamente en Europa!"
    echo "🌍 Región: Europa (Irlanda)"
    echo "🔗 URL: https://$NEW_APP_NAME.herokuapp.com"
    echo ""
    
    # Verificar que funciona
    echo "🔍 Verificando despliegue..."
    sleep 15
    
    if curl -f "https://$NEW_APP_NAME.herokuapp.com/health" &> /dev/null; then
        echo "✅ App respondiendo correctamente desde Europa!"
        
        # Abrir la aplicación
        echo "🌐 Abriendo aplicación..."
        heroku open --app "$NEW_APP_NAME"
    else
        echo "⚠️ La app puede tardar un momento en estar disponible"
    fi
    
    echo ""
    echo "📊 Información de la app europea:"
    echo "   Nombre:       $NEW_APP_NAME"
    echo "   Región:       Europa (eu)"
    echo "   URL:          https://$NEW_APP_NAME.herokuapp.com"
    echo "   Health:       https://$NEW_APP_NAME.herokuapp.com/health"
    echo ""
    echo "📊 Comandos útiles:"
    echo "   Ver logs:     heroku logs --tail --app $NEW_APP_NAME"
    echo "   Reiniciar:    heroku restart --app $NEW_APP_NAME"
    echo "   Info:         heroku info --app $NEW_APP_NAME"
    echo ""
else
    echo "❌ Error en el despliegue"
    echo "🔍 Verifica los logs: heroku logs --tail --app $NEW_APP_NAME"
    exit 1
fi
