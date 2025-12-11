# Lehrerzitate Frontend

A clean, modern, responsive frontend for "Lehrerzitate" - a website where students can browse and submit funny quotes from teachers.

## 🎯 Features

- **Quote Browser**: Browse all teacher quotes with a clean, card-based layout
- **Search & Filter**: Search quotes by teacher name, subject, or quote text
- **Sorting**: Sort quotes by newest, most popular, or oldest
- **Voting System**: Upvote and downvote quotes (UI with dummy data)
- **Quote Submission**: Submit new quotes with validation
- **Tab Navigation**: Seamless tab switching between For You, Search, and Info pages
- **Settings**: Dark mode toggle and accent color customization with reset option
- **Info Page**: Informational content about the platform
- **About Page**: Mission statement and project information
- **Responsive Design**: Fully responsive and optimized for mobile devices
- **Modern UI**: Clean, minimalistic design with smooth animations
- **Theme Persistence**: User preferences saved to localStorage
- **No Dependencies**: Built with vanilla HTML, CSS, and JavaScript only

## 📁 Project Structure

```
Frontend/
├── html/
│   ├── index.html           # Main application with all tabs
│   ├── header.html          # Header component (navigation)
│   ├── footer.html          # Footer component
│   ├── about.html           # About page content
│   ├── info.html            # Info page content
│   ├── settings.html        # Settings page content
│   └── submit.html          # Quote submission page
├── css/
│   ├── style.css            # Global styles and main app styles
│   ├── settings.css         # Settings page specific styles
│   └── submit.css           # Submit page specific styles
├── js/
│   ├── loader.js            # Component loader for HTML partials
│   ├── app.js               # Main app logic & quote browser
│   ├── settings.js          # Settings page specific logic
│   └── submit.js            # Form handling and submission logic
├── img/                     # Optional: for icons/assets
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A simple HTTP server (Python, Node.js, or similar)

### Running Locally

#### Option 1: Python (Built-in on most systems)

```bash
cd Frontend/html
python -m http.server 8000
```

Then open your browser and navigate to: `http://localhost:8000`

#### Option 2: Node.js with http-server

```bash
npm install -g http-server
cd Frontend/html
http-server -p 8000
```

Then open your browser and navigate to: `http://localhost:8000`

#### Option 3: Live Server in VS Code

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📄 Pages

### 1. **index.html** - Main Application Hub

The main page with tab navigation featuring:
- **For You Tab**: Browse all quotes with search and sort
- **Info Tab**: Learn about the platform
- **Settings Tab**: Customize appearance and preferences
- **About Tab**: Mission and project information
- **Submit Tab**: Submit new quotes

**Key Features:**
- Tab-based navigation (desktop and mobile)
- Real-time search filtering
- Multiple sort options
- Vote counts that update immediately
- Active vote state indication
- Settings with dark mode and color customization
- LocalStorage persistence for user preferences

### 2. **For You Page** - Quote Feed

Within the main index.html, the "For You" tab displays:
- Quote cards with teacher name and subject
- Upvote/downvote buttons with vote counts
- Real-time search and filtering
- Sort options (newest, popular, oldest)

### 3. **Info Tab** - Platform Information

Displays informational content about the platform:
- Feature descriptions with icons
- How-to guides
- Platform benefits

### 4. **Settings Tab** - User Preferences

Comprehensive settings page with:
- **Dark Mode Toggle**: Switch between light and dark themes
- **Accent Color Picker**: Choose from 5 color options
  - Blue (#4a69bd) - Default
  - Red (#e74c3c)
  - Green (#27ae60)
  - Orange (#f39c12)
  - Purple (#7f6fa8)
- **Reset Settings Button**: Restore defaults with one click
- **Instant Application**: Changes apply in real-time
- **Persistent Settings**: Preferences saved to localStorage

### 5. **About Tab** - Project Information

Shows:
- Project mission statement
- Key information about the platform
- Project details and vision

### 6. **submit.html** - Quote Submission

A dedicated page for submitting new quotes with:
- Quote text input (required, 10-500 characters)
- Teacher name input (required, 2-100 characters)
- Subject input (optional, max 50 characters)
- Real-time validation feedback
- Success/error message display

**Key Features:**
- Client-side form validation
- Character limits with feedback
- Visual error and success messages
- Form auto-reset on successful submission
- Intuitive, user-friendly design

## 🎨 Design System

### Color Palette

- **Primary**: `#4a69bd` (Blue) - Main brand color
- **Primary Dark**: `#3d5a99` (Dark Blue)
- **Secondary**: `#f39c12` (Orange) - Accent
- **Accent**: `#e74c3c` (Red) - Error/Alert
- **Success**: `#27ae60` (Green) - Success messages
- **Text Dark**: `#2c3e50` (Dark Gray)
- **Text Light**: `#7f8c8d` (Light Gray)
- **Background**: `#f8f9fa` (Off-white)

### Accent Color Options (Customizable)

Users can choose from these preset colors in Settings:
- **Blue**: `#4a69bd` (default)
- **Red**: `#e74c3c`
- **Green**: `#27ae60`
- **Orange**: `#f39c12`
- **Purple**: `#7f6fa8`

### Dark Mode

Complete dark theme support:
- Dark background colors
- Light text for readability
- Adjusted card and input colors
- Smooth transitions between themes

### Typography

- **Font Family**: System font stack (Apple/Google/Microsoft system fonts)
- **Heading**: Bold, large sizes for clear hierarchy
- **Body**: Regular weight, 1.6 line-height for readability
- **Code**: Monospace for technical content

### Spacing & Layout

- **Border Radius**: 8px for all rounded elements
- **Shadows**: Three levels (sm, md, lg) for depth
- **Transitions**: 0.3s ease for smooth interactions
- **Max Width**: 1200px for main content container

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (full features, desktop menu)
- **Tablet**: 768px - 1199px (optimized layouts)
- **Mobile**: Below 768px (mobile menu, stacked layout)
- **Small Mobile**: Below 480px (minimal padding, adjusted fonts)

## 🔧 JavaScript Architecture

### app.js (Main Application & Quote Browser)

**Key Functions:**
- `initApp()` - Initialize the application and apply saved preferences
- `setupEventListeners()` - Set up all event listeners
- `handleTabChange()` - Handle tab switching
- `switchTab()` - Switch between tabs
- `handlePageNavigation()` - Navigate to Info/Settings/About pages
- `switchToPage()` - Switch to a specific page
- `loadQuotes()` - Load quotes (TODO: Replace with API call)
- `renderQuotes()` - Render quotes to DOM
- `createQuoteCard()` - Generate quote card HTML
- `handleSearch()` - Handle search input
- `handleSort()` - Handle sort selection
- `applyFiltersAndSort()` - Apply all filters and sorting
- `toggleVote()` - Handle upvote/downvote logic
- `handleDarkModeToggle()` - Handle dark mode toggle
- `applyTheme()` - Apply theme to document
- `initSettingsPage()` - Initialize settings page
- `handleResetSettings()` - Reset all settings to defaults
- `handleAccentColorChange()` - Handle accent color selection
- `applyAccentColor()` - Apply accent color to document
- `adjustBrightness()` - Adjust color brightness for dark variant

**Data Structure:**
```javascript
{
    id: 1,
    text: "Quote text...",
    teacher: "Teacher Name",
    subject: "Subject",
    upvotes: 342,
    downvotes: 15,
    date: "2025-01-10",
    userVote: null  // null, 'up', or 'down'
}
```

**State Variables:**
```javascript
let allQuotes = [...dummyQuotes];
let filteredQuotes = [...dummyQuotes];
let currentSortMode = "newest";
let currentSearchQuery = "";
let currentTab = "for-you";
let currentTheme = localStorage.getItem("theme") || "light";
let currentAccentColor = localStorage.getItem("accentColor") || "#4a69bd";
```

### loader.js (Component Loading)

**Key Functions:**
- `loadComponentsAndInit()` - Load HTML partials and initialize app

Handles loading of header, footer, and page components from separate HTML files.

### submit.js (Quote Submission)

**Key Functions:**
- `initSubmitPage()` - Initialize the submit page
- `handleFormSubmit()` - Handle form submission
- `validateForm()` - Validate all form inputs
- `submitQuote()` - Submit quote to backend (TODO)
- `simulateSubmission()` - Simulate submission for testing
- `showSuccess()` - Display success message
- `showError()` - Display error message

## 🎛️ Settings & Customization

### Dark Mode

Enable dark mode via the toggle in the Settings tab:
- All UI elements adapt to dark theme
- Persists across sessions in localStorage
- Smooth transition between light and dark

### Accent Color Customization

Users can choose their preferred accent color in Settings:
- Click a color option to apply it instantly
- All interactive elements use the selected color
- Persists across sessions in localStorage
- 5 preset colors available

### Reset Settings

One-click reset button in Settings:
- Restores light theme
- Restores default blue accent color (#4a69bd)
- Updates all UI elements immediately

## 🔮 Backend Integration (TODO)

The frontend includes clear TODO comments for backend integration:

### Replace Dummy Data (app.js)
```javascript
// TODO: Replace with fetch("/api/quotes") once backend exists
fetch('/api/quotes')
    .then(response => response.json())
    .then(data => {
        allQuotes = data;
        filteredQuotes = [...allQuotes];
        applyFiltersAndSort();
    });
```

### Submit Quote (submit.js)
```javascript
// TODO: Replace with actual backend call once API exists
fetch('/api/quotes/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
```

### Vote on Quote (app.js)
```javascript
// TODO: Send vote to backend
fetch(`/api/quotes/${quoteId}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ voteType: voteType })
});
```

## 🛡️ Security Features

- **XSS Protection**: HTML escaping for user content
- **Input Validation**: Client-side validation on all forms
- **No External Dependencies**: Reduces attack surface
- **Safe DOM Manipulation**: Using textContent and proper escaping

## 📊 Dummy Data

The app includes 8 sample quotes from various teachers and subjects:
- Herr Müller (Mathematik)
- Frau Schmidt (Deutsch)
- Herr Weber (Geschichte)
- Frau Müller (Englisch)
- Herr Fischer (Biologie)
- Frau Kaufmann (Chemie)
- Frau Wagner (Physik)

You can add more sample quotes to the `dummyQuotes` array in `app.js`.

## 🎭 UI/UX Highlights

- **Card-Based Layout**: Easy to scan and read
- **Visual Feedback**: Hover effects, active states, animations
- **Smooth Transitions**: All interactions have smooth animations
- **Accessibility**: Semantic HTML, proper color contrast
- **Mobile-First**: Responsive design that works on all devices
- **Loading States**: Proper feedback during interactions
- **Empty States**: Clear messages when no results found
- **Theme Persistence**: User preferences remembered across sessions
- **Customizable**: Easy to change colors and preferences

## 📝 Code Quality

- **Well-Commented**: Clear JSDoc comments on all functions
- **Modular Structure**: Functions are small and focused
- **Event Delegation**: Efficient event handling
- **State Management**: Clear state variables and updates
- **Error Handling**: Try-catch blocks where appropriate
- **Console Logging**: Debug information for development
- **Separated Concerns**: HTML structure, CSS styling, JS logic

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] User authentication/accounts
- [ ] Quote editing and deletion
- [ ] Category/tag filtering
- [ ] Share quotes on social media
- [ ] Comment system
- [ ] Admin moderation panel
- [ ] Advanced analytics
- [ ] Internationalization (i18n)
- [ ] More accent colors
- [ ] Custom theme creation

## 📄 License

This project is part of Lehrerzitate. All rights reserved.

## 🤝 Contributing

To add new features or improve the frontend:

1. Keep the structure clean and organized
2. Follow the existing code style
3. Add JSDoc comments to new functions
4. Test responsiveness on multiple devices
5. Update this README with any new features
6. Test dark mode and custom colors

## ❓ Troubleshooting

### Page Not Loading
- Ensure the HTTP server is running on the correct port
- Check browser console for errors (F12)
- Verify file paths are correct (relative paths from `html/` folder)

### Quotes Not Displaying
- Check browser console for JavaScript errors
- Verify `app.js` is properly linked in `index.html`
- Clear browser cache and reload

### Form Not Submitting
- Check browser console for validation errors
- Verify all required fields are filled
- Check that `submit.js` is properly linked in `submit.html`

### Dark Mode or Colors Not Working
- Check browser console for errors
- Verify `app.js` is loaded and initialized
- Check localStorage in browser DevTools (F12 → Application)
- Try resetting settings using the Reset button

### Settings Not Persisting
- Ensure localStorage is enabled in your browser
- Check if you're in private/incognito mode (disables localStorage)
- Clear browser cache and reload

## 📞 Support

For issues or questions, check the console logs (F12 → Console) for detailed error messages and debugging information.

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript**
