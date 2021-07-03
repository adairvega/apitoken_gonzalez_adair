const express = require('express');
const cors = require('cors');
import morgan from 'morgan';
import pkg from '../package.json'
import userroutes from "./routes/user.routes";
import authroutes from "./routes/auth.routes";

const app = express();

require('../db/connection');

app.set('pkg', pkg);

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


// Welcome
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    });
});

// Routes
app.use("/api/auth",authroutes);
app.use("/api/user",userroutes);

export default app;