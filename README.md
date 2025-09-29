# AI Journal

A personal web-based journal application where users can write entries and receive AI-generated responses powered by Google Gemini.

## Features

- **User Authentication**

## Development

### Backend Development
```bash
cd backend
bun run dev         # Start development server with watch mode
bun run type-check  # Run TypeScript type checking
bun run build       # Compile TypeScript
```

### Frontend Development
```bash
cd frontend
bun run dev         # Start Vite development server
bun run build       # Build for production
bun run preview     # Preview production build
bun run lint        # Run ESLint
```

### TypeScript Features
- **Full Type Safety**: Comprehensive type definitions for all API endpoints
- **Enhanced IDE Support**: IntelliSense, autocomplete, and refactoring
- **Compile-time Error Detection**: Catch errors before runtime
- **Better Documentation**: Self-documenting code with interfaces

### Building for Production
```bash
cd frontend
bun run build
```ion and login with JWT tokens
- **Enhanced Password Security**: Complex password requirements with real-time validation
- **Journal Writing**: Create personal journal entries with a clean, intuitive interface
- **AI Responses**: Get thoughtful, personalized responses from Google Gemini 2.0 Flash
- **Entry History**: View and browse all your past journal entries and AI responses
- **Dark/Light Themes**: Toggle between beautiful neumorphism themes
- **TypeScript**: Full type safety for better development experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Backend
- **Bun** - Fast JavaScript runtime and package manager
- **TypeScript** - Type-safe JavaScript development
- **Express.js** - Web server framework 
- **SQLite** - Lightweight database for storing users and journal entries
- **JWT** - JSON Web Tokens for secure authentication
- **bcrypt** - Password hashing for security
- **Google Gemini AI** - AI-powered response generation

### Frontend
- **React** with **TypeScript** - Type-safe React development
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Context API** - State management for authentication and theming
- **CSS3** - Neumorphism design with dark/light theme support

## Project Structure

```
AI-journal-chatbox/
├── backend/
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── models/
│   │   └── database.ts          # SQLite database setup
│   ├── routes/
│   │   ├── auth.ts              # Authentication endpoints
│   │   └── journal.ts           # Journal entry endpoints
│   ├── middleware/
│   │   └── auth.ts              # JWT authentication middleware
│   ├── server.ts                # Express server setup
│   ├── tsconfig.json            # TypeScript configuration
│   ├── package.json             # Backend dependencies
│   └── .env.example             # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── types/
│   │   │   └── index.ts         # TypeScript type definitions
│   │   ├── components/
│   │   │   ├── Navigation.tsx   # Navigation component
│   │   │   └── ThemeToggle.tsx  # Theme toggle component
│   │   ├── pages/
│   │   │   ├── AuthPage.tsx     # Login/Register page
│   │   │   ├── JournalPage.tsx  # Write journal entry page
│   │   │   └── EntriesPage.tsx  # View past entries page
│   │   ├── AuthContext.tsx      # Authentication context
│   │   ├── ThemeContext.tsx     # Theme management context
│   │   ├── api.ts               # API service functions
│   │   ├── App.tsx              # Main React component
│   │   ├── main.tsx             # React app entry point
│   │   └── index.css            # Global styles with neumorphism
│   ├── tsconfig.json            # TypeScript configuration
│   ├── tsconfig.node.json       # Node-specific TypeScript config
│   └── package.json             # Frontend dependencies
└── README.md                    # This file
```

## Installation & Setup

### Prerequisites
- Bun (v1.0 or higher) - [Install Bun](https://bun.sh)
- Google Gemini API key

### 1. Clone the Repository
```bash
git clone https://github.com/Ciugiu/AI-journal-chatbox.git
cd AI-journal-chatbox
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create environment file:
```bash
cp .env.example .env
```

Edit the `.env` file and add your configuration:
```env
PORT=5000
JWT_SECRET=your_super_secure_jwt_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

**Getting a Gemini API Key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env` file

### 3. Frontend Setup

Navigate to the frontend directory:
```bash
cd ../frontend
```

Install dependencies:
```bash
bun install
```

### 4. Running the Application

#### Start the Backend Server
From the `backend` directory:
```bash
bun run dev
```
The backend server will start on `http://localhost:5000`

#### Start the Frontend Development Server
From the `frontend` directory (in a new terminal):
```bash
bun run dev
```
The frontend will start on `http://localhost:5173`

## Usage

1. **Register**: Create a new account with your email and password
2. **Login**: Sign in to access your personal journal
3. **Write Entry**: Share your thoughts, feelings, or experiences
4. **Get AI Response**: Receive personalized insights and encouragement from the AI
5. **View History**: Browse all your past entries and AI responses

## API Endpoints

### Authentication
- `POST /auth/register` - Create new user account
- `POST /auth/login` - Authenticate user and return JWT token

### Journal
- `POST /journal` - Create new journal entry (requires authentication)
- `GET /journal` - Get user's journal entries (requires authentication)

## Database Schema

### Users Table
- `id` - Primary key
- `email` - Unique user email
- `password` - Hashed password
- `created_at` - Account creation timestamp

### Journal Entries Table
- `id` - Primary key
- `user_id` - Foreign key to users table
- `entry_text` - User's journal entry
- `ai_response` - AI-generated response
- `created_at` - Entry creation timestamp

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: API endpoints are protected with authentication middleware
- **Input Validation**: Server-side validation for all user inputs

## Development

### Backend Development
```bash
cd backend
bun run dev         # Start development server with watch mode
bun run type-check  # Run TypeScript type checking
bun run build       # Compile TypeScript
```

### Frontend Development
```bash
cd frontend
bun run dev         # Start Vite development server
bun run build       # Build for production
bun run preview     # Preview production build
bun run lint        # Run ESLint
```

### TypeScript Features
- **Full Type Safety**: Comprehensive type definitions for all API endpoints
- **Enhanced IDE Support**: IntelliSense, autocomplete, and refactoring
- **Compile-time Error Detection**: Catch errors before runtime
- **Better Documentation**: Self-documenting code with interfaces

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `JWT_SECRET` - Secret key for JWT token signing
- `GEMINI_API_KEY` - Google Gemini API key

## Troubleshooting

### Common Issues

1. **"Failed to fetch" errors**: Make sure both backend and frontend servers are running
2. **AI responses not working**: Verify your Gemini API key is correct and has quota remaining
3. **Authentication issues**: Check that JWT_SECRET is set in your `.env` file
4. **Database errors**: The SQLite database will be created automatically on first run
5. **TypeScript errors in VS Code**: Try restarting the TypeScript language server (Ctrl+Shift+P → "TypeScript: Restart TS Server")
6. **Import resolution issues**: Clear node_modules and reinstall with `bun install`
5. **TypeScript errors in VS Code**: Try restarting the TypeScript language server (Ctrl+Shift+P → "TypeScript: Restart TS Server")
6. **Import resolution issues**: Clear node_modules and reinstall with `bun install`

### Port Conflicts
If you need to change the default ports:
- Backend: Change `PORT` in `.env` file
- Frontend: The API base URL is set in `frontend/src/api.ts`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please create an issue in the repository or contact the development team.