const fs = require('node:fs'),
  ts = require('typescript');
const pkg = require('../package.json');
const program = ts.createProgram(['src/index.ts'], {
  target: ts.ScriptTarget.ES2020,
  module: ts.ModuleKind.CommonJS,
  strict: true,
  esModuleInterop: true,
});
const checker = program.getTypeChecker(),
  file = program.getSourceFile('src/index.ts');
const symbols = checker.getExportsOfModule(checker.getSymbolAtLocation(file));
const api = [];
const types = [];
const notes = require('../docs/contracts.json');
for (const exported of symbols) {
  if (['default', 'ChronoUtilz'].includes(exported.name)) continue;
  const symbol =
    exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
  const declaration = symbol.valueDeclaration || symbol.declarations?.[0];
  if (!declaration) continue;
  const callable = ts.isFunctionDeclaration(declaration) || ts.isClassDeclaration(declaration);
  const type = checker.getTypeOfSymbolAtLocation(symbol, declaration);
  const functionSignature = (node) =>
    node
      .getText()
      .slice(0, node.body ? node.body.getStart() - node.getStart() : undefined)
      .trim()
      .replace(/^export /, '');
  const overloads =
    symbol.declarations?.filter((node) => ts.isFunctionDeclaration(node) && !node.body) || [];
  let signature = ts.isFunctionDeclaration(declaration)
    ? overloads.length
      ? overloads.map(functionSignature).join('\n')
      : functionSignature(declaration)
    : checker.typeToString(type, declaration, ts.TypeFormatFlags.NoTruncation);

  if (ts.isClassDeclaration(declaration))
    signature =
      'declare class ' +
      exported.name +
      ' {\n' +
      declaration.members
        .filter((m) => !m.modifiers?.some((x) => x.kind === ts.SyntaxKind.PrivateKeyword))
        .map(
          (m) =>
            '  ' +
            m
              .getText()
              .slice(0, m.body ? m.body.getStart() - m.getStart() : undefined)
              .trim() +
            ';',
        )
        .join('\n') +
      '\n}';
  const summary =
    notes[exported.name] ||
    ts.displayPartsToString(symbol.getDocumentationComment(checker)).split('\n')[0] ||
    exported.name;
  if (callable)
    api.push({
      name: exported.name,
      kind: ts.isClassDeclaration(declaration) ? 'class' : 'function',
      signature: signature.replace(/^export /, ''),
      summary,
      source: declaration.getSourceFile().fileName.replace(/^.*\/src\//, 'src/'),
    });
  else types.push({ name: exported.name, declaration: declaration.getText() });
}
api.sort((a, b) => a.name.localeCompare(b.name));
types.sort((a, b) => a.name.localeCompare(b.name));
const manifest = { version: pkg.version, api, types };
const heading = `# ChronoUtilz API reference\n\nGenerated from the public TypeScript exports for version ${pkg.version}. Run \`npm run docs\` to regenerate.\n\n${api.length} callable exports. [Hosted documentation](https://chronoutilz.netlify.app/documentation) · [API reference](https://chronoutilz.netlify.app/api-docs) · [Playground](https://chronoutilz.netlify.app/playground)\n\nRead [behavior and migration](docs/MIGRATION.md) before upgrading from version 2. Examples in [docs/examples.json](docs/examples.json) are executed in CI. All date-returning operations return fresh objects; inputs are not mutated. Calendar helpers use the host timezone unless an explicit timezone option is documented. Shared business configuration is module-scoped.\n\n`;
const markdown =
  heading +
  api
    .map(
      (item) =>
        `## ${item.name}\n\n${item.summary}\n\n\`\`\`typescript\n${item.signature}\n\`\`\`\n`,
    )
    .join('\n') +
  '\n## Public types and classes\n\n```typescript\n' +
  types.map((t) => t.declaration).join('\n\n') +
  '\n```\n';
for (const [path, text] of [
  ['docs/api.json', JSON.stringify(manifest, null, 2) + '\n'],
  ['DOCS.md', markdown],
]) {
  if (process.argv.includes('--check')) {
    if (!fs.existsSync(path) || fs.readFileSync(path, 'utf8') !== text)
      throw Error(`${path} is stale; run npm run docs`);
  } else fs.writeFileSync(path, text);
}
console.log(
  `Verified documentation for ${api.length} callable exports and ${types.length} public types.`,
);
