import { loadNews } from './app';

// Mock fetch globally
global.fetch = jest.fn();

describe('loadNews', () => {
  let rootElement;

  beforeEach(() => {
    // Create a fresh DOM element for each test
    rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);
    
    // Clear all mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('shows loading state while fetching news', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { title: 'Test News 1' },
          { title: 'Test News 2' }
        ])
      })
    );

    // Pass rootElement to the function
    loadNews(rootElement);
    
    expect(rootElement.innerHTML).toBe('Loading...');
  });

  test('displays news items after successful fetch', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { title: 'Test News 1' },
          { title: 'Test News 2' }
        ])
      })
    );

    // Pass rootElement to the function
    await loadNews(rootElement);
    
    const listItems = rootElement.querySelectorAll('li');
    expect(listItems).toHaveLength(2);
    expect(listItems[0].innerHTML).toBe('Test News 1');
    expect(listItems[1].innerHTML).toBe('Test News 2');
  });

  test('shows error message when fetch fails', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch'))
    );

    // Pass rootElement to the function
    await loadNews(rootElement);
    
    expect(rootElement.innerHTML).toBe('Error loading news feed');
  });
}); 