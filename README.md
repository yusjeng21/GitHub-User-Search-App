# GitHub User Search App

A responsive web application that allows users to search for GitHub profiles and view public account information using the GitHub API.

## Features

- Search for any GitHub user by username
- View profile information including:
  - Avatar
  - Name
  - Username
  - Bio
  - Join date
  - Public repositories count
  - Followers count
  - Following count
  - Location
  - Twitter/X username
  - Website/Blog
  - Company
  - Recent repositories

- Dark mode and light mode support
- Responsive user interface
- Loading and error states

## Technologies Used

- React
- Vite
- JavaScript (ES6+)
- Tailwind CSS
- GitHub REST API

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yusjeng21/github-user-search-app.git
```

2. Navigate to the project directory:

```bash
cd github-user-search-app
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and visit:

```text
http://localhost:5173
```

## Usage

1. Enter a GitHub username in the search bar.
2. Click the **Search** button.
3. View the user's public profile information.
4. View the user's most recent repositories
5. Switch between light and dark mode using the theme toggle.

## API

This project uses the GitHub Users API:

```text
https://api.github.com/users/{username}
```

## Future Improvements

- Save preferred theme in local storage
- Search on Enter key and button click improvements
- Add recent search history
- Improve accessibility
- Add skeleton loading states

## Screenshots

![Desktop screenshot](GitHub-User-App-Light.png)
![Desktop screenshot](GitHub-User-App-Dark.png)
![Mobile Screeshot](GitHub-User-App-Light-Mobile.png)
![Mobile Screeshot](GitHub-User-App-Dark-Mobile.png)

## Live Demo

https://github-user-search.vercel.app

## Author

Yusupha Jeng
