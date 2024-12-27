const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const rootElement = document.getElementById('root');
async function loadNews() {
    const ul = document.createElement('ul');
    try {
        // Show loading state
        rootElement.innerHTML = 'Loading...';
        const response = await fetch(NEWS_URL);
        const newsFeed = await response.json();
        newsFeed.forEach((item)=>{
            const li = document.createElement('li');
            li.innerHTML = item.title;
            ul.appendChild(li);
        });
        // Clear loading state and show content
        rootElement.innerHTML = '';
        rootElement.appendChild(ul);
    } catch (error) {
        rootElement.innerHTML = 'Error loading news feed';
        console.error('Error:', error);
    }
}
// Call the function when page loads
loadNews();

//# sourceMappingURL=index.94adb041.js.map
