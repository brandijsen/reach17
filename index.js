const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Reach17 backend è attivo!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});
