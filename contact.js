document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const confirmation = document.getElementById("fait");
    const params = new URLSearchParams(window.location.search);
    const car = params.get("car");
    if (car) {
        document.getElementById("sujet").value = "Location";
        document.getElementById("message").value = "Je suis intéressé par: " + car;
    }
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nom = document.getElementById("nom").value.trim();
        const email = document.getElementById("email").value.trim();
        const sujet = document.getElementById("sujet").value;
        const message = document.getElementById("message").value.trim();
        if (!nom || !email || !sujet || !message) {
            alert("Veuillez remplir tous les champs.");
            return;
        }
        console.log({ nom, email, sujet, message });
        confirmation.style.display = "block";
        setTimeout(() => {
            confirmation.style.display = "none";
            form.reset(); 
            localStorage.removeItem("prefillCar");
        }, 3000);
    });
});
