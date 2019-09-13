import express, {json} from 'express'
import morgan from 'morgan'
const app = express()

//ANCHOR importando rutas
import rutaEmpleado from './routes/empleado'

//ANCHOR middlewares
app.use(morgan('dev'))
app.use(json())

//ANCHOR construyendo routes
app.use(('/api/empleados'), rutaEmpleado);

export default app
