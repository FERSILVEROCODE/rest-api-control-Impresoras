import express from 'express'
import contadorImpresionesRoutes from './routes/contadorImpresiones.routes.js'
import impresorasRoutes from './routes/impresoras.routes.js'
import mantenimientoRoutes from './routes/mantenimientos.routes.js'
import serviciosRoutes from './routes/servicios.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import indexRoutes from './routes/index.routes.js'


const app = express()

app.use(express.json())

app.use ('/api/impresoras',impresorasRoutes)
app.use ('/api/contadorImpresiones',contadorImpresionesRoutes)
app.use ('/api/mantenimientos',mantenimientoRoutes)
app.use ('/api/servicios',serviciosRoutes)
app.use ('/api/usuarios',usuariosRoutes)

app.use (indexRoutes)

app.use((req,res,next)=>{
    res.status(404).send("Ruta no encontrada")
})

export default app;