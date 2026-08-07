CREATE TABLE bookings (
    id char(22) NOT NULL PRIMARY KEY,
    date_and_time DATETIME NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);