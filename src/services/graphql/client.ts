import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Replace with your API Gateway URL
  cache: new InMemoryCache(),
});

export default client;
