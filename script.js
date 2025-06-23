// TMDb API Configuration
// TODO: Replace 'YOUR_TMDB_API_KEY' with your actual TMDb API key
const TMDB_API_KEY = 'c1e4f8e11898946a61ff994c1703105c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// OpenRouter API Configuration
// TODO: Replace 'YOUR_OPENROUTER_API_KEY' with your actual OpenRouter API key
const OPENROUTER_API_KEY = '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';
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
// Using a free model - you can change this to other free models like 'mistralai/mistral-7b-instruct'
const OPENROUTER_MODEL = 'mistralai/mistral-7b-instruct';

// State management
let moviesResults = [];
let tvShowsResults = [];
let isUsingNLP = true; // Always using NLP now
let interpretedQuery = null;

// Cache for API results
const apiCache = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// DOM elements
const loadingState = document.getElementById('loadingState');
const resultsSection = document.getElementById('resultsSection');
const errorState = document.getElementById('errorState');
const moviesResultsContainer = document.getElementById('moviesResults');
const tvshowsResultsContainer = document.getElementById('tvshowsResults');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// NLP elements
const nlpInput = document.getElementById('nlpInput');
const nlpSubmitBtn = document.getElementById('nlpSubmitBtn');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    nlpSubmitBtn.addEventListener('click', handleNLPSubmit);
    
    // Add Enter key support for NLP input
    nlpInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent new line in textarea
            handleNLPSubmit();
        }
    });
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchTab(button.dataset.tab);
        });
    });
}

// Display results
function displayResults() {
    displayMovies();
    displayTVShows();
    showResults();
    
    // Show interpreted query if using NLP
    if (interpretedQuery) {
        showInterpretedQuery();
    }
    
    // Scroll to results section
    setTimeout(() => {
        resultsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 100); // Small delay to ensure results are rendered
}

// Display movies
function displayMovies() {
    const moviesContainer = moviesResultsContainer;
    moviesContainer.innerHTML = '';
    
    if (moviesResults.length === 0) {
        moviesContainer.innerHTML = '<p class="no-results">No movies found for your request.</p>';
        return;
    }
    
    moviesResults.forEach(movie => {
        const movieCard = createResultCard(movie, 'movie');
        moviesContainer.appendChild(movieCard);
    });
}

// Display TV shows
function displayTVShows() {
    const tvShowsContainer = tvshowsResultsContainer;
    tvShowsContainer.innerHTML = '';
    
    if (tvShowsResults.length === 0) {
        tvShowsContainer.innerHTML = '<p class="no-results">No TV shows found for your request.</p>';
        return;
    }
    
    tvShowsResults.forEach(show => {
        const showCard = createResultCard(show, 'tv');
        tvShowsContainer.appendChild(showCard);
    });
}

// Create result card
function createResultCard(item, type) {
    const card = document.createElement('div');
    card.className = 'result-card';
    
    const posterPath = item.poster_path 
        ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}`
        : 'https://via.placeholder.com/300x450/2a2a2a/666666?text=No+Poster';
    
    const title = type === 'movie' ? item.title : item.name;
    const year = type === 'movie' 
        ? (item.release_date ? new Date(item.release_date).getFullYear() : 'N/A')
        : (item.first_air_date ? new Date(item.first_air_date).getFullYear() : 'N/A');
    
    const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
    const overview = item.overview || 'No overview available.';
    
    // Get genre tags based on input method
    let genreTags = '';
    if (interpretedQuery) {
        // For NLP results, show the original title that was searched for
        const originalTitle = type === 'movie' 
            ? interpretedQuery.movies?.find(m => m.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(m.toLowerCase()))
            : interpretedQuery.tv_shows?.find(t => t.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(t.toLowerCase()));
        
        if (originalTitle) {
            genreTags = `<span class="genre-tag">AI Suggested: ${originalTitle}</span>`;
        }
    }
    
    card.innerHTML = `
        <div class="card-poster">
            <img src="${posterPath}" alt="${title}" loading="lazy">
            <div class="rating">
                <i class="fas fa-star"></i> ${rating}
            </div>
        </div>
        <div class="card-content">
            <h3 class="card-title">${title}</h3>
            <div class="card-meta">
                <span><i class="fas fa-calendar"></i> ${year}</span>
                <span><i class="fas fa-star"></i> ${rating}/10</span>
            </div>
            <div class="card-genres">
                ${genreTags}
            </div>
            <p class="card-overview">${overview}</p>
            <div class="card-actions">
                <a href="#" class="watch-trailer-btn" onclick="openTrailer(${item.id}, '${type}')">
                    <i class="fas fa-play"></i> Watch Trailer
                </a>
            </div>
        </div>
    `;
    
    return card;
}

// Switch between tabs
function switchTab(tabName) {
    // Update tab buttons
    tabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    // Update tab content
    tabContents.forEach(content => {
        content.classList.toggle('active', content.id === `${tabName}Tab`);
    });
}

// Open trailer (placeholder function - you can extend this)
function openTrailer(itemId, type) {
    // This is a placeholder. You can extend this to:
    // 1. Fetch trailer data from TMDb API
    // 2. Open in a modal or new window
    // 3. Redirect to YouTube or other video platform
    
    const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(type === 'movie' ? 'movie' : 'tv show')}+trailer+${itemId}`;
    window.open(trailerUrl, '_blank');
}

// Utility functions for showing/hiding states
function showLoading() {
    loadingState.classList.remove('hidden');
}

function hideLoading() {
    loadingState.classList.add('hidden');
}

function showResults() {
    resultsSection.classList.remove('hidden');
}

function hideResults() {
    resultsSection.classList.add('hidden');
}

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorState.classList.remove('hidden');
}

function hideError() {
    errorState.classList.add('hidden');
}

// Add some CSS for no results
const style = document.createElement('style');
style.textContent = `
    .no-results {
        text-align: center;
        color: #a0a0a0;
        font-size: 1.1rem;
        padding: 2rem;
        grid-column: 1 / -1;
    }
`;
document.head.appendChild(style);

// Handle NLP submission
async function handleNLPSubmit() {
    const query = nlpInput.value.trim();
    
    if (!query) {
        showError('Please enter a description of what you want to watch');
        return;
    }
    
    if (OPENROUTER_API_KEY === 'YOUR_OPENROUTER_API_KEY') {
        showError('Please add your OpenRouter API key to the script.js file');
        return;
    }
    
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY.length < 10) {
        showError('Invalid OpenRouter API key. Please check your API key.');
        return;
    }
    
    showLoading();
    hideError();
    hideResults();
    
    try {
        // Process the natural language query to get specific titles
        const interpretation = await processNLPQuery(query);
        interpretedQuery = interpretation;
        
        // Search for the suggested titles in TMDb
        const [moviesData, tvShowsData] = await Promise.all([
            searchMoviesByTitles(interpretation.movies || []),
            searchTVShowsByTitles(interpretation.tv_shows || [])
        ]);
        
        moviesResults = moviesData;
        tvShowsResults = tvShowsData;
        
        // Check if we got any results
        if (moviesResults.length === 0 && tvShowsResults.length === 0) {
            showError('No movies or TV shows found for your request. Try being more specific or use different keywords.');
            hideLoading();
            return;
        }
        
        displayResults();
        hideLoading();
        
    } catch (error) {
        console.error('Error processing NLP query:', error);
        
        // Provide more specific error messages
        if (error.message.includes('OpenRouter API error')) {
            showError('AI service is temporarily unavailable. Please try again in a moment.');
        } else if (error.message.includes('Failed to interpret')) {
            showError('Unable to understand your request. Try being more specific about what you want to watch.');
        } else {
            showError('Something went wrong. Please try again with a different description.');
        }
        
        hideLoading();
    }
}

// Process natural language query using OpenRouter API
async function processNLPQuery(query) {
    const prompt = `Based on this user request, suggest specific movie and TV show titles that match their criteria. Return a JSON object with the following structure:

{
  "movies": ["array of specific movie titles"],
  "tv_shows": ["array of specific TV show titles"],
  "summary": "brief summary of what the user wants"
}

User request: "${query}"

Suggest 5-8 specific titles for each category (movies and TV shows) that best match the user's request. Only include well-known, popular titles that are likely to be in a movie database. Return only the JSON object, no additional text.`;

    const requestBody = {
        model: OPENROUTER_MODEL,
        messages: [
            {
                role: 'user',
                content: prompt
            }
        ],
        temperature: 0.1,
        max_tokens: 500
    };

    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.href,
            'X-Title': 'ShowMeWhatYouGot!'
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
        // Try to parse the JSON response
        const parsed = JSON.parse(content);
        
        // Validate the response structure
        if (!parsed.movies && !parsed.tv_shows) {
            throw new Error('Invalid response structure');
        }
        
        // Ensure we have arrays
        parsed.movies = Array.isArray(parsed.movies) ? parsed.movies : [];
        parsed.tv_shows = Array.isArray(parsed.tv_shows) ? parsed.tv_shows : [];
        
        return parsed;
    } catch (parseError) {
        console.error('Failed to parse AI response:', content);
        
        // Fallback: try to extract titles from the text response
        const fallbackResult = extractTitlesFromText(content, query);
        if (fallbackResult.movies.length > 0 || fallbackResult.tv_shows.length > 0) {
            return fallbackResult;
        }
        
        throw new Error('Failed to interpret your request. Please try a different description.');
    }
}

// Fallback function to extract titles from malformed AI response
function extractTitlesFromText(text, originalQuery) {
    const result = {
        movies: [],
        tv_shows: [],
        summary: `Showing results for: ${originalQuery}`
    };
    
    // Common patterns to extract movie/show titles
    const patterns = [
        /"([^"]+)"\s*[,}]/g,  // Quoted titles
        /'([^']+)'\s*[,}]/g,  // Single quoted titles
        /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g  // Capitalized words (basic pattern)
    ];
    
    const allMatches = new Set();
    
    patterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(text)) !== null) {
            const title = match[1] || match[0];
            if (title.length > 2 && title.length < 100) {
                allMatches.add(title.trim());
            }
        }
    });
    
    // Filter out common non-title words
    const excludeWords = ['movies', 'shows', 'title', 'array', 'object', 'json', 'user', 'request', 'criteria'];
    const filteredTitles = Array.from(allMatches).filter(title => 
        !excludeWords.some(word => title.toLowerCase().includes(word))
    );
    
    // Split between movies and TV shows (simple heuristic)
    result.movies = filteredTitles.slice(0, Math.ceil(filteredTitles.length / 2));
    result.tv_shows = filteredTitles.slice(Math.ceil(filteredTitles.length / 2));
    
    return result;
}

// Search for movies by specific titles
async function searchMoviesByTitles(titles) {
    const results = [];
    
    for (const title of titles) {
        try {
            const movieData = await searchMovieByTitle(title);
            if (movieData) {
                results.push(movieData);
            }
        } catch (error) {
            console.warn(`Failed to find movie: ${title}`, error);
        }
    }
    
    // If no specific titles found, try genre-based fallback
    if (results.length === 0 && titles.length > 0) {
        console.log('No specific titles found, trying genre-based fallback...');
        return await getMovieRecommendationsByKeywords(titles);
    }
    
    // Sort by rating and return top 5
    return results
        .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
        .slice(0, 5);
}

// Search for TV shows by specific titles
async function searchTVShowsByTitles(titles) {
    const results = [];
    
    for (const title of titles) {
        try {
            const showData = await searchTVShowByTitle(title);
            if (showData) {
                results.push(showData);
            }
        } catch (error) {
            console.warn(`Failed to find TV show: ${title}`, error);
        }
    }
    
    // If no specific titles found, try genre-based fallback
    if (results.length === 0 && titles.length > 0) {
        console.log('No specific titles found, trying genre-based fallback...');
        return await getTVShowRecommendationsByKeywords(titles);
    }
    
    // Sort by rating and return top 5
    return results
        .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
        .slice(0, 5);
}

// Fallback: Get movie recommendations based on keywords
async function getMovieRecommendationsByKeywords(keywords) {
    const keywordString = keywords.join(' ');
    const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(keywordString)}&language=en-US&page=1&sort_by=vote_average.desc`;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results.slice(0, 5);
}

// Fallback: Get TV show recommendations based on keywords
async function getTVShowRecommendationsByKeywords(keywords) {
    const keywordString = keywords.join(' ');
    const url = `${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(keywordString)}&language=en-US&page=1&sort_by=vote_average.desc`;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results.slice(0, 5);
}

// Search for a specific movie by title with caching
async function searchMovieByTitle(title) {
    const cacheKey = `movie_${title.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    
    // Check cache first
    const cached = apiCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }
    
    const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&language=en-US&page=1`;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
        // Try to find the best match
        let bestMatch = data.results[0];
        
        // Look for exact or close matches
        for (const movie of data.results) {
            const movieTitle = movie.title.toLowerCase();
            const searchTitle = title.toLowerCase();
            
            // Exact match
            if (movieTitle === searchTitle) {
                bestMatch = movie;
                break;
            }
            
            // Contains match (more flexible)
            if (movieTitle.includes(searchTitle) || searchTitle.includes(movieTitle)) {
                bestMatch = movie;
                break;
            }
        }
        
        // Only return if we have a reasonable match
        if (bestMatch.vote_average >= 5.0) {
            // Cache the result
            apiCache.set(cacheKey, {
                data: bestMatch,
                timestamp: Date.now()
            });
            return bestMatch;
        }
    }
    
    return null;
}

// Search for a specific TV show by title with caching
async function searchTVShowByTitle(title) {
    const cacheKey = `tv_${title.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    
    // Check cache first
    const cached = apiCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }
    
    const url = `${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&language=en-US&page=1`;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
        // Try to find the best match
        let bestMatch = data.results[0];
        
        // Look for exact or close matches
        for (const show of data.results) {
            const showTitle = show.name.toLowerCase();
            const searchTitle = title.toLowerCase();
            
            // Exact match
            if (showTitle === searchTitle) {
                bestMatch = show;
                break;
            }
            
            // Contains match (more flexible)
            if (showTitle.includes(searchTitle) || searchTitle.includes(showTitle)) {
                bestMatch = show;
                break;
            }
        }
        
        // Only return if we have a reasonable match
        if (bestMatch.vote_average >= 5.0) {
            // Cache the result
            apiCache.set(cacheKey, {
                data: bestMatch,
                timestamp: Date.now()
            });
            return bestMatch;
        }
    }
    
    return null;
}

// Show interpreted query summary
function showInterpretedQuery() {
    const resultsHeader = document.querySelector('.results-header');
    
    // Remove existing interpreted query if present
    const existingQuery = document.querySelector('.interpreted-query');
    if (existingQuery) {
        existingQuery.remove();
    }
    
    const queryDiv = document.createElement('div');
    queryDiv.className = 'interpreted-query';
    
    const tags = [];
    
    // Add suggested movies
    if (interpretedQuery.movies && interpretedQuery.movies.length > 0) {
        tags.push(...interpretedQuery.movies.map(movie => `<span class="query-tag">Movie: ${movie}</span>`));
    }
    
    // Add suggested TV shows
    if (interpretedQuery.tv_shows && interpretedQuery.tv_shows.length > 0) {
        tags.push(...interpretedQuery.tv_shows.map(show => `<span class="query-tag">TV: ${show}</span>`));
    }
    
    queryDiv.innerHTML = `
        <h3><i class="fas fa-magic"></i> AI Suggestions</h3>
        <p>${interpretedQuery.summary || 'Showing results based on your description'}</p>
        ${tags.length > 0 ? `<div class="query-tags">${tags.join('')}</div>` : ''}
    `;
    
    resultsHeader.parentNode.insertBefore(queryDiv, resultsHeader.nextSibling);
} 