import { fastify } from 'fastify'
import { products } from './products.js'

const server = fastify()

server.get('/health', async () => {
    return {
        status: 'healthy',
        service: 'product-service'
    }
})

server.get('/products', async () => {
    return products
})

server.get('/products/:id', async (request, reply) => {
    const { id } = request.params

    const product = products.find(
        product => product.id === Number(id)
    )

    if (!product) {
        return reply.status(404).send({
            error: 'Product not found'
        })
    }

    return product
})

server.listen({
    port: 3001,
    host: '0.0.0.0'
}, (err, address) => {

    if (err) {
        console.error(err)
        process.exit(1)
    }

    console.log(`Product Service running at ${address}`)
})