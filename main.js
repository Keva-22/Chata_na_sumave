const config = {
    defaultYear: new Date().getFullYear(),
    defaultMonth: new Date().getMonth(),
};

// Funkce pro načítání obsazených dnů (prozatím staticky, lze napojit na API)
async function fetchBookedDays() {
    // Zde může být volání na server pro získání obsazených dnů
    return [5, 10, 15, 20, 25]; // Příklad: obsazené dny
}

// Funkce pro vytvoření kalendáře pro daný měsíc
async function createMonthCalendar(month, year) {
    const monthNames = [
        "Leden", "Únor", "Březen", "Duben", "Květen", "Červen",
        "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec",
    ];
    const bookedDays = await fetchBookedDays();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let calendarHTML = `<div class="calendar-header">
        <button id="prev-month" class="calendar-nav">&lt;</button>
        <h3>${monthNames[month]} ${year}</h3>
        <button id="next-month" class="calendar-nav">&gt;</button>
    </div>`;
    calendarHTML += `<div class="days-of-week">
        <span>Pon</span><span>Úte</span><span>Stř</span><span>Čtv</span>
        <span>Pát</span><span>Sob</span><span>Ned</span>
    </div><div class="days">`;

    // Prázdné dny před začátkem měsíce
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
        calendarHTML += `<div class="day empty"></div>`;
    }

    // Dny měsíce
    for (let day = 1; day <= daysInMonth; day++) {
        const status = bookedDays.includes(day) ? "booked" : "free";
        calendarHTML += `<div class="day ${status}">${day}</div>`;
    }

    calendarHTML += `</div>`;
    document.getElementById("calendar-container").innerHTML = calendarHTML;

    // Přidání událostí na tlačítka
    document.getElementById("prev-month").addEventListener("click", () => changeMonth(-1));
    document.getElementById("next-month").addEventListener("click", () => changeMonth(1));
}

// Změna měsíce
function changeMonth(direction) {
    const currentMonth = parseInt(document.getElementById("calendar-container").dataset.month, 10);
    const currentYear = parseInt(document.getElementById("calendar-container").dataset.year, 10);

    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth < 0) {
        newMonth = 11;
        newYear--;
    } else if (newMonth > 11) {
        newMonth = 0;
        newYear++;
    }

    document.getElementById("calendar-container").dataset.month = newMonth;
    document.getElementById("calendar-container").dataset.year = newYear;

    createMonthCalendar(newMonth, newYear);
}

// Iniciace kalendáře
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("calendar-container");
    container.dataset.month = config.defaultMonth;
    container.dataset.year = config.defaultYear;

    createMonthCalendar(config.defaultMonth, config.defaultYear);
});


document.addEventListener("DOMContentLoaded", () => {
    // Data pro sekce
    const galleryData = {
        bathroom: [
            { image: "images/dolni-koupelna-1.jpg", text: "Dolní koupelna" },
            { image: "images/horni-koupelna-1.jpg", text: "Horní koupelna" },
            { image: "images/horni-koupelna-2.jpeg", text: "Horní koupelna 2" },
        ],
        kitchen: [
            { image: "images/jidelna.jpeg", text: "Jídelna" },
            { image: "images/kuchyn.jpg", text: "Kuchyň" },
            { image: "images/obyvak.jpg", text: "Obývák" }, // Přidány obrázky obýváku
            { image: "images/obyvak-2.jpeg", text: "Obývák 2" },
            { image: "images/obyvak-3.jpg", text: "Obývák 3" },
        ],
        bedroom: [
            { image: "images/loznice.jpeg", text: "Hlavní ložnice" },
            { image: "images/loznice-1.jpg", text: "Horní ložnice" },
            { image: "images/loznice-2.jpeg", text: "Dolní ložnice" },
        ],
    };

    // Funkce pro naplnění carouselu
    function populateCarousel(carouselId, images) {
        const carouselInner = document.querySelector(`#${carouselId} .carousel-inner`);
        images.forEach((item, index) => {
            const activeClass = index === 0 ? "active" : "";
            carouselInner.innerHTML += `
                <div class="carousel-item ${activeClass}">
                    <img src="${item.image}" class="d-block w-100" alt="${item.text}">
                    <div class="carousel-caption">
                        <p>${item.text}</p>
                    </div>
                </div>
            `;
        });
    }

    // Naplnění jednotlivých carouselů
    populateCarousel("bathroomCarousel", galleryData.bathroom);
    populateCarousel("kitchenCarousel", galleryData.kitchen); // Kuchyň zahrnuje obývák
    populateCarousel("bedroomCarousel", galleryData.bedroom);
});


document.addEventListener("DOMContentLoaded", () => {
    const additionalGalleryData = {
        exterior: [
            { image: "images/exterier-leto.jpg", text: "Exteriér léto" },
            { image: "images/exterier-zima.jpeg", text: "Exteriér zima" },
            { image: "images/terasa.jpeg", text: "Terasa" },
            { image: "images/vchod.jpg", text: "Vchod" },
        ],
        interior: [
            { image: "images/obyvak.jpg", text: "Obývák" },
            { image: "images/ostatni.jpeg", text: "Ostatní" },
            { image: "images/schody.jpeg", text: "Schody" },
            { image: "images/obyvak-2.jpeg", text: "Obývák 2" },
            { image: "images/obyvak-3.jpg", text: "Obývák 3" },
        ],
    };

    function populateCarousel(carouselId, images) {
        const carouselInner = document.querySelector(`#${carouselId} .carousel-inner`);
        images.forEach((item, index) => {
            const activeClass = index === 0 ? "active" : "";
            carouselInner.innerHTML += `
                <div class="carousel-item ${activeClass}">
                    <img src="${item.image}" class="d-block w-100" alt="${item.text}">
                    <div class="carousel-caption">
                        <p>${item.text}</p>
                    </div>
                </div>
            `;
        });
    }

    // Naplnění exteriéru a interiéru
    populateCarousel("exteriorCarousel", additionalGalleryData.exterior);
    populateCarousel("interiorCarousel", additionalGalleryData.interior);
});

document.addEventListener("DOMContentLoaded", () => {
    const additionalGalleryData = {
        surroundings: [
            { image: "images/sjezdovka-nedaleko.jpeg", text: "Sjezdovka nedaleko" },
            { image: "images/zimni-priroda.jpeg", text: "Zimní příroda" },
        ],
    };

    function populateCarousel(carouselId, images) {
        const carouselInner = document.querySelector(`#${carouselId} .carousel-inner`);
        images.forEach((item, index) => {
            const activeClass = index === 0 ? "active" : "";
            carouselInner.innerHTML += `
                <div class="carousel-item ${activeClass}">
                    <img src="${item.image}" class="d-block w-100" alt="${item.text}">
                    <div class="carousel-caption">
                        <p>${item.text}</p>
                    </div>
                </div>
            `;
        });
    }

    // Naplnění sekce Okolí
    populateCarousel("surroundingsCarousel", additionalGalleryData.surroundings);
});