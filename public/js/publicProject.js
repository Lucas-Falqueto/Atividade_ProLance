const form = document.querySelector('form')
const alert = document.querySelector(".alert")
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const job = {
        titulo: titulo.value,
        descricao: descricao.value
    }

    fetch("/api/jobs", {
        method: "POST",
        body: JSON.stringify(job),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(data => {
            if (data.status == "error") {
                alert(data.error)

            } else {
                alert.innerHTML = data.success
                alert.style.display = "block"
                setTimeout(() => alert.style.display = "none", 3000)
                // success.style.display = 'block'
                // errorr.style.display = 'none'
                // success.innerText = data.success
                // alert(data.success)
            }
        })
})