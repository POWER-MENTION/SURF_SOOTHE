// Function to reverse text
function reverseString(str) {
    return str.split('').reverse().join('');
}

// Function to process text nodes
function reverseTextNodes(node) {
    if (node.nodeType === Node.TEXT_NODE && node.parentNode.tagName !== 'SCRIPT' && node.parentNode.tagName !== 'STYLE') {
        node.textContent = reverseString(node.textContent);
    } else {
        for (let child of node.childNodes) {
            reverseTextNodes(child);
        }
    }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "reverseText") {
        // Reverse the page title
        document.title = reverseString(document.title);

        // Reverse all text content
        reverseTextNodes(document.body);

        // Handle dynamic content (optional)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        reverseTextNodes(node);
                    }
                });
            });
        });

        // Start observing the document for dynamic changes
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
});