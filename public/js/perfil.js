const editar = document.getElementById("editar")
const nome = document.getElementById("nome")
const sobre_mim = document.getElementById("sobre_mim")
const numero = document.getElementById("numero")
const alert = document.querySelector(".alert")
// Selecionar o botão de abrir o modal e o modal
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('myModal');

// Selecionar o botão de fechar o modal
const closeModalBtn = document.getElementById('closeModalBtn');

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    numero.value = ""
    nome.value = ""
    sobre_mim = ""

});

// Fechar o modal se o usuário clicar fora da área do modal
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }

});



const callApi = () => {
    const updateUser = {
        nome: nome.value,
        sobre_mim: sobre_mim.value,
        numero: numero.value
    }
    fetch(`/api/updateUser&${editar.dataset.id}`, {
        method: "PUT",
        body: JSON.stringify(updateUser),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.status == "error") {
                alert.innerHTML = data.error
                alert.classList.remove("alert-primary")
                alert.classList.add("alert-danger")
                alert.style.display = "block"
                setTimeout(() => alert.style.display = "none", 3000)
            } else {
                alert.innerHTML = data.success
                alert.classList.remove("alert-danger")
                alert.classList.add("alert-primary")
                alert.style.display = "block"
                setTimeout(() => {
                    alert.style.display = "none"
                }, 3000)

            }
        })
}
editar.addEventListener("click", (e) => {
    callApi()
    numero.value = ""
    nome.value = ""
    sobre_mim = ""
})