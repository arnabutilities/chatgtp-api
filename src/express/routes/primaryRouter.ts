import { Router } from 'express';
import restRouter from './rest';
import graphQlRouter from './graphql';
import docRouter from './documentation';
import { API_ENDPOINT, DOCUMENTATION_ENDPOINT, GRAPHQL_ENDPOINT } from "../resources/config";

// Create a new Router instance
const primaryRouter = Router();

// Mount the routers
primaryRouter.use(API_ENDPOINT, restRouter);
primaryRouter.use(GRAPHQL_ENDPOINT, graphQlRouter);
primaryRouter.use(DOCUMENTATION_ENDPOINT, docRouter);


export default primaryRouter;