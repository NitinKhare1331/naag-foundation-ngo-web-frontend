const openButtons = document.querySelectorAll('.openFormBtn');
const closeBtn = document.getElementById('closeFormBtn');
const modal = document.getElementById('volunteerModal');
const form = document.getElementById('volunteerForm');
const aadhaarInput = document.getElementById("aadhaarInput");
const numberInput = document.getElementById("numberInput");
const emailInput = document.getElementById("emailInput");
const nameInput = document.getElementById("nameInput");


openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    });
});

closeBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
});

numberInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0,10);
    e.target.value = value;
})

aadhaarInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 12);
    let formatted = value.replace(/(.{4})/g, "$1 ").trim();
    e.target.value = formatted;
})


emailInput.addEventListener("blur", (e) => {
    const email = e.target.value.trim();
    const emailRegex = /^[^\s@]+@gmail\.com$/;

    if (!emailRegex.test(email)) {
        alert("Please type a valid email address.");
    }
});


nameInput.addEventListener('input', (e) => {
    const value = e.target.value;
    const letterOnlyRegex = /^[A-Za-z\s]*$/;
    
    if (!letterOnlyRegex.test(value)) {
        e.target.value = value.replace(/[^A-Za-z\s]/g, '');
    }
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
});

form?.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {};

    for (let [key, value] of formData.entries()) {
        if (key === "aadhaar") {
            data[key] = value.replace(/\s/g, '');
        } else {
            data[key] = value;
        }
    }

    console.log(JSON.stringify(data));
    form.reset();
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');

    alert("Form Submitted Successfully.")
});
