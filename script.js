document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const dropdown = item.querySelector('.dropdown');
        dropdown.style.display = 'block';
        dropdown.style.animation = 'slideDown 0.2s ease';
    });

    item.addEventListener('mouseleave', () => {
        const dropdown = item.querySelector('.dropdown');
        dropdown.style.display = 'none';
    });
});



const brandFilters = document.querySelectorAll('.filter-brand');
const categoryFilters = document.querySelectorAll('.filter-category');
const surfaceFilters = document.querySelectorAll('.filter-surface');
const cards = document.querySelectorAll('.boot-card');
const clearBtn = document.getElementById('clearFilters');

function getCheckedValues(filters) {
    let values = [];
    filters.forEach(filter => {
        if (filter.checked) {
            values.push(filter.value);
        }
    });
    return values;
}

function filterCards() {
    const selectedBrands = getCheckedValues(brandFilters);
    const selectedCategories = getCheckedValues(categoryFilters);
    const selectedSurfaces = getCheckedValues(surfaceFilters);

    cards.forEach(card => {
        const cardBrand = card.dataset.brand;
        const cardCategory = card.dataset.category;
        const cardSurfaces = card.dataset.surface.split(' ');

        const brandMatch =
            selectedBrands.length === 0 || selectedBrands.includes(cardBrand);

        const categoryMatch =
            selectedCategories.length === 0 || selectedCategories.includes(cardCategory);

        const surfaceMatch =
            selectedSurfaces.length === 0 ||
            selectedSurfaces.some(surface => cardSurfaces.includes(surface));

        if (brandMatch && categoryMatch && surfaceMatch) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

[...brandFilters, ...categoryFilters, ...surfaceFilters].forEach(filter => {
    filter.addEventListener('change', filterCards);
});

clearBtn.addEventListener('click', () => {
    [...brandFilters, ...categoryFilters, ...surfaceFilters].forEach(filter => {
        filter.checked = false;
    });
    filterCards();
});
