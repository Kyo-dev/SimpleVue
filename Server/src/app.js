import express, {json} from 'express'
import morgan from 'morgan'
const app = express()

//ANCHOR importando rutas
import userRoute from './routes/users'
// import registerRoute from './routes/register'
import loginRoute from './routes/login'


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

// app.use(('/api/registro-adm'), registerRoute)
// app.use(('/api/login'), loginRoute)

export default app
