import path from 'path';

export default (config: any) => {
  config.resolve.alias.set('@', path.join(process.env.PWD as string, 'src'));
};
