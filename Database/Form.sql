CREATE TABLE chemical_form (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  date DATE,
  unit VARCHAR(100),
  chemical VARCHAR(255),
  uom VARCHAR(50),
  sapcode VARCHAR(100),
  opening DECIMAL(10,2),
  receive DECIMAL(10,2),
  consumption DECIMAL(10,2),
  closing DECIMAL(10,2),
  sapbalance DECIMAL(10,2),
  remarks TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Foreign Key Constraint
  FOREIGN KEY (user_id) REFERENCES iocl_chemical_form.users(id) ON DELETE CASCADE
);
