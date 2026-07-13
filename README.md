<h1 align="center">Zenxone Living</h1>

<p align="center">
A Modern Full Stack Hostel & Property Management Platform
</p>

<p align="center">

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5-brightgreen)
![React](https://img.shields.io/badge/React-18-61DAFB)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1)
![JWT](https://img.shields.io/badge/Security-JWT-success)
![REST API](https://img.shields.io/badge/API-REST-blue)

</p>

---

> **A modern Full Stack Hostel & Property Management Platform built using Spring Boot, React, MySQL, JWT Authentication, and REST APIs.**

---

---

## Project Overview

Zenxone Living is a full-stack web application developed to simplify hostel and paying guest (PG) management through a secure and user-friendly digital platform.

The application provides a responsive public website for customers and a secure administrative dashboard for managing hostel operations efficiently.

Users can browse available properties, view room availability, submit enquiries, schedule visits, and complete online bookings, while administrators can manage properties, rooms, students, bookings, payments, and customer enquiries from a centralized dashboard.

The project follows a layered Spring Boot architecture with a React frontend and MySQL database, making it scalable, maintainable, and suitable for real-world hostel management.

---

## Key Features

### Public Website

- Responsive modern user interface
- Property listing and room information
- Amenities and gallery
- Pricing details
- Customer enquiry form
- Visit scheduling
- Online booking workflow
- Authentication and Login
- Dark mode support

### Admin Dashboard

- Dashboard Analytics
- Property Management
- Room & Bed Management
- Student Management
- Booking Management
- Payment Management
- Lead Management
- Visit Management
- Employee Management
- CRUD Operations
- Secure JWT Authentication

---

## Tech Stack

| Category           | Technologies                                                                              |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **Frontend**       | React 18, Vite, React Router DOM, Axios, Bootstrap 5, CSS3, Framer Motion, React Toastify |
| **Backend**        | Java 21, Spring Boot, Spring Security, Spring Data JPA, Hibernate                         |
| **Database**       | MySQL                                                                                     |
| **Authentication** | JWT (JSON Web Token)                                                                      |
| **API**            | REST APIs                                                                                 |
| **Documentation**  | Swagger (Springdoc OpenAPI)                                                               |
| **Tools**          | VS Code, Maven, Git, GitHub, Postman                                                      |

---

## System Architecture

```text
                    +----------------------+
                    |   React Frontend     |
                    +----------+-----------+
                               |
                         REST APIs (HTTP)
                               |
                    +----------v-----------+
                    | Spring Boot Backend  |
                    +----------+-----------+
                               |
                     Spring Security (JWT)
                               |
                    +----------v-----------+
                    |     MySQL Database   |
                    +----------------------+
```

## Project Structure

```
zenxone-living
│
├── zenxone-backend
│   ├── src
│   ├── pom.xml
│   └── mvnw
│
├── zenxone-frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Application Screenshots

## Home Page

![Home Page](zenxone-frontend/src/assets/images/home-page.png)

---

## Login Page

![Login Page](zenxone-frontend/src/assets/images/login-page.png)

---

## Properties Page

![Properties Page](zenxone-frontend/src/assets/images/properties-page.png)

---

## Booking Page

![Booking Page](zenxone-frontend/src/assets/images/booking-page.png)

---

## Admin Dashboard

![Admin Dashboard](zenxone-frontend/src/assets/images/admin-dashboard.png)

---

## Property Management

![Property Management](zenxone-frontend/src/assets/images/property-management.png)

---

## Room Management

![Room Management](zenxone-frontend/src/assets/images/room-management.png)

---

## Student Management

![Student Management](zenxone-frontend/src/assets/images/student-management.png)

---

## Booking Management

![Booking Management](zenxone-frontend/src/assets/images/booking-management.png)

---

## Payment Management

![Payment Management](zenxone-frontend/src/assets/images/payment-management.png)

---

## Lead Management

![Lead Management](zenxone-frontend/src/assets/images/lead-management.png)

---

## Visit Management

![Visit Management](zenxone-frontend/src/assets/images/visit-management.png)

---

## Security Features

- JWT Authentication
- Protected Admin Routes
- Role-Based Authorization
- Secure Password Storage
- Environment Variables for Sensitive Credentials

---

## Major Modules

- Authentication
- Property Management
- Room Management
- Student Management
- Booking Management
- Payment Management
- Lead Management
- Visit Management
- Dashboard Analytics
- File Upload Management

---

## Getting Started

### Clone Repository

```bash
git clone https://github.com/niranjanhr27/zenxone-living.git
```

### Backend

```bash
cd zenxone-backend
mvn spring-boot:run
```

### Frontend

```bash
cd zenxone-frontend
npm install
npm run dev
```

---

## Environment Variables

Create the required environment variables before running the backend.

```
DB_PASSWORD=your_database_password

JWT_SECRET=your_jwt_secret

MAIL_USERNAME=your_email

MAIL_PASSWORD=your_email_password
```

For the frontend, create a `.env` file:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## API Documentation

After running the backend, Swagger UI is available at:

```
http://localhost:8080/api/swagger-ui.html
```

---

## Future Enhancements

- Cloud Storage Integration
- Online Payment Gateway
- Email Notifications
- SMS Notifications
- Admin Reports & Analytics
- Mobile Application
- Docker Deployment
- AWS Cloud Deployment

---

## Project Note

Zenxone Living was developed as a full-stack hostel and property management platform to digitize day-to-day hostel operations through a secure and user-friendly web application.

The project demonstrates modern full-stack development practices, including RESTful APIs, JWT Authentication, role-based access control, responsive frontend design, database integration, and layered backend architecture using Spring Boot and React.

This repository is maintained for educational and portfolio purposes to showcase practical software engineering skills and real-world application development.

---

## Developer

### Niranjan H R

**Java Full Stack Developer | Electronics & Communication Engineering Graduate**

Passionate about building scalable full-stack web applications using Java, Spring Boot, React, and MySQL. Interested in developing secure, user-friendly, and real-world software solutions.

- **GitHub:** https://github.com/niranjanhr27
- **LinkedIn:** https://www.linkedin.com/in/niranjanhr27

---
