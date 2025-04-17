const donations = Array.from({ length: 60 }).map((_, i) => ({
    name: "name of donator",
    amount: [1500, 2000, 2500, 3000][i % 4],
    cause: "cause of donation",
    image: `../../images/donate/donator.jpg`
}));

const cardsPerPage = 6;
let currentPage = 1;
let currentPageGroup = 0;
const donationContainer = document.getElementById('donation-cards');
const paginationContainer = document.getElementById('pagination-controls');

const isMobile = () => window.innerWidth < 640;
const pagesPerGroup = 5;

function renderCards(page) {
    donationContainer.classList.add("fade-enter");    
    donationContainer.innerHTML = "";
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const visibleDonations = donations.slice(start, end);

    visibleDonations.forEach(d => {
        donationContainer.innerHTML += `
            <div class="bg-white rounded-lg shadow-lg p-6 flex items-center gap-4">
            <img src="${d.image}" alt="Donor" class="w-16 h-16 rounded-full object-cover border-2 border-white shadow">
            <div>
                <h4 class="text-lg font-semibold">${d.name}</h4>
                <p class="text-base mt-1">
                Donated <span class="text-green-500 font-semibold">₹${d.amount}</span> for
                <a href="#" class="text-orange-500 underline hover:text-orange-600">${d.cause}</a>
                </p>
            </div>
            </div>
        `;
    });

    void donationContainer.offsetWidth;
    donationContainer.classList.add("fade-enter-active");

    setTimeout(() => {
        donationContainer.classList.remove("fade-enter");
        donationContainer.classList.remove("fade-enter-active");
    }, 300);
}

function renderPagination() {
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(donations.length / cardsPerPage);

    const maxVisiblePages = isMobile() && totalPages > 5 ? pagesPerGroup : totalPages;
    const startPage = isMobile() && totalPages > 5
        ? currentPageGroup * pagesPerGroup + 1
        : 1;
    const endPage = isMobile() && totalPages > 5
        ? Math.min(startPage + pagesPerGroup - 1, totalPages)
        : totalPages;

    // Prev button
    const prevBtn = document.createElement("button");
    prevBtn.innerHTML = "&lt;";
    prevBtn.className = "w-9 h-9 rounded-full border text-gray-600 hover:bg-gray-200";
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            if (isMobile() && currentPage < startPage) {
                currentPageGroup = Math.floor((currentPage - 1) / pagesPerGroup);
            }
            updateView();
        }
    };
    paginationContainer.appendChild(prevBtn);

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = `w-9 h-9 rounded-full ${
            i === currentPage
            ? "bg-orange-500 text-white font-semibold"
            : "border text-gray-600 hover:bg-gray-200"
        }`;
        btn.onclick = () => {
            currentPage = i;
            updateView();
        };
        paginationContainer.appendChild(btn);
    }

    // Next button
    const nextBtn = document.createElement("button");
    nextBtn.innerHTML = "&gt;";
    nextBtn.className = "w-9 h-9 rounded-full border text-gray-600 hover:bg-gray-200";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            if (isMobile() && currentPage > endPage) {
                currentPageGroup = Math.floor((currentPage - 1) / pagesPerGroup);
            }
            updateView();
        }
    };
    paginationContainer.appendChild(nextBtn);
}

function updateView() {
    renderCards(currentPage);
    renderPagination();
}

updateView();

window.addEventListener("resize", () => {
    currentPageGroup = Math.floor((currentPage - 1) / pagesPerGroup);
    updateView();
});
