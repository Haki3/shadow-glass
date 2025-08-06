#!/bin/bash

# 🧪 ShadowGlass - Test Local del Servidor

echo "🧪 Probando servidor ShadowGlass localmente..."

# Verificar que estamos en el directorio correcto
if [ ! -f "server.js" ]; then
    echo "❌ Error: No se encontró server.js"
    exit 1
fi

# Limpiar puerto 3000
echo "🧹 Limpiando puerto 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Verificar sintaxis
echo "🔍 Verificando sintaxis del servidor..."
node -c server.js
if [ $? -ne 0 ]; then
    echo "❌ Error de sintaxis en server.js"
    exit 1
fi

# Instalar dependencias si es necesario
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Iniciar servidor
echo "🚀 Iniciando servidor..."
node server.js &
SERVER_PID=$!

# Esperar que arranque
echo "⏳ Esperando que el servidor arranque..."
sleep 5

# Verificar que está corriendo
if ps -p $SERVER_PID > /dev/null; then
    echo "✅ Servidor iniciado (PID: $SERVER_PID)"
    
    # Probar health endpoint
    echo "🔍 Probando endpoint /health..."
    if curl -f http://localhost:3000/health 2>/dev/null; then
        echo ""
        echo "✅ ¡Servidor funcionando correctamente!"
        echo "🌐 Abre http://localhost:3000 en tu navegador"
        echo ""
        echo "Para detener el servidor:"
        echo "kill $SERVER_PID"
        echo ""
        echo "O usa: pkill -f 'node server.js'"
    else
        echo "❌ El servidor no responde en /health"
        kill $SERVER_PID 2>/dev/null
        exit 1
    fi
else
    echo "❌ Error: El servidor no se inició correctamente"
    exit 1
fi
