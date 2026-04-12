 🎓 College Event Management System

A web-based application to manage college campus events. Built as a DBMS mini project.

---

## 👥 Team Members

| Name | Role |
|------|------|
| Varsha Poojary | Frontend Developer |
| Vijaya G Nayak | Backend Developer (PHP) |
| Trisha Shetty | Database (MySQL) |
| Sumitra Nayak | Testing & Documentation |

---

## 🚀 Features

- ✅ Add new college events with name, type, date, time, venue and status
- ✅ View all events with beautiful cards
- ✅ Filter events by Upcoming / Ongoing / Completed
- ✅ Filter by category (Concert, Festival, Workshop, etc.)
- ✅ Search events by name or type
- ✅ Register for upcoming events
- ✅ Delete events
- ✅ Data stored permanently in MySQL database

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | PHP |
| Database | MySQL |
| Server | XAMPP (Apache + MySQL) |

---

## 📁 Project Structure

```
college-event-management/
├── index.html              ← Main page
├── style.css               ← Styling
├── script.js               ← Frontend logic
├── api/
│   ├── get_events.php      ← Fetch all events
│   ├── add_event.php       ← Add new event
│   └── delete_event.php    ← Delete event
└── README.md
```

---

## 🗄️ Database Setup

**Database name:** `college_events`

```sql
CREATE DATABASE college_events;

USE college_events;

CREATE TABLE events (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  name    VARCHAR(100) NOT NULL,
  type    VARCHAR(50),
  date    DATE,
  time    TIME,
  status  VARCHAR(20),
  venue   VARCHAR(150)
);
```

---

## ⚙️ How to Run

### Prerequisites
- XAMPP installed (for PHP + MySQL)
- OR Node.js + MySQL

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/Varsha-Poojary13/college-event-management.git
```

2. **Set up the database**
- Open phpMyAdmin at `http://localhost/phpmyadmin`
- Run the SQL from Database Setup section above

3. **Place project in XAMPP**
- Copy project folder to `C:/xampp/htdocs/`

4. **Start XAMPP**
- Start Apache and MySQL in XAMPP Control Panel

5. **Open in browser**
```
http://localhost/college-event-management
```

---

## 📡 API Endpoints

| Method | File | Description |
|--------|------|-------------|
| GET | `api/get_events.php` | Fetch all events |
| POST | `api/add_event.php` | Add a new event |
| GET | `api/delete_event.php?id=1` | Delete event by ID |

---

## 📸 Screenshots

> Add screenshots of your project here after completion!

---

## 📝 Notes

- Make sure XAMPP Apache and MySQL services are running before opening the app
- Database credentials should be updated in the PHP connection file
- All 4 team members must pull latest code before making changes using `git pull`

---

*DBMS Mini Project — NMAM Institute of Technology*
