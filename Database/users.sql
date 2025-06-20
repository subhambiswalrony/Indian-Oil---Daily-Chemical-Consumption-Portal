CREATE TABLE iocl_chemical_form.users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    password VARCHAR(255),
    created_at TIMESTAMP,
    plain_password VARCHAR(100)
);
