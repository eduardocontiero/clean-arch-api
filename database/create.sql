CREATE DATABASE IF NOT EXISTS orders_clean_arch;

USE orders_clean_arch;

CREATE TABLE item (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    category TEXT,
    description TEXT,
    price DECIMAL(10,2),
    width INT,
    height INT,
    length INT,
    weight DECIMAL(10,2)
);

INSERT INTO item (category, description, price, width, height, length, weight) VALUES 
('Música', 'CD', 30, 30, 30, 10, 0.5),
('Vídeo', 'DVD', 50, 40, 20, 10, 0.5),
('Vídeo', 'VHS', 10, 40, 20, 10, 0.5),
('Instrumentos Musicais', 'Guitarra', 1000, 100, 30, 10, 3),
('Instrumentos Musicais', 'Amplificador', 5000, 100, 50, 50, 20),
('Acessórios', 'Cabo', 30, 10, 10, 10, 0.9);

CREATE TABLE coupon (
    code TEXT,
    percentage DECIMAL(5,2),
    expire_date TIMESTAMP,
    PRIMARY KEY (code(100))
);

INSERT INTO coupon (code, percentage, expire_date) VALUES 
('VALE20', 20, '2023-10-10 10:00:00'),
('VALE20_EXPIRED', 20, '2020-10-10 10:00:00');

CREATE TABLE `order` (
    id_order INT AUTO_INCREMENT PRIMARY KEY,
    coupon TEXT,
    code TEXT,
    cpf TEXT,
    issue_date TIMESTAMP,
    freight DECIMAL(10,2),
    sequence INT
);

CREATE TABLE order_item (
    id_order INT,
    id_item INT,
    price DECIMAL(10,2),
    quantity INT,
    PRIMARY KEY (id_order, id_item)
);

CREATE TABLE stock_entry (
    id_stock_entry INT AUTO_INCREMENT PRIMARY KEY,
    id_item INT,
    operation TEXT,
    quantity INT,
    date TIMESTAMP
);