import * as data from '../data/cosmos/hsDataProduct';
import product from '../model/product';

// Add Product
export async function addProduct(product: product): Promise<product | undefined> {
    return await data.addProduct(product);
}

// Get Product by id
export async function getProductById(id: string): Promise<product | undefined> {
    return await data.getProductById(id);
}

module.exports.addProduct = addProduct;
module.exports.getProductById = getProductById;
