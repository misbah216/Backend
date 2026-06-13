const app = require('./src/app');

// Add a basic health check route
app.get('/', (req, res) => {
    res.json({ message: 'Server is working!', status: 'ok' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

module.exports = app;
