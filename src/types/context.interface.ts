export interface ProjectEnviromentContext {
  vueCLI: boolean;
  nuxt: boolean;
}

export interface DirContext {
  sourceDir: string;
  configDir: string;
  componentsDir: string;
  catalogDir: string;
  distDirPrefix: string;
}

export interface ComponentFileContext {
  name: string;
  fileName: string;
  absolutePathname: string;
  relativePathname: string;
}

export interface ComponentContext extends ComponentFileContext {
  link: string;
  catalogPathname: string | null;
  existDoc: boolean;
}
