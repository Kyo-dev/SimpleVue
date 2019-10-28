import express, {json} from 'express'
import morgan from 'morgan'
const app = express()

//ANCHOR importando rutas
import userRoute from './routes/users'
import permitsRoute from './routes/permits'
import bonusRoute from './routes/salaryBonus'
import misconduct from './routes/misconduct'
import salaryIncreaseRoute from './routes/salaryIncrease'
import taskRoute from './routes/task'
import holidayRoute from './routes/holiday'
import overtime from './routes/overtime'
import payroll from './routes/payroll'

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

//ANCHOR middlewares
app.use(morgan('dev'))
app.use(json())


//ANCHOR construyendo routes
app.use(('/api/usuarios'), userRoute)
app.use(('/api/usuarios'), permitsRoute)
app.use(('/api/usuarios'), bonusRoute)
app.use(('/api/usuarios'), misconduct)
app.use(('/api/usuarios'), salaryIncreaseRoute)
app.use(('/api/usuarios'), taskRoute)
app.use(('/api/usuarios'), holidayRoute)
app.use(('/api/usuarios'), overtime)
app.use(('/api/usuarios'), payroll)

// app.use(('/api/registro-adm'), registerRoute)
// app.use(('/api/login'), loginRoute)

export default app
