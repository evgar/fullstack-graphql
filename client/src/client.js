import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag'

const link = new HttpLink({ uri: 'http://localhost:4000'});

const cache = new InMemoryCache();

const query = gql`
      {
          pets {
            id
          }
      }
`;

const client = new ApolloClient(
    {
        link,
        cache
    }
);

client.query({query})
    .then(data => console.log(data))
    .catch(error => console.log(error));

export default client;
