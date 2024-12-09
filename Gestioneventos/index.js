const express = require('express'); 
const mysql = require('mysql2');   
const bodyParser = require('body-parser'); 
const cors = require('cors');  

const app = express();
app.use(bodyParser.json()); 
app.use(cors()); 


const db = mysql.createConnection({
    host: 'localhost',       
    user: 'root',            
    password: 'password', 
    database: 'gestion_eventos' 
});


db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// Endpoints RESTful para "Eventos"

// GET /eventos
app.get('/eventos', (req, res) => {
    db.query('SELECT * FROM Eventos', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// POST /eventos
app.post('/eventos', (req, res) => {
    const { nombre, descripcion, fecha, cupo } = req.body;
    db.query('INSERT INTO Eventos (nombre, descripcion, fecha, cupo) VALUES (?, ?, ?, ?)',
        [nombre, descripcion, fecha, cupo], (err) => {
            if (err) throw err;
            res.json({ message: 'Evento creado' });
        });
});

// PUT /eventos/:id
app.put('/eventos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, fecha, cupo } = req.body;
    db.query('UPDATE Eventos SET nombre = ?, descripcion = ?, fecha = ?, cupo = ? WHERE id = ?',
        [nombre, descripcion, fecha, cupo, id], (err) => {
            if (err) throw err;
            res.json({ message: 'Evento actualizado' });
        });
});

// DELETE /eventos/:id
app.delete('/eventos/:id', (req, res) => {
    const { id } = req.params;

    
    db.query('DELETE FROM Reservas WHERE evento_id = ?', [id], (err) => {
        if (err) throw err;

        
        db.query('DELETE FROM Eventos WHERE id = ?', [id], (err) => {
            if (err) throw err;
            res.json({ message: 'Evento y reservas eliminados' });
        });
    });
});

// Endpoints RESTful para "Reservas"

// POST /reservas
app.post('/reservas', (req, res) => {
    const { evento_id, nombre_usuario, email, numero_plazas } = req.body;

    
    db.query('SELECT cupo FROM Eventos WHERE id = ?', [evento_id], (err, results) => {
        if (err) throw err;
        
        
        if (results[0].cupo < numero_plazas) {
            return res.status(400).json({ message: 'No hay suficientes plazas disponibles' });
        }

        
        db.query('INSERT INTO Reservas (evento_id, nombre_usuario, email, numero_plazas) VALUES (?, ?, ?, ?)',
            [evento_id, nombre_usuario, email, numero_plazas], (err) => {
                if (err) throw err;

                db.query('UPDATE Eventos SET cupo = cupo - ? WHERE id = ?', [numero_plazas, evento_id], (err) => {
                    if (err) throw err;
                    res.json({ message: 'Reserva creada y cupo actualizado' });
                });
            });
    });
});

// DELETE /reservas/:id
app.delete('/reservas/:id', async (req, res) => {
    const { id } = req.params;

    try {
        
        const [results] = await db.promise().query('SELECT numero_plazas, evento_id FROM Reservas WHERE id = ?', [id]);
        
        
        if (results.length === 0) {
            console.log('Reserva no encontrada');
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        const numeroPlazas = results[0].numero_plazas; 
        const eventoId = results[0].evento_id; 

        console.log(`Reserva a eliminar: ID ${id}, Número de plazas: ${numeroPlazas}, Evento ID: ${eventoId}`);

        
        const [eventResults] = await db.promise().query('SELECT cupo FROM Eventos WHERE id = ?', [eventoId]);
        if (eventResults.length === 0) {
            console.log('Evento no encontrado');
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        const currentCupo = eventResults[0]?.cupo || 0;
        console.log(`Cupo actual del evento: ${currentCupo}`);

        
        const [deleteResults] = await db.promise().query('DELETE FROM Reservas WHERE id = ?', [id]);
        
        if (deleteResults.affectedRows === 0) {
            console.log('No se eliminó ninguna reserva');
            return res.status(404).json({ message: 'No se encontró la reserva para eliminar' });
        }

        const newCupo = currentCupo + numeroPlazas;
        await db.promise().query('UPDATE Eventos SET cupo = ? WHERE id = ?', [newCupo, eventoId]);

        console.log(`Cupo actualizado para el evento ID ${eventoId}: ${newCupo} plazas disponibles`);
        res.json({ message: 'Reserva eliminada y cupo actualizado', updatedCupo: newCupo });

    } catch (err) {
        console.error('Error en la operación:', err);
        res.status(500).json({ message: 'Error en la operación' });
    }
});

// GET /reservas/:evento_id
app.get('/reservas/:evento_id', (req, res) => {
    const { evento_id } = req.params;
    const { estado } = req.query;
    let query = 'SELECT * FROM Reservas WHERE evento_id = ?';
    const params = [evento_id];

    if (estado) {
        query += ' AND estado = ?';
        params.push(estado);
    }

    db.query(query, params, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// PUT /reservas/:id/estado
app.put('/reservas/:id/estado', (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    const estadosValidos = ['pendiente', 'confirmada', 'cancelada'];

    if (!estadosValidos.includes(estado)) {
        return res.status(400).json({ message: 'Estado inválido' });
    }

    db.query('UPDATE Reservas SET estado = ? WHERE id = ?', [estado, id], (err) => {
        if (err) throw err;
        res.json({ message: 'Estado de reserva actualizado' });
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
