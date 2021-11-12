const { Router } = express
import express from 'express'
 import app from './server.js'
const PORT = 8080
const port = 8080
// app.use('/static', express.static('public'));
//Si saco el exprees no renderiza mis archivos html pero si lo dejo me da un error de referencia
import {
  productosDao as productosApi,
  carritosDao as carritosApi
} from './daos/index.js'
app.listen(port, () => {
  console.log(`Server run on http://localhost:${port}`)
})


const esAdmin = true

function crearErrorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error
}

function soloAdmins(req, res, next) {
    if (!esAdmin) {
        res.json(crearErrorNoEsAdmin())
    } else {
        next()
    }
}

 const productosRouter = new Router()
 const carritosRouter = new Router()

productosRouter.get('/', async (req, res) => {
    const productos = await productosApi.listarAll()
    res.json(productos)
})

productosRouter.get('/:id', async (req, res) => {
    res.json(await productosApi.listar(req.params.id))
})

productosRouter.post('/', soloAdmins, async (req, res) => {
    res.json(await productosApi.guardar(req.body))
})

productosRouter.put('/:id', soloAdmins, async (req, res) => {
    res.json(await productosApi.actualizar(req.body))
})

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
    res.json(await productosApi.borrar(req.params.id))
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/productos', productosRouter)
app.use('/carritos', carritosRouter)

export default app