// @ts-check

import "@cloudcannon/editable-regions/astro-react-renderer";

import { registerAstroComponent } from "@cloudcannon/editable-regions/astro";
// @ts-ignore
import Heading from "./src/components/typography/heading/heading.astro";

registerAstroComponent("typography/heading", Heading);
