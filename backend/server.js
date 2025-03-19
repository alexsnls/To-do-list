const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000;


const pool = new Pool({
  user: 'postgres',      
  host: 'localhost',
  database: 'todo_app',  
  password: 'post1234', 
  port: 5432,
});


pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error connecting to PostgreSQL:', err.message);
  }
  console.log('Successfully connected to PostgreSQL database');
  
  
  client.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err, res) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table is ready');
    }
  });
  
  release();
});

app.use(cors());
app.use(express.json());


app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});


app.post('/api/tasks', async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});


app.put('/api/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, completed } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), completed = COALESCE($3, completed) WHERE id = $4 RETURNING *',
      [title, description, completed, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});


app.delete('/api/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});