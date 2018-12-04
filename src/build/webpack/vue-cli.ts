import path from 'path';

export default (config: any) => {
  config.resolve.alias.set('@', path.join(process.cwd(), 'src'));
};
