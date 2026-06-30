# 🛒 Market List App (Front-end)

A responsive (Web and Mobile) market list management application integrated with a REST API featuring JWT authentication. The app allows users to create lists, manage products internally (add and remove items), and share the final list content directly via WhatsApp.

To access the app online you can check: https://esthervbac.github.io/market-list-app/ or

## 🚀 Technologies Used

- **React** (with Hooks for state management)
- **Vite** (Fast and modern frontend build tool)
- **TypeScript** (Static typing for robust and safer code)
- **Tailwind CSS v4** (Responsive styling optimized natively via CSS variables)
- **Axios** (HTTP communication and automated JWT Token management via Interceptors)
- **Lucide React** (Clean and modern icon set)

---

## 📱 Features

- **Secure Authentication:** A login screen integrated with the API that securely stores and manages the JWT token in `localStorage`.
- **Lists Dashboard:** View, create (`POST /shopping-list`), and delete (`DELETE /shopping-list/:id`) entire shopping lists.
- **Item Management:** Dynamically add and remove products along with their quantities inside a selected list, syncing in real-time with the database via `PUT /shopping-list/:id`.
- **Responsive Design:** Fully adaptable layout tailored for desktops, tablets, and smartphones (Mobile-First approach).
- **WhatsApp Integration:** A feature to format the shopping list text and send it directly to WhatsApp contacts or groups.

---

## 🛠️ Prerequisites

Before you begin, make sure you have installed on your machine:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**

---

## 🔧 Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/esthervbac/market-list-app.git
   cd your-frontend-repository
   ```
1. Install the dependencies:

```bash
    npm install
```

2. Configure Environment Variables:
   Create a .env file in the root directory of the project and add your API URL (local or hosted on Render) using Vite's mandatory prefix:

```bash
    VITE_API_URL=https://api-crud-market-list.onrender.com
```

3. Start the development server:
   Create a .env file in the root directory of the project and add your API URL (local or hosted on Render) using Vite's mandatory prefix:

```bash
    npm start
```

## 📦 Available Scripts

Inside the package.json file, you can run the following commands:

```bash
    npm start
```

or

```bash
    npm run dev
```

Starts Vite's local development server.

```bash
    npm run build
```

Compiles and builds the optimized production version of the project (TypeScript + Vite Build).

```bash
    npm run preview
```

Runs the locally built production files for testing purposes before deployment.

## 🗺️ Project Structure

```text
src/
├── api/
│   └── client.ts       # Axios setup + automated JWT Token Interceptor
├── components/
│   ├── Login.tsx       # Authentication screen
│   ├── Dashboard.tsx   # Dashboard displaying all shopping lists
│   └── ListDetails.tsx # Internal items controller and WhatsApp integration
├── App.tsx             # Main dynamic screen/route orchestrator
├── index.css           # Tailwind v4 main entry point (@import "tailwindcss")
└── main.tsx            # React initialization entry point

```

## 🔒 Back-end Integration

This project consumes an Express API that handles the following REST routes:
(The API repository on github is: https://github.com/esthervbac/api-crud-market-list)

- POST /login - User authentication and Token generation.
- GET /shopping-list - Retrieves all saved shopping lists.
- POST /shopping-list - Creates a brand new list.
- GET /shopping-list/:id - Fetches the details and items of a specific list.
- PUT /shopping-list/:id - Updates the list by overwriting the items array.
- DELETE /shopping-list/:id - Permanently deletes a specific list.
