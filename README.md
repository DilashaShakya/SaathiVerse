# 🐧 SaathiVerse

SaathiVerse is a cozy social media platform where you can share your thoughts, photos, and feelings with friends — and react with penguins. Built with Next.js, Node.js, Express, and MongoDB. Saathi stands for friends. Penguins are actually a great symbol of friendship, which makes them a very fitting mascot for SaathiVerse (since saathi means friend). 🐧

---

## Screenshots

### Login Page
<!-- Add screenshot here -->
![Login Page](image.png)
![Register Page] image.png

---

### Dashboard / Home Feed
<!-- Add screenshot here -->
![Dashboard] image.png
image.png

---

### Creating a Post (with Photo + Feeling)
<!-- Add screenshot here -->
![Post Creation](./screenshots/post-creation.png)

---

### Penguin Reactions
<!-- Add screenshot here -->
![Reactions] image.png

---

### Calendar Page
<!-- Add screenshot here -->
![Calendar](./screenshots/calendar.png)

---

## Features

### Authentication
- [x] User registration with password encryption (bcrypt)
- [x] Email-based login
- [x] JWT token generation
- [x] Persistent login across page refreshes (localStorage + Redux)

### Posts & Feed
- [x] Rich text post creation (bold, italic, underline via TipTap editor)
- [x] Photo upload with drag-and-drop
- [x] Post with a feeling/mood (12 moods with emojis)
- [x] Post without text (image-only or feeling-only)
- [x] Feed shows posts from all users, newest first
- [x] Each post shows the correct author name
- [x] Delete your own posts

### Reactions & Engagement
- [x] Like / unlike posts (with live count)
- [x] Penguin reactions — Love, Cool, No, Sad, Celebrate
- [x] Reaction summary shows which penguins were used and how many
- [x] Comments on posts (with live count)
- [x] Press Enter to submit a comment

### Calendar
- [x] Click a date to auto-fill the event form
- [x] Add multiple events per day
- [x] Delete individual events
- [x] Events sorted chronologically
- [x] Dot indicator on calendar dates that have events

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/SaathiVerse.git
   cd SaathiVerse
   ```

2. Set up the server:
   ```bash
   cd server
   npm install
   ```

3. Create a `.env` file in the `server/` folder:
   ```
   MONGO_URI=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret
   ```

4. Set up the client:
   ```bash
   cd ../client
   npm install
   ```

### Running the App

Open two terminals:

**Terminal 1 — Server:**
```bash
cd server
npm run dev
```
Server runs at `http://localhost:8000`

**Terminal 2 — Client:**
```bash
cd client
npm run dev
```
Client runs at `http://localhost:3000`

---

## Tech Stack

### Frontend
| Package | Purpose |
|---|---|
| Next.js 15 | React framework with App Router |
| Tailwind CSS | Utility-first styling |
| Redux Toolkit | Global state management |
| TipTap | Rich text editor |
| React Dropzone | Drag-and-drop file uploads |
| Axios | HTTP requests |
| Formik + Yup | Form handling and validation |
| Sonner | Toast notifications |
| shadcn/ui | UI component library |
| date-fns | Date formatting |
| Lucide React | Icons |

### Backend
| Package | Purpose |
|---|---|
| Express.js | Web server framework |
| MongoDB + Mongoose | Database and ODM |
| Multer | File/image upload handling |
| bcrypt | Password hashing |
| JSON Web Token | Auth tokens |
| dotenv | Environment variables |
| cors | Cross-origin requests |
| nodemon | Auto-restart in development |

---

## Project Structure

```
SaathiVerse/
├── client/                  # Next.js frontend
│   └── src/
│       ├── app/
│       │   ├── login/       # Login page
│       │   ├── register/    # Register page
│       │   └── users/
│       │       ├── dashboard/   # Home feed
│       │       ├── calendar/    # Calendar page
│       │       └── details/     # User details
│       ├── components/      # Shared UI components
│       └── lib/
│           └── redux/       # Store, slices
│
└── server/                  # Express backend
    ├── controllers/         # Route handlers
    ├── models/              # Mongoose schemas
    ├── routes/              # API routes
    ├── db/                  # DB connection
    └── uploads/             # Uploaded images
```

---

## API Endpoints

| Method | Route | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Login and receive JWT |
| GET | `/posts` | Get all posts (newest first, with author) |
| POST | `/posts` | Create a new post (supports image upload) |
| DELETE | `/posts/:id/:userId` | Delete own post |
| PATCH | `/posts/:id/like` | Toggle like on a post |
| PATCH | `/posts/:id/react` | Add/change/remove penguin reaction |
| POST | `/posts/:id/comment` | Add a comment to a post |

---

Made with 🐧 and lots of pink.
