import fs from 'fs';
import path from 'path';

const projectRoot = 'c:/Users/chiqu/capstone/curvychiq';
const outputFile = path.join(projectRoot, 'FULL_CODE_DOCUMENTATION.md');

const includedExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.css', '.json', '.md']);
const excludedDirs = new Set(['node_modules', '.next', '.vscode', '.git', 'public']);
const excludedFiles = new Set(['package-lock.json', 'tsconfig.tsbuildinfo', '.env', 'FULL_CODE_DOCUMENTATION.md']);

function getFiles(dir, allFiles = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!excludedDirs.has(file)) {
        getFiles(fullPath, allFiles);
      }
    } else {
      const ext = path.extname(file);
      if (includedExtensions.has(ext) && !excludedFiles.has(file)) {
        allFiles.push(fullPath);
      }
    }
  });

  return allFiles;
}

function generateDocumentation() {
  const files = getFiles(projectRoot);
  let markdown = "# CurvyChiq Project - Source Code Documentation\n\n";
  markdown += `Generated on: ${new Date().toLocaleString()}\n\n`;
  markdown += "This document contains all source code files for the CurvyChiq project for school submission purposes.\n\n";

  files.forEach(file => {
    const relativePath = path.relative(projectRoot, file);
    const content = fs.readFileSync(file, 'utf8');
    const ext = path.extname(file).replace('.', '');
    
    // Determine language for syntax highlighting
    let lang = ext;
    if (ext === 'tsx' || ext === 'jsx') lang = 'typescript';
    if (ext === 'mjs') lang = 'javascript';

    markdown += `## File: ${relativePath}\n\n`;
    markdown += '```' + lang + '\n';
    markdown += content;
    markdown += '\n```\n\n---\n\n';
  });

  fs.writeFileSync(outputFile, markdown);
  console.log(`Documentation generated successfully: ${outputFile}`);
}

generateDocumentation();
