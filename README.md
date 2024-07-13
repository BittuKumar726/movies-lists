# Frontend README

## Description

This is a front-end application built using React.js, JavaScript, HTML, and CSS. It leverages Tailwind CSS for styling, various icon libraries for UI components, Axios for making HTTP requests, and Redux Toolkit for state management. The project is bootstrapped with Vite for fast development and build.

## Prerequisites

- Node.js (v12 or higher)
- npm or yarn

## Installation

1. Clone the repository:
    ```sh
    git clone <repository_url>
    cd <repository_directory>
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

3. Create a `.env` file in the root directory and add the following environment variable:
    ```
    VITE_API_URL=<your_api_url>
    ```

## Usage

1. To start the development server:
    ```sh
    npm run dev
    # or
    yarn run dev
    ```

The application will start and be accessible at `http://localhost:3000` (default port).

## Technologies Used

- **React.js**: JavaScript library for building user interfaces.
- **JavaScript**: Programming language for web development.
- **HTML**: Standard markup language for creating web pages.
- **CSS**: Style sheet language used for describing the presentation of a document.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Lucide React**: Icon library for React.
- **React Feather**: Collection of simply beautiful open-source icons for React.
- **React Avatar**: Library for creating avatar images.
- **React Hook Form**: Performant, flexible, and extensible forms with easy-to-use validation.
- **Axios**: Promise-based HTTP client for making requests to the API.
- **Redux**: State management library for JavaScript applications.
- **Redux Toolkit**: Official, recommended way to write Redux logic.
- **Vite**: Next generation frontend tooling.

## Environment Variables

Ensure you have the following environment variable set in your `.env` file:

- `VITE_API_URL`: The base URL of your backend API.

## Important Notes

- Replace `<your_api_url>` in the `.env` file with your actual API URL.
- Make sure your backend server is running if your frontend depends on it.

