let clothingItems = [];

// Fetch clothing items from clothing.txt on load
fetch('clothing.txt')
    .then(response => response.text())
    .then(data => {
        clothingItems = data.split('\n').map(line => {
            const [name, color, imageUrl] = line.split(',');
            return {
                name: name.trim(),
                color: color.trim(),
                imageUrl: imageUrl ? imageUrl.trim() : 'https://elysianuk.org/wp-content/uploads/woocommerce-placeholder-300x300.png'
            };
        });
        displayPopularItems();
    });

// Display popular items on the home screen
function displayPopularItems() {
    const popularItemsDiv = document.getElementById('popularItems');
    popularItemsDiv.innerHTML = clothingItems.slice(0, 6).map(item => `
        <div class="item">
            <img src="${item.imageUrl}" alt="${item.name}">
            <p>${item.color} ${item.name}</p>
        </div>
    `).join('');
}

// Perform search and display results
function searchItem() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const resultsDiv = document.getElementById('resultItems');
    const noResultsDiv = document.getElementById('noResults');

    const filteredItems = clothingItems.filter(item => item.name.toLowerCase().includes(query));

    // Display search results
    if (query && filteredItems.length > 0) {
        resultsDiv.innerHTML = filteredItems.map(item => `
            <div class="item">
                <img src="${item.imageUrl}" alt="${item.name}">
                <p>${item.color} ${item.name}</p>
            </div>
        `).join('');
        noResultsDiv.style.display = 'none';
        resultsDiv.style.display = 'grid';
    } else if (query) {
        resultsDiv.style.display = 'none';
        noResultsDiv.style.display = 'block';
    } else {
        resultsDiv.style.display = 'none';
        noResultsDiv.style.display = 'none';
    }

    document.getElementById('homeScreen').style.display = query ? 'none' : 'block';
    document.getElementById('searchResults').style.display = query ? 'block' : 'none';
}
