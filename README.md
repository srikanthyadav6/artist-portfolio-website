# Artist Portfolio Website

A modern, high-performance portfolio website designed for artists to showcase their work. Built with **React**, **Vite**, and **Sanity.io**.

![Homepage Preview](./public/vite.svg) <!-- Replace with actual screenshot later if available -->

## ✨ Features

*   **Dynamic Gallery**: Fetches painting data dynamically from Sanity CMS with filtering capabilities (Oil, Acrylic, Watercolor).
*   **Immersive Detail View**: Modal-based painting details with keyboard navigation (Arrow keys, Esc) and deep linking.
*   **Premium Visuals**: Custom "Premium Dark" and "Premium Light" themes with glassmorphism effects, smooth transitions, and micro-animations.
*   **Theme Switching**: User-controlled Light/Dark mode with system preference detection and persistence.
*   **CMS Integration**: Fully managed content via Sanity Studio (Paintings, Artist Profile, Site Settings).
*   **Contact Form**: Functional contact form powered by Web3Forms.
*   **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop.
*   **SEO Optimized**: Dynamic metadata and structured content.

## 🛠️ Technology Stack

*   **Frontend**: React 18, Vite
*   **Styling**: Vanilla CSS (Variables, Flexbox/Grid), Lucide React (Icons)
*   **CMS**: Sanity.io (Headless CMS)
*   **Forms**: Web3Forms
*   **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd artist-portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    VITE_SANITY_PROJECT_ID=your_project_id
    VITE_SANITY_DATASET=production
    VITE_WEB3FORMS_ACCESS_KEY=your_access_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 🎨 Content Management (Sanity)

This project uses Sanity.io for content management.

1.  **Enter the Studio directory:**
    ```bash
    cd artist-portfolio
    ```

2.  **Install Studio dependencies:**
    ```bash
    npm install
    ```

3.  **Run Sanity Studio locally:**
    ```bash
    npm run dev
    ```

## 📦 Deployment

The project is optimized for deployment on **Vercel**.

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Add the Environment Variables in the Vercel dashboard.
4.  Deploy!

## 📄 License

This project is licensed under the MIT License.
