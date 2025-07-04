# React Blog with Appwrite

A modern, responsive blog application built with React, Redux, and Appwrite. This application allows users to create, read, update, and delete blog posts with rich text editing capabilities.

## 🚀 Features

- 🔐 User authentication (Register, Login, Logout)
- ✍️ Rich text editor for creating and editing posts
- 📱 Responsive design that works on all devices
- 🔄 Real-time post updates
- 📝 Markdown support for blog content
- 🔍 Filter and search functionality
- 🔒 Protected routes for authenticated users
- 💾 State management with Redux Toolkit
- 🔄 Session persistence with Redux Persist

## 🛠 Tech Stack

- **Frontend**: React 19
- **State Management**: Redux Toolkit
- **Database & Authentication**: Appwrite
- **Styling**: Tailwind CSS
- **Rich Text Editor**: TinyMCE
- **Form Handling**: React Hook Form
- **Routing**: React Router
- **Build Tool**: Vite

## 📦 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Appwrite backend (see setup below)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/react-blog-appwrite.git
cd react-blog-appwrite
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add your Appwrite configuration:

```env
VITE_APPWRITE_URL=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
```

### 4. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 🏗 Project Structure

```
src/
├── appwrite/          # Appwrite service configurations
├── components/        # Reusable UI components
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── routes/            # React Router routes
├── store/             # Redux store configuration
```


## 🙏 Acknowledgments

- [Appwrite](https://appwrite.io/) for the awesome BaaS
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the amazing UI library
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
