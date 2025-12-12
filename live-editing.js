import { registerAstroComponent } from "@cloudcannon/editable-regions/astro";
import "@cloudcannon/editable-regions/astro-react-renderer";

const componentModules = import.meta.glob("./src/components/**/*.astro", { eager: true });

// Helper to convert PascalCase to kebab-case
function pascalToKebab(pascal) {
  return pascal
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");
}

for (const [path, module] of Object.entries(componentModules)) {
  const match = path.match(/\.\/src\/components\/(.+)\.astro$/);

  if (match) {
    const fullPath = match[1]; // e.g., 'wrappers/grid/Grid', 'wrappers/grid/GridItem'
    const parts = fullPath.split("/");
    const filename = parts[parts.length - 1];
    const parentFolder = parts.length > 1 ? parts[parts.length - 2] : null;

    // Convert PascalCase filename to kebab-case for comparison
    const kebabFilename = pascalToKebab(filename);

    // If kebab-case filename matches parent folder, it's not a subcomponent - remove redundant filename
    // e.g. 'wrappers/grid' (from Grid.astro in grid folder), 'wrappers/grid/grid-item' (from GridItem.astro)
    const registrationPath =
      kebabFilename === parentFolder
        ? parts.slice(0, -1).join("/")
        : parts.slice(0, -1).concat(kebabFilename).join("/");

    // Validate module.default before registering
    if (!module) {
      console.error(`[live-editing] Module is undefined for ${path}`);
      continue;
    }

    if (!module.default) {
      console.error(`[live-editing] module.default is undefined for ${path}`, {
        moduleKeys: Object.keys(module),
        registrationPath,
      });
      continue;
    }

    if (typeof module.default !== "function") {
      console.error(`[live-editing] module.default is not a function for ${path}`, {
        defaultType: typeof module.default,
        defaultValue: module.default,
        registrationPath,
      });
      continue;
    }

    try {
      registerAstroComponent(registrationPath, module.default);
    } catch (error) {
      console.error(`[live-editing] Error registering ${registrationPath} from ${path}:`, error);
    }
  }
}
