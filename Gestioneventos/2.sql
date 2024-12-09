CREATE TABLE Eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha DATE NOT NULL,
    cupo INT NOT NULL
);

CREATE TABLE Reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    evento_id INT NOT NULL,
    nombre_usuario VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    numero_plazas INT NOT NULL,
    estado ENUM('pendiente', 'confirmada', 'cancelada') DEFAULT 'pendiente',
    FOREIGN KEY (evento_id) REFERENCES Eventos(id)
);
INSERT INTO Eventos (nombre, descripcion, fecha, cupo)
VALUES ('Concierto Rock', 'Concierto al aire libre', '2024-12-15', 100);
INSERT INTO Reservas (evento_id, nombre_usuario, email, numero_plazas)
VALUES (1, 'Juan Pérez', 'juan@example.com', 2);


