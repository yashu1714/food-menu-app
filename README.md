
# 🍽️ Food Menu App with User Authentication (React + Firebase)

A modern and responsive Food Recipe application built using **React.js**, **Firebase Authentication**, **Firestore**, and **TheMealDB API**.  
The app allows users to explore recipes, apply filters, search meals, view detailed instructions, and securely save favorites with user-specific cloud storage.

---

## 🚀 Live Demo  
**GitHub Repository:** https://github.com/yashu1714/food-menu-app

---

## 🎯 Features

### 🔐 Authentication  
- Email & Password Login  
- Google Sign-In (OAuth)  
- Reset Password via Email  
- Protected Routes (Favorites page locked for guests)  
- Automatic session handling with Firebase  

### 🍽️ Recipe Features  
- Search any recipe (e.g., Pizza, Chicken, Biryani)  
- Filter by Category, Area, or Ingredients  
- Detailed modal with instructions + ingredients  
- Add / Remove favorites  
- Favorites stored in **Firestore**  
- Offline sync using **LocalStorage**  

### 🎨 UI / UX  
- Modern and clean UI  
- Fully responsive  
- Dark / Light mode toggle  
- Toast notifications  
- Heart animation for favorites  
- Smooth transitions & shadows  

---

## 🖼️ Screenshots

### 🔐 Login Page  
![Login Page](https://github.com/yashu1714/food-menu-app/raw/main/Login%20page.png)

### 🍽️ Home Page  
![Home Page](https://github.com/yashu1714/food-menu-app/raw/main/Home%20page.png)

### ❤️ Favorites Page  
![Favorites Page](https://github.com/yashu1714/food-menu-app/raw/main/Favorite%20page.png)

---

## 🛠️ Tech Stack

### **Frontend**
- React.js  
- JavaScript (ES6+)  
- HTML5  
- CSS3  
- React Router  
- React Toastify  

### **Backend / Cloud**
- Firebase Authentication  
- Firebase Firestore  

### **API**
- TheMealDB REST API  

### **Tools**
- Git & GitHub  
- VS Code  
- Vite  

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/yashu1714/food-menu-app.git
cd food-menu-app
```

### 2️⃣ Install dependencies  
```bash
npm install
```

### 3️⃣ Setup Firebase  
Update `src/firebase.js` with your Firebase config.

### 4️⃣ Start the development server  
```bash
npm run dev
```

---

## 🔐 Firestore Security Rules  
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /favorites/{userId} {
      allow read, write: if request.auth != null 
                         && request.auth.uid == userId;
    }
  }
}
```

---

## 📁 Folder Structure  
```
food-menu-app/
 ├── public/
 ├── src/
 │   ├── components/
 │   ├── context/
 │   ├── pages/
 │   ├── App.jsx
 │   ├── firebase.js
 │   └── main.jsx
 ├── package.json
 ├── README.md
 └── .gitignore
```

---

## 👨‍💻 Author  
**N Yaswanth**  
Frontend Developer  

🔗 GitHub: https://github.com/yashu1714  
🔗 LinkedIn: https://www.linkedin.com/in/nellore-yaswanth-30b9902a0

---
