const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

// Import delle route
const typesRoutes = require('./routes/types');
const universitiesRoutes = require('./routes/universities');
const coursesRoutes = require('./routes/courses');
const courseUniversityRoutes = require('./routes/courseUniversityRoutes');

// Prefissi API
app.use('/api/types', typesRoutes);
app.use('/api/universities', universitiesRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/course-university', courseUniversityRoutes);

// Test endpoint (opzionale)
app.get('/', (req, res) => {
  res.send('Reach17 API attiva!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server attivo su http://localhost:${PORT}`);
});
