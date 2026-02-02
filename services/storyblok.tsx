import { storyblokInit, apiPlugin } from "@storyblok/react";
import React from "react";

// Placeholder component mappings for Storyblok-managed components.
// Add actual component mappings here as Storyblok components are used.
const components = {
  // Example:
  // page: (props) => <div {...props} />,
};

export const initStoryblok = () => {
  if ((window as any).__storyblok_initialized) return;
  storyblokInit({
    accessToken: process.env.STORYBLOK_API_TOKEN || '',
    use: [apiPlugin],
    components,
  });
  (window as any).__storyblok_initialized = true;
};

export default initStoryblok;
