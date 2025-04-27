document.addEventListener('DOMContentLoaded', function() {
    // Hide all content initially
    const content = document.getElementById('content');
    if (content) {
        content.style.display = 'none';
    }

    function highlightCurrentPage(clickedLink) {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('#nav a');

        navLinks.forEach(link => {
            // Remove any existing active class
            link.classList.remove('active');

            // If the link's href matches the current path, add active class
            if (link === clickedLink) {
                link.classList.add('active');
            }
        });
    }

    fetch('/pages/elements/nav.html')
        .then(response => response.text())
        .then(data => {
            const navPlaceholder = document.getElementById('nav-placeholder');
            navPlaceholder.innerHTML = data;

            // Add click events to navigation links
            const navLinks = document.querySelectorAll('#nav a');
            navLinks.forEach(link => {

                // Initially highlight the home nav
                if (link.getAttribute('href') === '/index.html') {
                    highlightCurrentPage(link);
                }

                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const pagePath = this.getAttribute('href');

                    // Handle home page separately
                    if (pagePath === '../../index.html') {
                        window.location.href = pagePath;
                        return;
                    }

                    // Load content from the clicked page
                    fetch(pagePath)
                        .then(response => response.text())
                        .then(pageContent => {
                            content.innerHTML = pageContent;
                            content.style.display = 'block';
                        })
                        .catch(error => {
                            console.error('Error loading page content:', error);
                            content.innerHTML = '<p>Error loading content</p>';
                            content.style.display = 'block';
                        });
                    
                    highlightCurrentPage(link);
                });
            });

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