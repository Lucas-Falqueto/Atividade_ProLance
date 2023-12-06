const alert = document.querySelector(".alert")

form.addEventListener('submit', () => {
    const register = {
        nome: nome.value,
        email: email.value,
        numero: numero.value,
        password: password.value
    }

    fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(register),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(data => {
            if (data.status == "error") {

            } else {
                alert.innerHTML = data.success
                alert.style.display = "block"
                setTimeout(() => alert.style.display = "none", 3000)
                window.location.reload();
            }
        })
})