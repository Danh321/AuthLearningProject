# AuthLearningProject

## Table of Contents
- [Overview](#overview)
- [Technologies](#technologies)
- [Learning Highlights](#learning-highlights)
- [Security Measures](#security-measures)
- [Development Environment](#development-environment)
- [Conclusion](#conclusion)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
- [PostgreSQL Setup](#postgresql-setup)
- [Google Authentication](#google-authentication)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)
- [About the Author](#about-the-author)

## Overview
The AuthLearningProject is an initiative aimed at exploring web security, particularly focusing on user authentication in web applications. It involves the implementation of robust authentication systems through modern security protocols and techniques.

![Root Page](/screenshots/root.png)

## Technologies
- **OAuth 2.0**: For secure delegated access.
- **Node.js & Express.js**: Server-side frameworks.
- **bcrypt**: For secure password hashing.
- **EJS**: Templating engine to dynamically render HTML.
- **Passport.js**: Authentication middleware for Node.js.
- **Passport-Local**: Strategy for username and password login.
- **Passport-Google-OAuth20**: Strategy for Google OAuth authentication.
- **body-parser**: Middleware for parsing incoming request bodies.
- **PostgreSQL**: Database system used for data storage.
- **dotenv**: Module to load environment variables from a `.env` file.
- **express-session**: Middleware for managing user sessions.

## Learning Highlights
- Implementing bcrypt for password security.
- Managing user sessions.
- OAuth integration for third-party authentication.
- Secure handling of environment variables.

## Security Measures
- Using `.env` for sensitive configurations.
- Input validation against malicious data.
- Data integrity through HTTPS.

## Development Environment
- **Git**: For version control.
- **GitHub**: Repository hosting and collaboration.

## Conclusion
This project was a hands-on experience in creating a secure authentication system, delving into essential security aspects of modern web development.

## Getting Started

### Prerequisites
- Node.js
- npm (included with Node.js)
- Git

### Setup Instructions
1. **Clone the Repo**:
git clone https://github.com/Danh321/AuthLearningProject.git
2. **Enter Directory**:
cd AuthLearningProject
3. **Environment Variables**:
- Create a `.env` file in the root.
- Add:
  ```
  DATABASE_URI=<your_database_uri>
  SESSION_SECRET=<your_session_secret>
  OAUTH_CLIENT_ID=<your_oauth_client_id>
  OAUTH_CLIENT_SECRET=<your_oauth_client_secret>
  ```
- Replace placeholders with actual values.
4. **Start Server**:
npm start
Access at `localhost:3000`.

## PostgreSQL Setup
This project uses PostgreSQL as its database system. Follow these steps to set up PostgreSQL for the project:
### Installing PostgreSQL
1. **Download PostgreSQL**: Visit the [official PostgreSQL download page](https://www.postgresql.org/download/) and download the version suitable for your operating system.
2. **Install PostgreSQL**: Follow the installation instructions provided on the download page or in the installer.

### Setting Up the Database
1. **Start PostgreSQL**: Open the PostgreSQL application to start the PostgreSQL server.
2. **Create a New Database**: Use the PostgreSQL command line or a GUI like pgAdmin to create a new database for the project.

### Configuring the Project
1. **Update Environment Variables**: In your project's `.env` file, set the `DATABASE_URI` to your PostgreSQL database URI.
DATABASE_URI=postgresql://username:password@localhost:5432/your_database_name
Replace `username`, `password`, and `your_database_name` with your actual credentials and database name.
2. **Run Database Migrations (if applicable)**: If your project uses migrations, run them to set up your database schema.

### Troubleshooting
- If you encounter any issues, refer to the PostgreSQL documentation or the FAQs on their website for troubleshooting.

## Google Authentication
To enable Google authentication:
- Visit Google Developers Console.
- Create or select a project.
- In "APIs & Services" > "Credentials," create an OAuth client ID.
- Select "Web application" type.
- Add `http://localhost:3000` and `http://localhost:3000/auth/google/callback` to respective fields.
- Generate Client ID and Secret, and add to your `.env` file:
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>

## Usage
1. **Start the Server**:
npm start
Access the application at `localhost:3000`.
2. **Navigate to the Application**:
Open a web browser and go to `http://localhost:3000` to interact with the application.

## Screenshots

![Register Page](/screenshots/register.png)
**Register Page**: Users can sign up using personal details or Google account.

![Login Page](/screenshots/login.png)
**Login Page**: Login with credentials or Google account.

![Submit Page](/screenshots/submit.png)
**Submit Page**: A form for content submission.

![Secrets Page](/screenshots/secrets.png)
**Secrets Page**: Access exclusive content post-authentication.

## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact

For inquiries or collaboration, feel free to reach out via GitHub:
Email: [147574241+Danh321@users.noreply.github.com](mailto:147574241+Danh321@users.noreply.github.com)

## Acknowledgments
Inspired by Dr. Angela Yu/Udemy's "The Complete 2023 Web Development Bootcamp"

## About the Author

Danny is a dynamic junior full stack web developer, leveraging an extensive background in trades and safety management to bring a unique perspective to the tech industry. As a dual Red Seal holder in Millwright and Welding, Danny has developed an acute sense of problem-solving, precision, and adaptability, skills that are invaluable in the meticulous world of coding.

His experience as an Occupational Health and Safety (OHSE) Advisor, complemented by an NCSO certification, has ingrained in him the critical importance of regulatory compliance and risk management. Danny applies this meticulous attention to detail and procedural adherence to web development, ensuring that solutions are not only innovative but also robust and compliant with best practices.

Driven by a commitment to lifelong learning and an enthusiasm for embracing new challenges, Danny is dedicated to crafting secure, efficient, and user-centric applications in the realm of full stack web development. His journey from the trades to tech exemplifies his ability to adapt, learn, and excel, making him a valuable asset in the ever-evolving landscape of web technology.
