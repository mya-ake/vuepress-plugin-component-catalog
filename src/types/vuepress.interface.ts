export interface VuePressOpenContext {
  isProd: boolean;
  sourceDir: string;
  tempPath: string;
  outDir: string;
  themePath: string;
  base: string;
  writeTemp: string;
}

export interface VuePressPage {
  path: string;
  filePath?: string;
  content?: string;
}
