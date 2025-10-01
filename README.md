# 🏨 Hotel-Mountain-Mirage

 <img src="https://img.shields.io/github/stars/mukeshlilawat1/Hotel-Mountain-Mirage?style=social" alt="GitHub Stars" />
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Spring Boot](https://img.shields.io/badge/Backend-Spring_Boot-blue)
![React](https://img.shields.io/badge/Frontend-ReactJS-blue)
![AWS](https://img.shields.io/badge/Deploy-AWS-yellow)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)

---

## ✨ Overview

Hotel-Mountain-Mirage is a **full-stack hotel booking and management web application** built with React.js (Frontend) and Spring Boot (Backend). It integrates secure authentication using Spring Security with JWT and is deployed using AWS services. This project demonstrates real-world development skills including role-based access control, RESTful API design, and secure cloud deployment. 🌄

---

## 🚀 Features

- Room booking with availability check ✔️
- Authentication & Authorization (JWT, Spring Security) 🔐
- Role-based access control (Admin/User) 🛡️
- CRUD operations for room management 🏠
- REST API integration (Spring Boot) 🛠️
- PostgreSQL database support 🗄️
- Cloud deployment with AWS S3 ☁️
- Responsive UI with React ⚡
- Maven build support 📦

---

## 🧩 Tech Stack

| Frontend   | Backend      | Database   | Cloud    | Security    |
|------------|-------------|------------|----------|-------------|
| ReactJS    | Spring Boot | PostgreSQL | AWS S3   | JWT         |
|            | Maven       |            |          | Spring Sec. |

---

## 🗺️ Project Structure
- Hotel-Mountain-Mirage/
- │ ├── backend/ # Spring Boot source, controllers, services
- │ ├── frontend/ # ReactJS client SPA
- │ ├── .vscode/ # Editor configs
- │ └── .idea/ # JetBrains configs


---

## 📦 Getting Started

### Prerequisites

- Java 17+
- Node.js & npm
- Maven
- PostgreSQL database

### Steps

1. **Clone the repo**  
   `git clone https://github.com/mukeshillawat1/Hotel-Mountain-Mirage.git`  

2. **Backend (Spring Boot):**  
   - Configure `application.properties` for DB & JWT secrets  
   - Run:  
     `mvn spring-boot:run`

3. **Frontend (ReactJS):**  
   - `cd Hotel-Mountain-Mirage/frontend`
   - `npm install`
   - `npm start`

4. **Access Local App:**  
   - Frontend: `http://localhost:3000`  
   - Backend: `http://localhost:8080`  

---

## 🛠️ API Endpoints

| Endpoint           | Method | Description         |
|--------------------|--------|--------------------|
| /rooms             | GET    | List rooms         |
| /rooms             | POST   | Add room           |
| /rooms/{id}        | PUT    | Update room        |
| /rooms/{id}        | DELETE | Remove room        |
| /auth/login        | POST   | Login (JWT)        |
| /bookings/check    | GET    | Check availability |

---

## 👤 Contributors

- Mukesh lilawat ☀️

---

## ❤️ Acknowledgements

- Spring Boot community
- ReactJS community
- AWS, PostgreSQL docs

---

## 📄 License

This project is licensed under the MIT License.

---

## 🎉 Screenshots

> _Add screenshots/GIFs of key UI features for extra points!_

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📚 Resources

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [ReactJS Docs](https://reactjs.org/)
- [AWS S3 Docs](https://docs.aws.amazon.com/s3/)
- [Markdown Emoji Full List](https://gist.github.com/rxaviers/7360908)

---

> _Star ⭐ this repo if you find it useful!_


  

