import { Product, ProductStore } from '../models/products';
const store = new ProductStore()
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
    const result = await store.create({name:'banana',price: 4});
    expect({name:result.name,price:result.price}).toEqual({name:'banana',price: 4});
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect({name:result[0].name,price:result[0].price}).toEqual({
    name:'banana',price: 4});
  });

  it('show method should return the correct product', async () => {
    const result = await store.show('banana');
    expect({name:result.name,price:result.price}).toEqual({
    name:'banana',price: 4
    });
  });

  it('delete method should remove the product', async () => {
    store.delete('banana');
    const result = await store.index()
    expect(result).toEqual([]);
  });
});