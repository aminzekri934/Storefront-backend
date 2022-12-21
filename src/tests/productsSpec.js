"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../products");
const store = new products_1.ProductStore();
describe("Product Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('create method should add a product', async () => {
        const result = await store.create({ id: 1, name: 'udacity_full_stack_course', price: 250 });
        expect(result).toEqual({ id: 1, name: 'udacity_full_stack_course', price: 250 });
    });
    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([{
                id: 1, name: 'udacity_full_stack_course', price: 250
            }]);
    });
    it('show method should return the correct product', async () => {
        const result = await store.show('udacity_full_stack_course');
        expect(result).toEqual({
            id: 1, name: 'udacity_full_stack_course', price: 250
        });
    });
    it('delete method should remove the product', async () => {
        store.delete('udacity_full_stack_course');
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
