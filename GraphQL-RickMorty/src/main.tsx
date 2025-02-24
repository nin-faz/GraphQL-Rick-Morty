import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      query {
        characters {
          results {
            name
            image
          }
        }
      }
    `
  })
  .then(result => console.log(result));

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
      <StrictMode>
        <App />
      </StrictMode>,
  </ApolloProvider>

)
