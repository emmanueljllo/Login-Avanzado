// Este es el guard para proteger la ruta de productos.html
    function protegerRuta() {
    const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));
    if (!usuarioActivo) {
    window.location.href = "index.html";  // Si no hay usuario, redirige a login
    }
}

  // Ejecutar el guard cuando se carga productos.html
    protegerRuta();