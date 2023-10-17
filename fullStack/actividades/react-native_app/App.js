import { Alert, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import Main from "./src/components/Main.jsx"
import {NativeRouter} from "react-router-native";
import {StatusBar} from "expo-status-bar"
import createApolloClient from "./src/utils/apolloClient";
import {ApolloProvider} from "@apollo/client";



const apolloClient = createApolloClient()
export default function App() {
  return (
      <ApolloProvider client={apolloClient}>
        <StatusBar style={"light"}/>
        <NativeRouter>
          <Main />
        </NativeRouter>
      </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
