import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://comp308-be.azurewebsites.net/graphql', // Adjust if your GraphQL server is on a different URL
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
