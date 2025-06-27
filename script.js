// Usuarios predefinidos
    const usuarios = [
    { nombre: "Robinson", apellido: "Cortes", correo: "robinson@riwi.io", contrasena: "password1" },
    { nombre: "Antony", apellido: "Martinez", correo: "antony@riwi.io", contrasena: "password2" }
];

  // Login
    if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;

    const usuario = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);

    if (usuario) {
        sessionStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        window.location.href = "productos.html";
    } else {
        document.getElementById("mensaje").innerText = "Credenciales incorrectas.";
    }
    });
}

  // Productos y Gestión
    if (document.getElementById("tablaProductos")) {
    const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));

    // Si no hay usuario activo, redirige a login (guard.js hace este trabajo)
    // El guard.js se encarga de proteger la ruta
    const tabla = document.getElementById("tablaProductos");
    let productos = JSON.parse(localStorage.getItem("productos")) || [
    { id: 1, nombre: "Ejemplo Producto", precio: "$100", descripcion: "Producto de ejemplo" }
    ];

    function mostrarProductos() {
    tabla.innerHTML = "";
    productos.forEach(p => {
        tabla.innerHTML += `
        <tr>
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>${p.precio}</td>
            <td>${p.descripcion}</td>
            <td><button onclick="eliminarProducto(${p.id})">Eliminar</button></td>
        </tr>
        `;
    });
    localStorage.setItem("productos", JSON.stringify(productos));
    }

    mostrarProductos();

    // Agregar producto
    document.getElementById("formProducto").addEventListener("submit", (e) => {
    e.preventDefault();
    const nuevo = {
        id: productos.length ? productos[productos.length - 1].id + 1 : 1,
        nombre: document.getElementById("nombreProducto").value,
        precio: document.getElementById("precioProducto").value,
        descripcion: document.getElementById("descripcionProducto").value
    };
    productos.push(nuevo);
    mostrarProductos();
    e.target.reset();
    });

    // Cerrar sesión
    document.getElementById("cerrarSesion").addEventListener("click", () => {
    sessionStorage.removeItem("usuarioActivo");
    window.location.href = "index.html";
    });
}

  // Eliminar producto
    function eliminarProducto(id) {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos = productos.filter(p => p.id !== id);
    localStorage.setItem("productos", JSON.stringify(productos));
    location.reload();
}