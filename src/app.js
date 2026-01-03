// Importación de dependencias
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Configuración de variables de entorno
dotenv.config();

// Importación de rutas
import builderRoute from './routes/builder.route.js';

// Clase App
class App {
    // Atributos
    app;
    port; 
    urlBase;

    // Inicializacion de atributos
    constructor() {
        this.app = new express();
        this.port = process.env.PORT || 3000;
        this.urlBase = `/api/pdf/builder`;
        this.middlewares();
        this.urls = {
            builder: `${this.urlBase}`
        }
        this.routes();
    }

    middlewares = () => {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
            message: 'Too many requests from this IP, please try again in 15 minutes'
        }));

        if(process.env.NODE_ENV === 'development') {
            this.app.use(morgan('dev'));
            console.log('Morgan enabled for environment development');
        }
    }

    routes = () => {
        this.app.use(this.urls.builder, builderRoute);
    }

    start = () => {
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
            console.log(`API available at http://localhost:${this.port}${this.urlBase}`);
        });
    }
}

export default new App();