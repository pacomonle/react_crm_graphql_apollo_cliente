import { ApolloClient, HttpLink, InMemoryCache, createHttpLink } from '@apollo/client';
import fetch from 'node-fetch';
import { setContext } from 'apollo-link-context';

// donde nos vamos a conectar para obtener los datos
const httpLink = createHttpLink({
    // uri: 'https://pacific-bayou-12464.herokuapp.com/', ruta produccion del backend
     uri:'http://localhost:4000/',
     fetch   
 });

 // trabajando con nuestro token
 const authLink = setContext((_, { headers }) => {

    // Leer el storage almacenado
    const token = localStorage.getItem('token');
  //  console.log('token' , token);
  
    return  {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat( httpLink ),
   // link:  new HttpLink({
   //        uri:'http://localhost:4000/',
   //        fetch   
   //    })
});

export default client;