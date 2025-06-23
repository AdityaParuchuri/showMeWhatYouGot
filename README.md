# ShowMeWhatYouGot! - Movie & TV Show Recommendation App

A modern, dark-themed web application that provides personalized movie and TV show recommendations based on your genre preferences using the TMDb API. Named after the iconic Rick and Morty episode, this app helps you discover amazing content across the multiverse!

## Features

- **Genre Selection**: Choose from 19 movie genres with beautiful, interactive tiles
- **Multi-Genre Support**: Select multiple genres for more personalized recommendations
- **Dual Content Types**: Get recommendations for both movies and TV shows
- **Tabbed Interface**: Toggle between movie and TV show results
- **Rich Content Display**: Each result includes:
  - Movie/show poster
  - Title and release year
  - IMDB rating
  - Genre tags
  - Short overview
  - Trailer link
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, dark theme with smooth animations and hover effects
- **Loading States**: Beautiful loading animations and error handling

## Setup Instructions

### 1. Get Your TMDb API Key

1. Visit [The Movie Database (TMDb)](https://www.themoviedb.org/)
2. Create a free account
3. Go to your account settings
4. Navigate to the "API" section
5. Request an API key for "Developer" use
6. Copy your API key

### 2. Add Your API Key

Open `script.js` and replace `'YOUR_TMDB_API_KEY'` on line 3 with your actual API key:

```javascript
const TMDB_API_KEY = 'your_actual_api_key_here';
```

### 3. Run the Application

Simply open `index.html` in your web browser. No server setup required!

## File Structure

```
Rec-Content/
├── index.html          # Main HTML structure
├── style.css           # All styling and responsive design
├── script.js           # JavaScript functionality and API integration
└── README.md           # This file
```

## How to Use

1. **Select Genres**: Click on one or more genre tiles to select your preferences
2. **Get Recommendations**: Click the "Get Recommendations" button
3. **View Results**: Browse through the recommended movies and TV shows
4. **Switch Tabs**: Toggle between "Movies" and "TV Shows" tabs
5. **Watch Trailers**: Click "Watch Trailer" to open YouTube search results

## Extensibility

The app is designed to be easily extensible. You can add new preference types by:

1. **Adding new preference sections** in the HTML (similar to the genre section)
2. **Creating new preference tiles** with custom styling
3. **Extending the API calls** to include additional parameters
4. **Modifying the recommendation logic** to incorporate new filters

### Example: Adding Actor Preferences

You could add an actor selection section that:
- Fetches popular actors from TMDb API
- Allows users to select favorite actors
- Includes `with_cast` parameter in API calls
- Displays actor information in result cards

## API Endpoints Used

- **Movie Discovery**: `/discover/movie` - Get movies by genre
- **TV Show Discovery**: `/discover/tv` - Get TV shows by genre
- **Image URLs**: `https://image.tmdb.org/t/p/w500` - Movie/show posters

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### "Please add your TMDb API key" Error
- Make sure you've replaced `'YOUR_TMDB_API_KEY'` with your actual API key
- Verify your API key is valid and active

### "Failed to fetch recommendations" Error
- Check your internet connection
- Verify your API key has the correct permissions
- Ensure you haven't exceeded API rate limits

### No Results Found
- Try selecting different genres
- Some genre combinations may not have many results
- The API returns the most popular content first

## Customization

### Changing Colors
The app uses CSS custom properties and gradients. You can modify the color scheme by editing the CSS variables in `style.css`.

### Adding More Genres
You can add more genres by extending the `genres` array in `script.js` with new genre objects.

### Modifying the Layout
The app uses CSS Grid and Flexbox for responsive layouts. You can adjust the grid columns, spacing, and breakpoints in `style.css`.

## License

This project is open source and available under the MIT License.

## Credits

- **TMDb API**: Movie and TV show data provided by [The Movie Database](https://www.themoviedb.org/)
- **Font Awesome**: Icons used throughout the interface
- **Google Fonts**: Inter font family for typography 