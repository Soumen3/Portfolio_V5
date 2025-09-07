# Portfolio V5 - Soumen Samanta
Hello everyone!  
Let me introduce myself, I'm **Soumen Samanta**, a Full Stack Developer specializing in Python, Django, React.js, and modern web technologies. On this occasion, I'd like to share my portfolio website project that showcases my journey as a developer.

**Tech Stack used:**  
- ReactJS  
- Tailwind CSS  
- AOS (Animate On Scroll)
- Appwrite (Backend as a Service)
- Framer Motion  
- Lucide Icons
- Material UI  
- SweetAlert2
- DotLottie React (for animations)
- React Router DOM
- Vite (Build tool)

**Key Features:**
- 🎨 Modern and responsive design with dark theme
- ✨ Smooth animations and interactive elements
- 📱 Mobile-first responsive layout
- 🚀 SEO optimized with meta tags and structured data
- 💼 Dynamic portfolio showcase with real-time data
- 📧 Contact form integration
- 🎭 Interactive welcome screen with loading animation
- 🖱️ Custom smokey cursor effect
- 🌟 Progressive Web App (PWA) ready

**Website Link:**  
[https://soumen.vercel.app/](https://soumen.vercel.app/)

**Social Links:**
- GitHub: [https://github.com/Soumen3](https://github.com/Soumen3)
- LinkedIn: [https://www.linkedin.com/in/soumen-samanta-029aaa239/](https://www.linkedin.com/in/soumen-samanta-029aaa239/)
- Instagram: [https://www.instagram.com/soumen.programmer/](https://www.instagram.com/soumen.programmer/)

We would appreciate it if you decide to use this project. Please include credit when using it. Thank you! 🙏

---

# Tutorial: Running the Project  

Here's a simple guide to run this project.  

## Prerequisites  

Ensure that you have already installed:  
- **Node.js** (v16 or higher)
- **npm** or **yarn**

---

## Steps to Run the Project  

1. **Download this project:**  

   ```bash  
   git clone https://github.com/Soumen3/Portfolio_V5.git  
   ```  

2. **Navigate to project directory:**

   ```bash
   cd Portfolio_V5
   ```

3. **Install all dependencies:**  

   ```bash  
   npm install  
   ```  
   Or use:  

   ```bash  
   npm install --legacy-peer-deps  
   ```  

4. **Set up environment variables:**
   
   Create a `.env` file in the root directory and add your Appwrite configuration:
   
   ```env
   VITE_APPWRITE_URL=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_PROJECT_COLLECTION_ID=your_project_collection_id
   VITE_APPWRITE_CERTIFICATE_COLLECTION_ID=your_certificate_collection_id
   VITE_APPWRITE_BUCKET_ID=your_bucket_id
   ```

5. **Run the project:**  

   ```bash  
   npm run dev  
   ```  

6. **Open in browser:**  

   Access the application through the link displayed in your terminal (usually `http://localhost:5173`).  

---

## Creating a Production Build  

To create a production-ready build:  

1. Run the build command:  

   ```bash  
   npm run build  
   ```  

2. Preview the build locally:

   ```bash
   npm run preview
   ```

3. The build files will be saved in the `dist` folder. You can upload this folder to your hosting server.  

---

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create optimized production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks
- `npm run seo:check` - Display SEO checklist

---

## Notes  

If you encounter issues while running the project, ensure that:  
- Node.js is correctly installed.  
- You're in the correct project directory.  
- All dependencies are installed without errors.
- Environment variables are properly configured.  

---

## Appwrite Configuration  

To configure Appwrite for this project, follow these steps:  

1. **Create an Appwrite Account:**  
   - Go to [Appwrite Console](https://cloud.appwrite.io/).  
   - Create a new project.  

2. **Set up Database:**  
   - Create a new database.
   - Create two collections: `projects` and `certificates`.
   - Configure attributes for each collection based on your data structure.

3. **Configure Storage:**  
   - Create a storage bucket for uploading images.
   - Set appropriate permissions for file access.

4. **Get Configuration Details:**  
   - Copy your project ID, database ID, collection IDs, and bucket ID.
   - Update your `.env` file with these values.

5. **Set Permissions:**  
   - Configure read/write permissions for your collections and storage.
   - Ensure public read access for displaying data.

---

## Project Structure

```
Portfolio_V5/
├── public/              # Static assets, PWA files
├── src/
│   ├── components/      # Reusable UI components
│   ├── Pages/          # Main page components
│   ├── contexts/       # React contexts for state management
│   ├── conf/           # Configuration files
│   └── assets/         # Static assets
├── index.html          # Entry HTML file with SEO tags
└── package.json        # Dependencies and scripts
```

---

## Features Implemented

- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **SEO Optimization** - Meta tags, structured data, sitemap.xml
- ✅ **Progressive Web App** - Service worker and manifest.json
- ✅ **Dynamic Content** - Real-time data fetching from Appwrite
- ✅ **Smooth Animations** - AOS library and Framer Motion
- ✅ **Interactive Elements** - Custom cursor, loading screens
- ✅ **Performance Optimized** - Code splitting and lazy loading

---

## Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Creating pull requests
- Improving documentation

## License

This project is open source. Please include appropriate credit when using it.

---

**Created with ❤️ by Soumen Samanta**
