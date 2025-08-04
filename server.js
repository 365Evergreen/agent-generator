const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.post('/api/generate-demo', (req, res) => {
  const { companyName, priorities, userName } = req.body;
  res.send(`Demo generated for ${userName} at ${companyName} with priorities: ${priorities}`);
});

app.listen(port, () => {
  console.log(`Mock server listening at http://localhost:${port}`);
});