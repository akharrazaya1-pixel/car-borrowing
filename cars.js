let selectedCar = "";
let pricePerDay = 0;
function saveInputs() {
    localStorage.setItem("tempName", document.getElementById("name").value);
    localStorage.setItem("tempEmail", document.getElementById("email").value);
    localStorage.setItem("tempDays", document.getElementById("days").value);
    localStorage.setItem("tempCard", document.getElementById("card").value);
}
function loadInputs() {
    document.getElementById("name").value = localStorage.getItem("tempName") || "";
    document.getElementById("email").value = localStorage.getItem("tempEmail") || "";
    document.getElementById("days").value = localStorage.getItem("tempDays") || "";
    document.getElementById("card").value = localStorage.getItem("tempCard") || "";
    let days = document.getElementById("days").value;
    if (days) {
        document.getElementById("total").innerText = days * pricePerDay;
    }
}
function openForm(btn) {
    let box = btn.parentElement;
    selectedCar = box.querySelector("h4").innerText;
    pricePerDay = box.querySelector(".price").dataset.price;

    document.getElementById("popup").style.display = "flex";
    loadInputs();
}
function closeForm() {
    saveInputs(); // save before closing
    document.getElementById("popup").style.display = "none";
}
document.getElementById("days").addEventListener("input", function () {
    let days = this.value;
    let total = days * pricePerDay;
    document.getElementById("total").innerText = total || 0;
    saveInputs();
});
["name", "email", "card"].forEach(id => {
    document.getElementById(id).addEventListener("input", saveInputs);
});
function confirmBooking() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let days = document.getElementById("days").value;
    let card = document.getElementById("card").value;
    if (!name || !email || !days || !card) {
        alert("Fill everything.");
        return;
    }
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({
        car: selectedCar,
        name,
        email,
        days,
        total: document.getElementById("total").innerText,
        date: new Date().toLocaleString()
    });
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("tempName");
    localStorage.removeItem("tempEmail");
    localStorage.removeItem("tempDays");
    localStorage.removeItem("tempCard");
    document.getElementById("popup").style.display = "none";
    let success = document.getElementById("success");
    success.style.display = "block";
    setTimeout(() => {
        success.style.display = "none";
    }, 3000);
}
