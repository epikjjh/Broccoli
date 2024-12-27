const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';

export async function loadNews(rootElementParam) {
  // Use passed element or try to find it in DOM
  const rootElement = rootElementParam || document.getElementById('root');
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  const ul = document.createElement('ul');
  
  try {
    // Show loading state
    rootElement.innerHTML = 'Loading...';
    
    const response = await fetch(NEWS_URL);
    const newsFeed = await response.json();
    
    newsFeed.forEach(item => {
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

// Only call loadNews if we're in a browser environment
if (typeof window !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    loadNews(rootElement);
  }
}