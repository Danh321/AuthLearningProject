# loginLearn

## Introduction
**loginLearn** is a web application that allows users to share their secrets anonymously. The platform provides a safe space for individuals to express themselves without the fear of being judged or identified. This project focuses on user authentication and secure handling of sensitive information, employing robust encryption and modern authentication techniques.

## Features
- User registration and authentication.
- Google OAuth 2.0 integration for quick sign-in.
- Encrypted password storage using bcrypt.
- Ability to post secrets anonymously.
- Responsive design for a seamless experience on various devices.

## Technologies
- **Node.js** as the runtime environment.
- **Express.js** for the server framework.
- **EJS** for templating and generating HTML markup.
- **PostgreSQL** for the relational database management system.
- **Passport.js** for handling user authentication.
- **Bcrypt** for hashing and securing user passwords.
- **dotenv** for managing environment variables.

## Installation
Before running this application, make sure that Node.js and PostgreSQL are installed on your system.

1. Clone the repository:
2. Navigate to the project directory:
3. Install the necessary dependencies:
4. Create a `.env` file in the root directory with your database credentials and other configuration details.

## Usage
After logging in or registering, users are redirected to the secrets page. Authenticated users can submit their secrets anonymously. For detailed usage instructions, refer to the Project Structure section below.

## Project Structure
- `app.js`: The entry point of the application, setting up the server, middleware, routing, and database connection.
- `views/`: Directory containing EJS templates for HTML rendering.
- `public/`: Contains static assets like stylesheets, JavaScript files, and images.
- `config/`: Configuration files for the database and authentication strategies.
- `controllers/`: Contains business logic for request handling.
- `models/`: Data models for the application.

## Database Setup
To set up the database, follow these steps:
1. Create a new PostgreSQL database.
2. Use the `db.sql` script provided to create the necessary tables.

## Contributions
Contributions are welcome. Please follow the fork and pull request workflow.

## License
This project is licensed under the MIT License. For more details, see the LICENSE file.
<<<<<<< HEAD

=======
>>>>>>> 142af5113562321c65fb9bd2b2de78f1aa18cd84
