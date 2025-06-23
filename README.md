# ShowMeWhatYouGot! - AI-Powered Movie & TV Show Recommendations

A modern, dark-themed web application that provides personalized movie and TV show recommendations using AI-powered natural language processing. Named after the iconic Rick and Morty episode, this app helps you discover amazing content across the multiverse through intelligent conversation!

## ✨ Features

- **AI-Powered Recommendations**: Describe what you want to watch in natural language
- **Smart Content Discovery**: AI interprets your preferences and suggests specific titles
- **Dual Content Types**: Get recommendations for both movies and TV shows
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
- **Smart Caching**: Reduces API calls for better performance

## 🚀 Quick Start Guide

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- TMDb API key (free)
- OpenRouter API key (free)

### Step 1: Get Your API Keys

#### TMDb API Key (for movie/show data):
1. Visit [The Movie Database (TMDb)](https://www.themoviedb.org/)
2. Create a free account
3. Go to your account settings
4. Navigate to the "API" section
5. Request an API key for "Developer" use
6. Copy your API key

#### OpenRouter API Key (for AI recommendations):
1. Visit [OpenRouter](https://openrouter.ai/)
2. Create a free account
3. Go to your API keys section
4. Generate a new API key
5. Copy your API key

### Step 2: Configure the Application

1. **Open `script.js`** in any text editor
2. **Replace the API keys** on lines 3 and 4:
   ```javascript
   const TMDB_API_KEY = 'your_tmdb_api_key_here';
   const OPENROUTER_API_KEY = 'your_openrouter_api_key_here';
   ```

### Step 3: Run the Application

**Option A: Direct File Opening**
- Simply double-click `index.html` to open it in your default browser
- Or right-click `index.html` → "Open with" → Choose your preferred browser

**Option B: Using a Local Server (Recommended)**
- Open Terminal/Command Prompt
- Navigate to the project folder: `cd /path/to/Rec-Content`
- Start a local server:
  - **Python 3**: `python -m http.server 8000`
  - **Python 2**: `python -m SimpleHTTPServer 8000`
  - **Node.js**: `npx serve .`
- Open your browser and go to `http://localhost:8000`

## 📁 File Structure

```
Rec-Content/
├── index.html          # Main HTML structure
├── style.css           # All styling and responsive design
├── script.js           # JavaScript functionality and API integration
├── .gitignore          # Git ignore file (excludes API keys)
└── README.md           # This file
```

## 🎯 How to Use

1. **Describe What You Want**: Type your movie/show preferences in natural language
   - Examples:
     - "I want a sci-fi movie with time travel"
     - "Show me romantic comedies from the 90s"
     - "I need a thriller with plot twists"
     - "Recommend TV shows like Breaking Bad"

2. **Submit Your Request**: 
   - Press **Enter** or click the "Show Me What You Got!" button
   - The AI will analyze your request and suggest specific titles

3. **Browse Results**: 
   - View the top 5 recommended movies and TV shows
   - Switch between "Movies" and "TV Shows" tabs
   - Click "Watch Trailer" to find trailers on YouTube

4. **Try Different Queries**: 
   - Experiment with different descriptions
   - Be specific about genres, time periods, or themes
   - The AI gets better with more detailed requests

## 🔧 Troubleshooting

### "Please add your API keys" Error
- Make sure you've replaced both API keys in `script.js`
- Verify your API keys are valid and active
- Check that you haven't exceeded API rate limits

### "Failed to fetch recommendations" Error
- Check your internet connection
- Verify both API keys are working
- Try refreshing the page

### No Results Found
- Try being more specific in your request
- Use different keywords or genres
- Some very specific requests may not find matches

### CORS Errors (if using local server)
- Make sure you're running the app through a local server, not just opening the HTML file
- Use the local server options mentioned in Step 3

## 🎨 Customization

### Changing the Theme
The app uses CSS custom properties. You can modify colors in `style.css`:
```css
:root {
  --primary-color: #00ff88;
  --background-color: #0a0a0a;
  --card-bg: #1a1a1a;
}
```

### Adding New Features
The modular design makes it easy to add new features:
- Extend the AI prompt in `script.js`
- Add new UI elements in `index.html`
- Modify the styling in `style.css`

## 🌐 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ❌ Internet Explorer (not supported)

## 📱 Mobile Support

The app is fully responsive and works great on:
- Smartphones
- Tablets
- Desktop computers

## 🔒 Security Notes

- **Never commit API keys to version control**
- The `.gitignore` file is configured to exclude `script.js` with API keys
- For production, use environment variables or a backend service

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving the documentation

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

- **TMDb API**: Movie and TV show data provided by [The Movie Database](https://www.themoviedb.org/)
- **OpenRouter**: AI-powered recommendations
- **Font Awesome**: Icons used throughout the interface
- **Google Fonts**: Inter font family for typography
- **Rick and Morty**: Inspiration for the app name and theme

## 🆘 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify your API keys are correct
3. Ensure you have a stable internet connection
4. Try refreshing the page

**Happy watching! 🎬✨** 