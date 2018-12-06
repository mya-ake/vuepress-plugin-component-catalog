export interface ProjectEnviromentContext {
  vueCLI: boolean;
  nuxt: boolean;
}

export interface DirContext {
  rootDir: string;
  sourceDir: string;
  configDir: string;
  include: string[];
  exclude: string[];
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
  catalogPathname: string;
  existDocs: boolean;
}
