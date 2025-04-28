const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const swaggerOptions = require('./config/swaggerOptions');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Book routes
app.use('/api/books', bookRoutes);


app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not Found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
