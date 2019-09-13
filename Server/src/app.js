import express, {json} from 'express'
import morgan from 'morgan'

//ANCHOR importando rutas
import rutaEmpleado from './routes/empleado'
const app = express()

//ANCHOR middlewares
app.use(morgan('dev'))
app.use(json())

//ANCHOR construyendo routes
app.use(('/api/empleados'), rutaEmpleado);
export default app
