const NEWS_URL = 'https://api.hnpwa.com/v0/news/{page}.json';
const CONTENT_URL = 'https://hacker-news.firebaseio.com/v0/item/{id}.json';
const initialPage = 1;
const maxPage = 10;

// Initialize the pipeline
let summarizer;
async function initializeSummarizer() {
  try {
    // Using a smaller model for better performance
    summarizer = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6');
  } catch (error) {
    console.error('Failed to initialize summarizer:', error);
  }
}

// Initialize when the page loads
initializeSummarizer();

export async function loadNews(rootElementParam, currentPage) {
  // Use passed element or try to find it in DOM
  const rootElement = rootElementParam || document.getElementById('root');

  if (!rootElement) {
    throw new Error('Root element not found');
  }

  const ul = document.createElement('ul');

  window.addEventListener('hashchange', async () => {
    const id = location.hash.substring(1);
    const summary = document.createElement('div');
    
    try {
      // Show loading state
      rootElement.innerHTML = 'Loading...';
      
      // Fetch the item details
      const response = await fetch(CONTENT_URL.replace('{id}', id));
      const content = await response.json();
      
      // Create a back button
      const backButton = document.createElement('button');
      backButton.innerHTML = '← Back to News';
      backButton.addEventListener('click', () => {
        location.hash = '';
        loadNews(rootElement, currentPage);
      });
      
      // Prepare content for summarization
      const textToSummarize = `
        Title: ${content.title}
        URL Content: ${content.url ? content.url : 'No URL'}
        Comments: ${content.comments ? content.comments.map(c => c.content).join('\n') : 'No comments'}
      `;
      
      // Use transformers.js for summarization
      const result = await summarizer(textToSummarize, {
        max_length: 150,
        min_length: 30,
      });
      
      const summarizedContent = result[0].summary_text;
      
      // Display the summary
      summary.innerHTML = `
        <h2>${content.title}</h2>
        <p><strong>Summary:</strong></p>
        <p>${summarizedContent}</p>
        <p><strong>Original URL:</strong> <a href="${content.url}" target="_blank">${content.url}</a></p>
        <p><strong>Comments:</strong> ${content.comments_count || 0}</p>
      `;
      
      rootElement.innerHTML = '';
      rootElement.appendChild(backButton);
      rootElement.appendChild(summary);
      
    } catch (error) {
      console.error('Error:', error);
      rootElement.innerHTML = 'Error loading content';
    }
  });
  
  try {
    // Show loading state
    rootElement.innerHTML = 'Loading...';
    
    const response = await fetch(NEWS_URL.replace('{page}', currentPage));
    const newsFeed = await response.json();
    
    newsFeed.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${item.id}`;
      a.innerHTML = `${item.title} (${item.comments_count})`;
      li.appendChild(a);
      ul.appendChild(li);
    });
    
    // Clear loading state and show content
    rootElement.innerHTML = '';
    rootElement.appendChild(ul);
    
  } catch (error) {
    rootElement.innerHTML = 'Error loading news feed';
    console.error('Error:', error);
  }

  if (currentPage > initialPage) {
    const prevPageButton = document.createElement('button');
    prevPageButton.innerHTML = 'Previous Page';
    prevPageButton.addEventListener('click', () => {
      currentPage--;
      loadNews(rootElement, currentPage);
    });
    rootElement.appendChild(prevPageButton);
  }

  if (currentPage < maxPage) {
    const nextPageButton = document.createElement('button');
    nextPageButton.innerHTML = 'Next Page';
    nextPageButton.addEventListener('click', () => {
      currentPage++;
      loadNews(rootElement, currentPage);
    });
    rootElement.appendChild(nextPageButton);
  }
}

// Only call loadNews if we're in a browser environment
if (typeof window !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    loadNews(rootElement, 1);
  }
}