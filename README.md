# MedCon

MedCon is your on-demand healthcare companion, offering seamless online consultations with qualified medical professionals. The application simplifies the process of connecting with doctors virtually, ensuring accessibility and convenience for users.

## Overview

MedCon provides a platform for users to schedule virtual appointments with healthcare professionals, allowing for personalized advice, treatment plans, and secure communication. With a user-friendly interface, the app aims to bridge the gap between patients and medical experts, making healthcare accessible from the comfort of your own space.

### Key Features

- **Virtual Consultations:**
  Connect with licensed doctors and medical professionals for online consultations.

- **Secure and Confidential:**
  Prioritize your privacy with encrypted video calls and secure messaging for confidential communication.

- **User-Friendly Interface:**
  A simple and intuitive interface makes scheduling appointments and accessing healthcare advice straightforward.

- **Timely Reminders:**
  Stay on top of your health with integrated appointment reminders, ensuring you never miss an important consultation.

## Installation

```bash
# Clone the repository
git clone https://github.com/BadgerV/Virtual-med.git

# Change directory to the project
cd Virtual-med

## Install frontend dependencies
cd frontend
npm install

##.env file
cd backend
```

## Configuration

### Environment Variables

This project relies on certain environment variables for configuration. To set up your environment, follow these steps:

1. Locate the `.env.example` file in the root directory of the project.
2. Create a new file named `.env` in the same directory.
3. Open the `.env.example` file and find the necessary keys and their corresponding values.

   ```dotenv
   # Example .env.example file

   DB_URL = URL_MONGODB_RL
   PORT = YOUR_PORT
   APP_NAME = "MedCon"
   APP_ENV = "local"
   APP_SECRET = YOUR-SECRET_AUTH_KEY
   PAYSTACK_PUBLIC_KEY = YOUR_PASTACK_KEY
   SUB_PRICE = 1500
   EMAIL = EMAIL_FOR_NODEMAILER
   PASSWORD = PASSWORD_FOR_NODEMAILER
   ```

## Usage

```bash
# Start the frontend development server
cd frontend
npm run dev

# Go back to the main directory
cd ..

# Start the backend development server
cd backend
npm run dev

# Go back to the main directory
cd ..

## Install backend dependencies
cd backend
npm install
````

## Contribution Guidelines

We welcome contributions to enhance MedCon! If you'd like to contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Ensure your code adheres to the existing coding standards.
4. Submit a pull request with a clear description of your changes.

## License

This project is licensed under the MIT License.

## Contact and Support

For any inquiries or support, please contact: segunfaozan112@gmail.com, virtualmed2023@gmail.com
