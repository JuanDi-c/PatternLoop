document.querySelectorAll(".eye").forEach((eye) => {

    eye.addEventListener("click", () => {

        const input = eye.parentElement.querySelector("input");

        if (input.type === "password") {

            input.type = "text";

            eye.classList.replace("fa-eye", "fa-eye-slash");

        } else {

            input.type = "password";

            eye.classList.replace("fa-eye-slash", "fa-eye");

        }

    });

});