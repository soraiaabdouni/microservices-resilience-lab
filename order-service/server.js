import { fastify } from 'fastify'
import { orders } from './orders.js'

const server = fastify()

server.get('/health', async () => {
    return {
        status: 'healthy',
        service: 'order-service'
    }
})

server.get('/orders', async () => {
    return orders
})

server.post('/orders', async (request, reply) => {
    const { productId, quantity } = request.body

    try {
        const response = await fetch(
            `http://localhost:3001/products/${productId}`
        )

        if (!response.ok) {
            return reply.status(503).send({
                error: 'Product Service unavailable'
            })
        }

        const product = await response.json()

        const order = {
            id: orders.length + 1,
            product,
            quantity,
            total: product.price * quantity
        }

        orders.push(order)

        return reply.status(201).send(order)

    } catch (error) {
        return reply.status(503).send({
            error: 'Product Service unavailable'
        })
    }
})

server.listen({
    port: 3002,
    host: '0.0.0.0'
}, (err, address) => {

    if (err) {
        console.error(err)
        process.exit(1)
    }

    console.log(`Order Service running at ${address}`)
})