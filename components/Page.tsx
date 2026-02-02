import React from "react";
import { StoryblokComponent } from "@storyblok/react";

const Page: React.FC<{ blok?: any }> = ({ blok }) => {
  return (
    <main>
      {blok?.body?.map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
};

export default Page;
