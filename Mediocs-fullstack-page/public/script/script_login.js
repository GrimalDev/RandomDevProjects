function showPassword() {
    uPSW = document.getElementById('uPSW')
    show_password = document.getElementById('show_password')

    show_password.onclick = function() {
        if (uPSW.type === "password") {
            uPSW.type = "text"
        } else {
            uPSW.type = "password"
        }
    }
}

showPassword()