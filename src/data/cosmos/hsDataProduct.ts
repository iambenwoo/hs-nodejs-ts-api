import * as client from './hsDataCosmosClient';
import product from '../../model/product';

// Add a new document in product container
export async function addProduct(product: product): Promise<product | undefined> {
    const container = client.getProductContainer();
    const res = await container.items.create(product);
    return res.resource;
}

// Get document by id from product container
export async function getProductById(id: string): Promise<product | undefined> {
    const container = client.getProductContainer();
    const querySpec = {
        query: 'SELECT * FROM product a WHERE a.id = @id',
        parameters: [
            {
                name: '@id',
                value: id,
            },
        ],
    };

    const result = await container.items.query(querySpec).fetchAll();
    if (result && result.resources) {
        return result.resources[0];
    }
}
