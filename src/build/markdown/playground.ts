import { join } from 'path';
import { writeFileSync } from 'fs';
import { createHash } from 'crypto';
import { VuePressOpenContext } from 'src/types';

const md5 = str => {
  const md5 = createHash('md5');
  md5.update(str);
  return md5.digest('hex').slice(-5);
};

const buildPlaygroundComponent = ({
  content,
  tag,
  RE_MARKER,
  ctx,
}: {
  content: string;
  tag: string;
  RE_MARKER: RegExp;
  ctx: VuePressOpenContext;
}) => {
  content = content
    // remove annotation
    .replace(RE_MARKER, '')
    // ensure <style> is scoped
    .replace(/\<style([^>]*)\>/g, (match, g1) => {
      if (match.indexOf('scoped') < 0) {
        return `<style scoped${g1}>`;
      }
      return match;
    });
  if (!content.startsWith('<template>')) {
    content = `<template>${content}</template>`;
  }
  writeFileSync(join(ctx.tempPath, `${tag}.vue`), content);
};

const parseCode = ({
  rawCode,
  tag,
  RE_MARKER,
}: {
  rawCode: string;
  tag: string;
  RE_MARKER: RegExp;
}): string => {
  return rawCode
    .replace(RE_MARKER, '')
    .replace(/class="language-html(?=[\s"])/, 'class="language-vue')
    .replace(
      '<!--beforebegin-->',
      `<!--beforebegin--><div class="playground"><div class="stage"><${tag} /></div>`,
    )
    .replace('<!--afterend-->', '</div><!--afterend-->');
};

export default (ctx: VuePressOpenContext, md: any) => {
  const RE_MARKER = /@playground\s*/;
  const fence = md.renderer.rules.fence;

  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args;
    const token = tokens[idx];
    const rawCode = fence(...args);
    const lang = token.info.trim().toLowerCase();

    // lang is `html` or `vue`
    if (['html', 'vue'].includes(lang)) {
      const content = token.content;
      if (content.startsWith('@playground')) {
        const tag = `ComponentPlaygroundX${md5(content)}`;
        buildPlaygroundComponent({ content, tag, RE_MARKER, ctx });
        return parseCode({ rawCode, tag, RE_MARKER });
      }
    }

    return rawCode;
  };
};
