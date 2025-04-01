# Saathiverse

SaathiVerse is a cutting-edge social media platform designed to connect people through short-form content and real-time interactions. Share your thoughts, moments, and creativity with the world in an engaging and intuitive environment.

## Features

### Phase 1: Core Functionality

- [x] User registration and authentication
   - [x] Register
      - [x] Password encryption
      - [x] Register API
      - [x] Register Form
    - [x] Login
        - [] Profile creation and customization
        - [x] Email Based multi-user Login
        - [x] Password verification
        - [x] Login API
        - [x] Login Form
        - [x] Generate Token

- [ ] Admin view
    - [ ] Profile page
    - [ ] Post creation (text, up to 280 characters)
    - [ ] News feed displaying posts from followed users
    - [] Like and comment on posts
    - [] Follow/unfollow other users

## Getting Started

To get started with SaathiVerse, follow these steps:

1. Clone the repository
2. Install dependencies for both client and server:
   ```
    cd client 
    npm install
    npm run dev

    cd server
    npm install
    npm run dev
   ```

Both the client and server can be started using the `npm run dev` command in their respective directories.

## Technologies and Packages Used

### Client-side (Next.js)
- Next.js: React framework for building web applications
- React: JavaScript library for building user interfaces
- @nextui-org/react: UI component library for React
- Radix UI: Unstyled, accessible components for React
- Formik: Form library for React
- Yup: JavaScript schema validation library
- Recharts: Composable charting library for React
- Framer Motion: Animation library for React
- Tailwind CSS: Utility-first CSS framework

### Server-side (Node.js)
- Express.js: Web application framework for Node.js
- MongoDB: NoSQL database for storing user data and posts
- Mongoose: MongoDB object modeling for Node.js
- Socket.io: Real-time bidirectional event-based communication
- JSON Web Token (JWT): Secure transmission of information between parties as a JSON object

### Development Tools
- ESLint: JavaScript linting tool
- Prettier: Code formatter
- Jest: JavaScript testing framework
- Supertest: HTTP assertions for testing Node.js HTTP servers


