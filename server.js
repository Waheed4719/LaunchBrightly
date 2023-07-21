const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

app.use(cors());
app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.get('/api', async (_, res) => {
  const data = await axios.get(
    'https://content.launchbrightly.com/lbdemo/baremetrics.json'
  );

  res.send(data.data);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
