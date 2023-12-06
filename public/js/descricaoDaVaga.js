const btn = document.getElementById("aplicar")
const alert = document.querySelector(".alert")
btn.addEventListener("click", (e) => {
    alert.style.display = "block"
    setTimeout(() => alert.style.display = "none", 5000)
})