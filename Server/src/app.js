import express, {json} from 'express'
import morgan from 'morgan'
const app = express()

//ANCHOR importando rutas
import employeeRoute from './routes/employee'
import registerRoute from './routes/register'

//ANCHOR middlewares
app.use(morgan('dev'))
app.use(json())

//ANCHOR construyendo routes
app.use(('/api/empleados'), employeeRoute);
app.use(('/api/registro-adm'), registerRoute);

export default app
