document.addEventListener('DOMContentLoaded', function() {
    // Hide all content initially
    const content = document.getElementById('content');
    if (content) {
        content.style.display = 'none';
    }

    fetch('../elements/nav.html')
        .then(response => response.text())
        .then(data => {
            const navPlaceholder = document.getElementById('nav-placeholder');
            navPlaceholder.innerHTML = data;
            
            // Show content after nav is loaded
            if (content) {
                content.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
            // Show content even if nav fails to load
            if (content) {
                content.style.display = 'block';
            }
        });
});