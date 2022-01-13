function showPassword() {
    show_password1 = document.getElementById('show_password1')
    show_password2 = document.getElementById('show_password2')

    passwordBox = document.getElementById('password')
    passwordConfirmBox = document.getElementById('confirmPassword')

    show_password1.onclick = function() {
        if (passwordBox.type === "password") {
            passwordBox.type = "text"
        } else {
            passwordBox.type = "password"
        }
    }

    show_password2.onclick = function() {
        if (passwordConfirmBox.type === "password") {
            passwordConfirmBox.type = "text"
        } else {
            passwordConfirmBox.type = "password"
        }
    }


}

function popupHandle() {
    registerUser = document.getElementById('submit_button')
    pageToBlur = document.getElementById('container-fullwidth-popup')
    popup = document.getElementsByClassName('container_popup')

    registerUser.onclick = function(e) {
        e.preventDefault()

        pageToBlur.classList.add('toBlur')
        popup[0].classList.toggle('fadeInAnimation')
        popup[0].classList.remove('container_popup_hidden')
    }
}

showPassword()

window.onload = popupHandle()