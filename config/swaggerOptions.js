const swggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const PORT = process.env.PORT || 3000;


const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: "Books API",
			version: "1.0.0",
			description: "simple API to mange Books",
		},
		servers: [{ url: `http://localhost:${PORT}` }],
	},
  apis: ['./routes/*.js']
};

module.exports = swaggerOptions;