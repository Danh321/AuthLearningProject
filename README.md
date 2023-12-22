# AuthLearningProject

## Project Overview
The AuthLearningProject is an educational venture into the world of web security, with a focus on user authentication mechanisms within web applications. It showcases the implementation of robust authentication systems using modern security protocols and techniques.

![Root Page](/screenshots/root.png)

## Technologies Used
- **OAuth 2.0**: Authorization framework for secure delegated access.
- **Node.js & Express.js**: Server-side application framework.
- **bcrypt**: Password hashing library for secure password storage.

## Key Concepts Learned
- Password Security with bcrypt.
- Session Management for user sessions.
- Integration of third-party Authentication via OAuth.
- Secure handling of Environment Variables.

## Security Practices
- Use of `.env` files for configuration settings.
- Input Validation to protect against malicious input.
- Ensuring data integrity with HTTPS.

## Development Tools
- **Git**: For version control and maintaining a clean commit history.
- **GitHub**: For hosting the repository and collaboration.

## Conclusion and Reflection
This project served as a practical exercise in building a secure authentication system, providing a comprehensive look into the security considerations necessary for modern web development.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js
- npm (comes with Node.js)
- Git

### Installation

1. **Clone the repository:**
   git clone https://github.com/Danh321/AuthLearningProject.git

2. **Navigate to the project directory:**
    cd AuthLearningProject

3. **Set up environment variables:**
Create a .env file in the root directory and fill it with your environment variables:

    DATABASE_URI=your_database_uri
    SESSION_SECRET=your_session_secret
    OAUTH_CLIENT_ID=your_oauth_client_id
    OAUTH_CLIENT_SECRET=your_oauth_client_secret

Replace the placeholders with your actual data. Do not commit this file to your public repository.

4. **Start the server:**
    npm start

Access the application through localhost:3000 on your browser.

### Usage

1. **Start the server:**

    npm start

This will start the application, and you can access it through your web browser at http://localhost:3000.

2. **Access the Application:**
Open your web browser and navigate to http://localhost:3000 to access the application.

Access the application through localhost:3000 on your browser.

![Register Page](/screenshots/register.png)
Register Page: This page allows users to create a new account by providing their necessary information, including username and password. Users can also choose to register using their Google account, making the registration process even more convenient.

![Login Page](/screenshots/login.png)
Login Page: Users can log in to their existing accounts on this page by entering their registered credentials. Additionally, they have the option to log in using their Google account, providing a quick and secure way to access the application's features.

![Submit Page](/screenshots/submit.png)
Submit Page: This page provides users with a form to submit content or information to the application. It might be used for various purposes, such as posting updates or sharing content.

![Secrets Page](/screenshots/secrets.png)
Secrets Page: The Secrets Page is where users can access and view protected or exclusive content within the application. It's the destination for users who have successfully authenticated and logged in.
