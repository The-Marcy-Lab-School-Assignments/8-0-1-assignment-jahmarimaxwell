const express = require('express');
const app = express();

// Import the path module to construct the absolute path to the static assets folder
const path = require('path');

// Construct the absolute path to the static assets folder using the `path.join()` method
// Use '../' to navigate to a parent directory, similar to when you are using `cd`.
// corrected path to vite/react project
const pathToDistFolder = path.join(__dirname, '../jahmari-8-0-1-assignment/dist');

// Create the middleware function for serving static assets
const serveStatic = express.static(pathToDistFolder);

// Middleware function for logging route requests
const logRoutes = (req, res, next) => {
    const time = new Date().toLocaleString();
    console.log(`${req.method}: ${req.originalUrl} - ${time}`);
    next(); // Passes the request to the next middleware/controller
  };
  
  // Controller function for serving a hello message
  const serveHello = (req, res, next) => {
    const name = req.query.name || "stranger";
    res.send(`Hello, ${name}!`);
  };
  
  // Register the logRoutes middleware globally to log all requests
  app.use(logRoutes);
  
  // Register the serveHello controller for the /api/hello route
  app.get('/api/hello', serveHello);

// Use the middleware function to serve static assets
app.use(serveStatic);

const port = 8080;

// arguments taken for '.listen'
// port and function
app.listen(port, () => {
    // indicating server is listening
    console.log(`Server is running on http://localhost:${port}`)
});