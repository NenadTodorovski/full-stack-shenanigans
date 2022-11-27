import Head from "next/head";
import { LinkCard } from "../components/LinkCard";
import { gql, useQuery } from "@apollo/client";

const GetAllLinksQuery = gql`
  query Links($size: Int, $after: String) {
    links(size: $size, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          title
          description
          category
          imageUrl
          url
        }
      }
    }
  }
`;

export default function Home() {
  const {
    data: { links } = {},
    loading,
    error,
  } = useQuery(GetAllLinksQuery, {
    variables: { size: 10 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went terribly wrong! {error.message}</p>;

  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto max-w-5xl my-20">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {links.edges.map(
            ({ node: { id, title, description, category, imageUrl, url } }) => (
              <LinkCard
                key={id}
                id={id}
                title={title}
                description={description}
                category={category}
                imageUrl={imageUrl}
                url={url}
              />
            )
          )}
        </ul>
      </div>
    </div>
  );
}
