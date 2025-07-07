const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cron = require('node-cron');
const axios = require('axios');
//Routes
const SummitRoutes = require('./routes/SummitRoutes');
const UserRoutes = require('./routes/UserRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();
connectDB();

const app = express();

app.use('/api/summit', SummitRoutes);
app.use('/api/user', UserRoutes);

app.use(cors());
app.use(bodyParser.json());

const SELF_URL = 'https://your-app-name.onrender.com/ping';

app.get('/ping', (req, res) => {
  res.send('pong');
});

// Ping every 14 minutes
cron.schedule('*/1 * * * *', async () => {
  try {
    await axios.get(SELF_URL);
    console.log('Self-pinged to stay awake');
  } catch (err) {
    console.error('Ping failed:', err.message);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
