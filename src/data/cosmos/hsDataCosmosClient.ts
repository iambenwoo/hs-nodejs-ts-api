import winston from '../../config/winston';
import { Container, CosmosClient } from '@azure/cosmos';

const logger = winston(module);

// Cosmos Client for cosmos-hs-data
export function getCosmosClient(): CosmosClient {
    const endpoint = process.env.cosmos_hs_data_endpoint;
    const key = process.env.cosmos_hs_data_key;
    if (endpoint === undefined) {
        const errMsg = 'undefined cosmos endpoint of HS Data!';
        logger.log('error', errMsg);
        throw new Error(errMsg);
    }
    if (key === undefined) {
        const errMsg = 'undefined cosmos key of HS Data!';
        logger.log('error', errMsg);
        throw new Error(errMsg);
    }
    return new CosmosClient({ endpoint, key });
}

export function getProductContainer(): Container {
    const hs_data_database = process.env.cosmos_hs_data_database;
    const hs_data_container_product = process.env.cosmos_hs_data_container_product;
    if (hs_data_database === undefined) {
        throw new Error('undefined cosmos database of HS Data!');
    }
    if (hs_data_container_product == undefined) {
        throw new Error('undefined cosmos product container of HS Data!');
    }
    const client = getCosmosClient();
    const database = client.database(hs_data_database);
    return database.container(hs_data_container_product);
}
