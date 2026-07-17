if (sessionStorage.getItem("logoutExitoso")) {

    mostrarToast(
        "¡Hasta pronto! 🧶",
        "Has cerrado sesión correctamente."
    );

    sessionStorage.removeItem("logoutExitoso");

}