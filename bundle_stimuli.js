const fs = require('fs');
const path = require('path');

const stimuliDir = path.join(__dirname, 'stimuli');
const outputFile = path.join(__dirname, 'stimuli.js');

// Correctly ordered list of files to bundle
const orderedFiles = [
    'config.js',
    'utils.js',
    'experiment_introduction.js',
    'explanation.js',
    'comprehension.js',
    'definition_evaluation.js',
    'comparison_instructions.js',
    'compare_models.js'
];

// Map to full paths
const files = orderedFiles.map(file => path.join(stimuliDir, file));

// Concatenate all the files
let bundle = '';
files.forEach(file => {
    if (fs.existsSync(file)) {
        bundle += `// ---- ${path.basename(file)} ----\n`;
        bundle += fs.readFileSync(file, 'utf8') + '\n\n';
    } else {
        console.warn(`Warning: ${file} does not exist.`);
    }
});

// Write to stimuli.js
fs.writeFileSync(outputFile, bundle);

console.log(`Bundled ${files.length} files into ${outputFile}`);