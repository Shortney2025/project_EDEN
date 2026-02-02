import React from 'react';
import { useStoryblok, StoryblokComponent } from "@storyblok/react";

const StoryblokApp: React.FC = () => {
  let slug =
    window.location.pathname === "/"
      ? "home"
      : window.location.pathname.replace("/", "");

  const story = useStoryblok(slug, { version: "draft" });

  if (!story || !story.content) {
    return <div>Loading...</div>;
  }

  return <StoryblokComponent blok={story.content} />;
};

export default StoryblokApp;
