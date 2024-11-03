document.getElementById('reverseButton').addEventListener('click', async () => {
    // Get the current active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Execute the text reversal
    chrome.tabs.sendMessage(tab.id, { action: "reverseText" });
});