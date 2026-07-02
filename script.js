// Captura de elementos de la interfaz
const modal = document.getElementById('modal-reproductor');
const btnCerrar = document.getElementById('btn-cerrar');
const modalImagen = document.getElementById('modal-imagen');
const modalTitulo = document.getElementById('modal-titulo');
const modalDescripcion = document.getElementById('modal-descripcion');

const audio = document.getElementById('reproductor-global');
const btnIniciar = document.getElementById('btn-iniciar');
const contenedorSecundario = document.getElementById('controles-reproduccion');
const btnPausar = document.getElementById('btn-pausar');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Escuchar clics en los elementos de la lista, los botones circulares y los botones de carteles
document.querySelectorAll('.btn-item, .circulo-btn, .cartel-btn, .btn-Biopochito').forEach(botonLista => {
    botonLista.addEventListener('click', () => {
        // Extraer los datos guardados en el botón HTML
        const archivoAudio = botonLista.getAttribute('data-audio');
        const titulo = botonLista.getAttribute('data-titulo');
        const descripcion = botonLista.getAttribute('data-desc');
        const imagenPreview = botonLista.getAttribute('data-preview-img');
        const imagenBoton = botonLista.querySelector('img');
        const usaVistaLateral = botonLista.classList.contains('circulo-btn') || botonLista.classList.contains('cartel-btn');
        const usaPreviewFase = imagenPreview && imagenPreview.includes('Fases imagenes previ/');

        // Asignar los textos e incorporar la ruta del archivo .wav
        if (imagenBoton) {
            modalImagen.src = imagenPreview || imagenBoton.getAttribute('src');
            modalImagen.alt = imagenBoton.getAttribute('alt') || titulo;
        }
        modal.querySelector('.modal-contenido').classList.toggle('modal-contenido-circular', usaVistaLateral);
        modalImagen.classList.toggle('modal-imagen-preview-fase', usaPreviewFase);
        modalImagen.parentElement.classList.toggle('modal-imagen-marco-preview-fase', usaPreviewFase);
        modalTitulo.textContent = titulo;
        modalDescripcion.textContent = descripcion;
        audio.src = archivoAudio;

        // Resetear la interfaz del reproductor interno
        btnIniciar.textContent = "▶ Iniciar Audio";
        btnIniciar.classList.remove('oculto');
        contenedorSecundario.classList.add('oculto');
        btnPausar.textContent = "⏸ Pausar";

        // Mostrar la ventana flotante quitando la clase 'oculto'
        modal.classList.remove('oculto');
    });
});

// Botón "Iniciar Audio"
btnIniciar.addEventListener('click', () => {
    audio.play();
    btnIniciar.classList.add('oculto'); // Desaparece el botón de iniciar
    contenedorSecundario.classList.remove('oculto'); // Muestra pausar y reiniciar
});

// Botón "Pausar / Reanudar"
btnPausar.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        btnPausar.textContent = "⏸ Pausar";
    } else {
        audio.pause();
        btnPausar.textContent = "▶ Reanudar";
    }
});

// Botón "Reiniciar"
btnReiniciar.addEventListener('click', () => {
    audio.currentTime = 0; // Regresa el segundo del audio al inicio
    audio.play();
    btnPausar.textContent = "⏸ Pausar";
});

// Si el audio termina por completo
audio.addEventListener('ended', () => {
    btnIniciar.textContent = "▶ Volver a escuchar";
    btnIniciar.classList.remove('oculto');
    contenedorSecundario.classList.add('oculto');
});

// Cerrar la ventana emergente
btnCerrar.addEventListener('click', resetearYcerrar);
window.addEventListener('click', (e) => { if (e.target === modal) resetearYcerrar(); });

function resetearYcerrar() {
    audio.pause();
    audio.currentTime = 0;
    modal.classList.add('oculto');
}

// --- SPLASH: entrada suave, visible 3s, salida suave ---
document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash-overlay');
    if (!splash) return;
    const visibleMs = 3000; // tiempo que permanece visible (ms)

    // Mostrar inmediatamente SIN transición: usar clase temporal no-transition
    splash.classList.remove('splash-hidden');
    splash.classList.add('splash-visible', 'no-transition');

    // Forzar reflow y luego reactivar transiciones para la salida posterior
    // (removemos la clase no-transition en el siguiente frame)
    requestAnimationFrame(() => {
        splash.classList.remove('no-transition');
    });

    // Mantener visible por visibleMs, luego iniciar salida (con transición)
    setTimeout(() => {
        splash.classList.remove('splash-visible');
        splash.classList.add('splash-hidden');

        splash.addEventListener('transitionend', () => {
            if (splash && splash.parentElement) splash.parentElement.removeChild(splash);
        }, { once: true });
    }, visibleMs);
});
