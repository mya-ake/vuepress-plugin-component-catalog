module.exports = function(source) {
  const re = /\<(ComponentPlaygroundX[a-z\d]{5}) \/\>/g;
  const imports: string[] = [];
  const components: string[] = [];

  while (true) {
    let result = re.exec(source);
    if (!result) break;

    const tag = result[1];
    components.push(tag);
    imports.push(`import ${tag} from "@playground/${tag}.vue"`);
  }

  return `${source}
<script>
${imports.join('\n')}
export default {
  components: { ${components.join(',')} }
}
</script>`;
};
