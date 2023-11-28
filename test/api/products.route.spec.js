const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Product = require('../../models/product.model');

describe('pruebas sobre los productos ingresados',  () => {

    beforeAll(async () =>{
        await mongoose.connect('mongodb://127.0.0.1/product');
    });

    afterAll( async () => {
        await mongoose.disconnect();
    });

    describe('GET /api/products', () => {

        let response;
        beforeEach(async () => {
            response = await request(app).get('/api/products').send();
        })
    
        test('La ruta funciona', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
    
        test('La petición nos devuelve un array de productos', async () => {
            expect(response.body).toBeInstanceOf(Array);
        });
    
    });

    describe('POST /api/products', () => {

        const newProduct = { name: 'labial', destination: 'Armenia', category: 'maquillaje', start_date: '2023-11-20' };
        const wrongproduct = { nombre: 'labial' };

        afterAll(async () => {
            await Product.deleteMany({ name: 'labial' });
        });

        test('La ruta funcione', async () => {
            const response = await request(app).post('/api/products').send(newProduct);

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        test('Se inserta correctamente', async () => {
            const response = await request(app).post('/api/products').send(newProduct);

            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe(newProduct.name);
        });

        test('Error en la inserción', async () => {
            const response = await request(app).post('/api/products').send(wrongproduct);

            expect(response.status).toBe(500);
            expect(response.body.error).toBeDefined();
        });

    });

    describe('PUT /api/products', () => {

        let product;
        beforeEach(async () => {
            product = await Product.create({ name: 'Arroz', destination: 'Armenia', category: 'comida', start_date: '2023-11-20' });
        });

        afterEach(async () => {
            await Product.findByIdAndDelete(product._id);
        });

        test('La ruta funciona', async () => {
            const response = await request(app).put(`/api/products/${product._id}`).send({
                name: 'arroz leche'
            });

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        test('Se actualiza correctamente', async () => {
            const response = await request(app).put(`/api/products/${product._id}`).send({
                name: 'trip updated'
            });

            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe('trip updated');
        });

    });

    describe('DELETE /api/products', () => {

        let product;
        let response;
        beforeEach(async () => {
            product = await Product.create({ name: 'Arroz', destination: 'Armenia', category: 'comida', start_date: '2023-11-20' });
            response = await request(app).delete(`/api/products/${product._id}`).send();
        });

        test('La ruta funciona', () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        test('Borra correctamente', async () => {
            expect(response.body._id).toBeDefined();

            const foundProduct = await Product.findById(product._id);
            expect(foundProduct).toBeNull();
        })

    });


});



