import {ApolloClient} from "@apollo/client";
import DefaultClient, {InMemoryCache} from "apollo-boost";

const createApolloClient = () => {
    return new ApolloClient({
        uri: "http://192.168.100.22:4000/graphql",
        cache: new InMemoryCache()
    })
}

export default createApolloClient