const NEWS_URL = 'https://api.hnpwa.com/v0/news/{page}.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/{id}.json';
const pageInfo = {
  currentPage: 1,
  minPage: 1,
  maxPage: 10,
}

export { loadNewsFeed, loadNewsMaterial, routePage, setLoading };

// Only call loadNews if we're in a browser environment
if (typeof window !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    window.addEventListener('hashchange', () => routePage(rootElement));
    loadNewsFeed(rootElement);
  }
}

function routePage(rootElementParam) {
  // Use passed element or try to find it in DOM
  const rootElement = rootElementParam || document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  if (location.hash === '' || location.hash === '#prevPage' || location.hash === '#nextPage') {
    location.hash = '';
    loadNewsFeed(rootElementParam);
  } else if (location.hash.startsWith('#item')) {
    loadNewsMaterial(rootElementParam);
  } else {
    rootElement.innerHTML = 'Error: Invalid route';
    console.error('Invalid hash:', location.hash);  
  }
}

async function loadNewsFeed(rootElementParam) {
  // Use passed element or try to find it in DOM
  const rootElement = rootElementParam || document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  const currentPage = pageInfo.currentPage;
  let newsFeedList = [];
  let template = `
    <ul>
      {{newsFeed}}
    </ul>
    <button class="prev-btn">Previous Page</button>
    <span>Page ${currentPage} of ${pageInfo.maxPage}</span>
    <button class="next-btn">Next Page</button>
  `

  try {
    setLoading(rootElement, true);
    
    const response = await fetch(NEWS_URL.replace('{page}', currentPage));
    const newsFeed = await response.json();
    
    newsFeed.forEach(item => {
      newsFeedList.push(
        `<li>
          <a href="#item=${item.id}">
            ${item.title} (${item.comments_count})
          </a>
        </li>`
      );
    });
    
    rootElement.innerHTML = template.replace('{{newsFeed}}', newsFeedList.join(''));
  } catch (error) {
    console.error('Error:', error);
    rootElement.innerHTML = `Error loading news feed: ${error.message || 'Unknown error'}`;
   }

  const prevPageButton = rootElement.querySelector('.prev-btn');
  const nextPageButton = rootElement.querySelector('.next-btn');

  if (currentPage > pageInfo.minPage) {
    prevPageButton.addEventListener('click', () => {
      pageInfo.currentPage = currentPage - 1;
      location.hash = '#prevPage';
    });
  } else {
    prevPageButton.remove();
  }

  if (currentPage < pageInfo.maxPage) {
    nextPageButton.addEventListener('click', () => {
      pageInfo.currentPage = currentPage + 1;
      location.hash = '#nextPage';
    });
  } else {
    nextPageButton.remove();
  }
}

async function loadNewsMaterial(rootElementParam) {
   // Use passed element or try to find it in DOM
  const rootElement = rootElementParam || document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  // Extract newsId from the hash
  const newsId = location.hash.startsWith('#item=') 
    ? location.hash.substring(6)
    : null;
  if (!newsId) {
    throw new Error('Invalid news ID format');
  }

  let template = `
    <button class="back-btn">← Back to News</button>
    <h1>{{title}}</h1>
    {{url}}
    <h2>Comments:</h2>
    {{comments}}
  `
  
  try {
    setLoading(rootElement, true); 
    // Fetch the item details
    const response = await fetch(CONTENT_URL.replace('{id}', newsId));
    const content = await response.json();

    template = template.replace('{{title}}', content.title);
    template = template.replace('{{url}}', content.url ? `<p><a href="${content.url}" target="_blank">Visit Story</a></p>` : '');
    rootElement.innerHTML = template.replace('{{comments}}', content.comments.length > 0 ? 
      `<ul>${content.comments.map(c => `<li>${c.content}</li>`).join('')}</ul>` 
      : '<p>No comments yet</p>'
    );
  } catch (error) {
    console.error('Error:', error);
    rootElement.innerHTML = `Error loading content: ${error.message || 'Unknown error'}`;
  }

  const backButton = rootElement.querySelector('.back-btn');
  backButton.addEventListener('click', () => {
    location.hash = '';
  });
}

function setLoading(rootElement, isLoading) {
  if (isLoading) {
    rootElement.innerHTML = 'Loading...';
  }
}
