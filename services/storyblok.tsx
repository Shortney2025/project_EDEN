import { storyblokInit, apiPlugin } from "@storyblok/react";
import React from "react";
import Page from "../components/Page";
import Teaser from "../components/Teaser";

// Component mappings for Storyblok-managed components.
const components = {
  page: Page,
  teaser: Teaser,
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
