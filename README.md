# 📚 EduConnect Pakistan  

> 🚀 A modern **tutoring platform** built with the MERN stack, connecting students and tutors with an easy-to-use interface, **real-time session management**, and an **admin dashboard** for verification and analytics.  

---

## ✨ Features  

### 👩‍🎓 Student Side  
- 🔍 Search tutors by subject, rating, and availability  
- 📅 Book tutoring sessions in real-time  
- 💖 Wishlist to save favorite tutors  
- ⭐ Review & rating system for feedback  
- 📊 Track session history  

### 👨‍🏫 Tutor Side  
- 📝 Profile creation with expertise & availability  
- ✅ Verified by admin before going live  
- 📅 Session management dashboard  
- ⭐ View ratings & reviews  

### 👨‍💼 Admin Side  
- 🔐 Authentication with JWT  
- 👀 Tutor verification system  
- 📊 Analytics dashboard (user growth, active sessions, etc.)  
- ⚠️ Reporting & user management  

---

## 🛠️ Tech Stack  

| **Category**         | **Technologies** |
|-----------------------|------------------|
| **Frontend**         | React, TailwindCSS, ShadCN, Framer Motion |
| **Backend**          | Node.js, Express.js |
| **Database**         | MongoDB (Mongoose ORM) |
| **Authentication**   | JWT, bcrypt |
| **Deployment**       | (Optional: Vercel, Netlify, Render, or Railway) |

---

## 📸 Screenshots  

> *(Add screenshots / GIFs of your UI here)*  

---

## ⚙️ Installation & Setup  

### 1️⃣ Clone the repo  
```bash
git clone https://github.com/AsfandAhmed3/EduConnect.git
cd EduConnect
2️⃣ Backend Setup
bash
Copy code
cd backend
npm install
Create a .env file in /backend and add:

env
Copy code
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/educonnect
JWT_SECRET=your_secret_key
Run the backend:

bash
Copy code
npm run dev
3️⃣ Frontend Setup
bash
Copy code
cd frontend
npm install
npm start
🌌 Project Structure
bash
Copy code
EduConnect/
│── backend/          # Express.js backend APIs
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── controllers/  # Request handlers
│   ├── middleware/   # Auth, admin, etc.
│── frontend/         # React frontend
│   ├── components/   # UI components
│   ├── pages/        # Main pages
│   ├── context/      # State management
│   ├── utils/        # Helpers
📊 Roadmap
 Tutor search & booking system

 Admin verification system

 Review & rating system

 Payment integration 💳

 AI-based tutor recommendations 🤖

🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to open a PR.

📜 License
This project is licensed under the MIT License.

👤 Author
Asfand Ahmed

📧 Email

🔗 LinkedIn

🐙 GitHub
