create database iocl_chemical_form;

CREATE TABLE iocl_chemical_form.chemical_form (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE,
  unit VARCHAR(255),
  chemical VARCHAR(255),
  uom VARCHAR(100),
  sapcode VARCHAR(100),
  opening DECIMAL(10,2),
  receive DECIMAL(10,2),
  consumption DECIMAL(10,2),
  closing DECIMAL(10,2),
  sapbalance DECIMAL(10,2),
  remarks TEXT
);

select * from iocl_chemical_form.chemical_form;