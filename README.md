# 🎉 Event Management Booking System

A full-stack web application that allows users to browse, book, and manage event tickets — with a complete admin dashboard for event management.

---

## 🧰 Technologies Used

### 🔧 Backend (Hosted on Monster Server)
- ASP.NET Core Web API (.NET 8)
- Entity Framework Core (Code First + SQL Server)
- JWT-based Authentication
- Role-based Authorization (UserRole, AdminRole)
- Deployed API On Monster Server base URL: `https://eventsys.runasp.net/`

### 🎨 Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Bootstrap 5 (for responsive UI)
- Hosted via Live Server / Static Hosting (e.g., GitHub Pages or Vercel)

---

## 🔐 Authentication APIs

| Function | Endpoint |
|---------|----------|
| Register | `POST /api/Authentication/Register` |
| Login | `POST /api/Authentication/Login` |
| Logout | `POST /api/Authentication/Logout` |
| Confirm Email | `POST /api/Authentication/Confirm-Email` |
| Forgot Password | `POST /api/Authentication/Forgot-Password` |
| Reset Password | `POST /api/Authentication/Reset-Password` |
| Resend Email Confirmation OTP | `POST /api/Authentication/Resend-EmailConfirmation-Otp` |
| Resend Password Reset OTP | `POST /api/Authentication/Resend-PasswordReset-Otp` |

---

##  Event APIs

| Function | Endpoint |
|---------|----------|
| Create | `POST /api/Events` |
| Update | `PUT /api/Events/{id}` |
| Delete | `Delete /api/Events/{id}` |
| Get All Events | `GET /api/Events` |
| Get Event By Id | `GET /api/Events/{id}` |

---

## Booking APIs

| Function | Endpoint |
|---------|----------|
| Book | `POST /api/Bookings/{eventId}/{userId}` |
| UnBook | `Delete /api/Bookings/{eventId}/{userId}` |

---

## 🧑‍💼 Roles

- **AdminRole**:
  - Access to full CRUD on events
  - Admin Dashboard (`admin-dashboard.html`)
  - Access Control via JWT role claim

- **UserRole**:
  - Browse and book events
  - View booking status
  - Authentication-protected pages

---

## 🧑‍💻 Features

### 🔓 Authentication Screens
- Register with Name, Email, Password, and Phone
- Login and Logout
- Confirm Email with OTP
- Forgot & Reset Password flows
- Styled with warm colors for a welcoming UX

### 🏠 Home Page (`home.html`)
- Displays events in a responsive grid
- Shows "Book Now" button for available events
- Marks already booked events as "Booked"

### 📄 Event Details Page (`event-details.html`)
- Shows full event info: Name, Description, Category, Date, Venue, Price, Image
- Includes "Book Now" and "Cancel Booking" actions
- Redirects to Congratulations page after booking

### 🧑‍🏫 Admin Dashboard (`admin-dashboard.html`)
- View all events in a table
- Create, Update, and Delete events
- Accessible only to users with `AdminRole`
- Role-based access redirects non-admin users

### 📋 Event Form (`event-form.html`)
- Used for both Create and Update
- Auto-detects `id` query param to switch between modes
- Upload image, set date/time, venue, and price

---

## 📂 Project Structure

```bash
📁 Frontend/
├── login.html
├── register.html
├── confirm-email.html
├── forgot-password.html
├── reset-password.html
├── home.html
├── event-details.html
├── admin-dashboard.html
├── event-form.html
├── js/
│   ├── login.js
│   ├── register.js
│   ├── confirm-email.js
│   ├── forgot-password.js
│   ├── reset-password.js
│   ├── home.js
│   ├── event-details.js
│   ├── admin-dashboard.js
│   └── event-form.js
```
```bash
📁 Backend/
├── core/
│   ├── Domain
│       ├── Contracts
│       ├── Entities
│       └── Exceptions
│   ├── Services
│   ├── Services.Abstractions
├── Infrastructure
│   ├── Persistanc
│       ├── Data
│       ├── Migrations
│       └── Repositories
│   ├── Presentation
├── Booking.API
└── Shared
```


## 🚀 Running the Project Locally
1. Clone the repo

2. Serve frontend with Live Server

3. Ensure backend is hosted or run locally using dotnet run

4. Use browser dev tools to inspect token and debug as needed


## 📦 Future Improvements
* Add pagination to events

* Add image preview before upload

* Add booking history page

* Add search & filter by category/date

* Implement ticket download (PDF)


## 👤 Author
* Developed by [Mahmoud]

* Powered by .NET + Bootstrap + Vanilla JS


## 🏁 License
This project is licensed under the MIT License.
