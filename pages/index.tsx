import Head from "next/head";
import { LinkCard } from "../components/LinkCard";
import { links } from "../data/links";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto max-w-5xl my-20">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {links.map(({ id, title, description, category, imageUrl, url }) => (
            <LinkCard
              key={id}
              id={id}
              title={title}
              description={description}
              category={category}
              imageUrl={imageUrl}
              url={url}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
