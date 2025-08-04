// Instagram Feed Simple - ShadowGlass
// Sistema simplificado que funciona inmediatamente

document.addEventListener('DOMContentLoaded', function() {
    console.log('Instagram feed simple cargado correctamente');
    
    // Añadir efectos de hover y funcionalidad
    const instagramItems = document.querySelectorAll('.instagram-item');
    
    instagramItems.forEach(item => {
        // Efecto de hover mejorado
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        // Click en la imagen abre Instagram
        const img = item.querySelector('img');
        if (img) {
            img.addEventListener('click', function() {
                window.open('https://www.instagram.com/tintadodelunaszgz/', '_blank');
            });
        }
    });
    
    // Animación de entrada secuencial
    instagramItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(-5px)';
        }, index * 200);
    });
});

// Función para actualizar manualmente las fotos
function updateInstagramPhotos() {
    console.log('Para actualizar las fotos de Instagram:');
    console.log('1. Guarda las nuevas fotos en assets/instagram/');
    console.log('2. Renómbralas como recent-1.jpg, recent-2.jpg, recent-3.jpg');
    console.log('3. Actualiza los textos en index.html si es necesario');
}
