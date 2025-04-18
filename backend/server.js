const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const tipologiaRoutes = require('./routes/tipologiaRoutes');
const corsoRoutes = require('./routes/corsoRoutes');
const ateneoRoutes = require('./routes/ateneoRoutes');
const corsoAteneoRoutes = require('./routes/corsoAteneoRoutes');

// Tipologia Routes
app.use('/api/tipologie', tipologiaRoutes);

// Corso Routes
app.use('/api/corsi', corsoRoutes);

// Ateneo Routes
app.use('/api/atenei', ateneoRoutes);

// Corso-Ateneo Routes
app.use('/api/corso-ateneo', corsoAteneoRoutes);

// Home Route
app.get('/', (req, res) => {
  res.send('Reach17 API is running 🚀');
});

// Avvio server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
