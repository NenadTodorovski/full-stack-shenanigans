import "../styles/tailwind.css";
import { Layout } from "../components/Layout";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../lib/apolloClient";

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
