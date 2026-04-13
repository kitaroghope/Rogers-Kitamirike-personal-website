/**
 * Image Fallback Handler
 * Replaces inline onerror handlers with a CSP-friendly approach
 */

document.addEventListener('DOMContentLoaded', function() {
    // Map of image sources to their fallbacks
    const fallbackMap = {
        'images/profile.jpg': 'https://placehold.co/350x350?text=RK',
        'images/sms-preview.PNG': 'https://placehold.co/600x400?text=SMS',
        'images/darewell-preview.PNG': 'https://placehold.co/600x400?text=Truth+or+Dare',
        'images/chatbot-preview.PNG': 'https://placehold.co/600x400?text=AI+Chatbot'
    };

    // Initialize fallbacks for all images
    initImageFallbacks();

    function initImageFallbacks() {
        const images = document.querySelectorAll('img');

        images.forEach(img => {
            const src = img.src || img.getAttribute('data-src');
            if (src && fallbackMap[src]) {
                // Add error listener if not already handled
                if (!img.hasAttribute('data-fallback-init')) {
                    img.setAttribute('data-fallback-init', 'true');
                    img.addEventListener('error', function() {
                        handleImageError(this, fallbackMap[src]);
                    });
                }
            }
        });
    }

    function handleImageError(img, fallbackUrl) {
        // Only apply fallback if the image hasn't already been replaced
        if (!img.src.includes('placehold.co')) {
            img.src = fallbackUrl;
            // Remove the error handler to prevent infinite loops
            img.removeEventListener('error', arguments.callee);
        }
    }
});