const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Product = require('../models/product');

describe('Products Requests', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1/codehouse-apolo-test');
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('GET /api/products', () => {

        let response;

        beforeEach(async () => {
            response = await request(app).get('/api/products').send();
        });

        it('should respond with status 200', () => {
            // Si falla quiere decir que la URL no responde con nada o responde con error (404 -> no existe, 503 -> error del servidor)
            expect(response.statusCode).toBe(200);
        });

        it('should respond with content-type header equals to application/json', () => {
            // expect(response.headers['content-type']).toEqual(
            //     expect.stringContaining('json')
            // );
            expect(response.headers['content-type']).toContain('json');
        });

        it('should respond with an array and a product in first position', () => {
            expect(response.body).toBeInstanceOf(Array);

            expect(response.body[0]._id).toEqual('61dc4fcec02659795ba8fc6f');
        });

    });

    describe('GET /api/products/:productId', () => {

        let newProduct;
        let response;

        beforeAll(async () => {
            newProduct = await Product.create({ name: 'Test Product', description: 'Para probar', price: 99.99, category: 'test', stock: 100, available: true });
        });

        afterAll(async () => {
            await Product.findByIdAndDelete(newProduct._id);
        });

        beforeEach(async () => {
            response = await request(app).get('/api/products/' + newProduct._id).send();
        });

        it('should respond with status 200', () => {
            expect(response.statusCode).toBe(200);
        });

        it('should respond with content-type application/json', () => {
            expect(response.headers['content-type']).toContain('json');
        });

        it('should have same values', () => {
            expect(response.body._id).toEqual(newProduct._id.toString());
            expect(response.body.name).toEqual(newProduct.name);
        });

    });

    describe('POST /api/products', () => {

        const newProduct = { name: 'Test', description: 'Desc Test', price: 99.99, category: 'test', stock: 100, available: true };

        afterAll(async () => {
            await Product.deleteMany({ category: 'test' });
        });

        it('should respond with status 201', async () => {
            const response = await request(app)
                .post('/api/products')
                .send(newProduct);
            expect(response.statusCode).toBe(201);
        });

        it('should respond with content-type application/json', async () => {
            const response = await request(app)
                .post('/api/products')
                .send(newProduct);
            expect(response.headers['content-type']).toContain('json');
        });

        it('should respond with product created', async () => {
            const response = await request(app)
                .post('/api/products')
                .send(newProduct);
            console.log(response.body);
            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe(newProduct.name);
        });

        it('should respond with error -> name, description required', async () => {
            const response = await request(app)
                .post('/api/products')
                .send({ price: 99.99, category: 'test', available: true, stock: 100 })
            expect(response.body.error).toBeDefined();
            expect(response.statusCode).toBe(422);
        });

        it('should respond with error -> price must be a number', async () => {
            const response = await request(app)
                .post('/api/products')
                .send({ ...newProduct, price: 'hola' })
            expect(response.body.error).toBeDefined();
            expect(response.statusCode).toBe(422);
        });

    });

    describe('DELETE /api/products/:productId', () => {

        let newProduct;
        let response;

        beforeAll(async () => {
            // Creo un producto en la base de datos
            newProduct = await Product.create({ name: 'Test', description: 'Test desc', price: 99.99, category: 'test', available: true, stock: 89 });
            // Lanzo la petición de borrado del producto
            response = await request(app).delete('/api/products/' + newProduct._id).send();
        });

        it('should respond whith status 200 and content-type application/json', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('should respond with the deleted product', () => {
            expect(response.body._id).toBe(newProduct._id.toString());
        });

    });

    describe('PUT /api/products/:productId', () => {

        let newProduct;
        let response;

        beforeAll(async () => {
            newProduct = await Product.create({ name: 'Test', description: 'Test Desc', price: 99.99, stock: 100, category: 'test', available: true });

            response = await request(app)
                .put('/api/products/' + newProduct._id)
                .send({ available: false });
        });

        afterAll(async () => {
            await Product.findByIdAndDelete(newProduct._id);
        });

        it('should respond whith status 200 and content-type application/json', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('should have the updated values', () => {
            console.log(response.body);
            expect(response.body.available).toBeFalsy();
            expect(response.body.name).toBe(newProduct.name);
            expect(response.body.category).toBe(newProduct.category);
        });

    });

});