const fs = require('fs');
const path = 'c:/Users/Sanuuu/Desktop/travel/travel-app/src/index.css';
let content = fs.readFileSync(path, 'utf8');

// Update Font Import
content = content.replace(
  /@import url\('.*?'\);/,
  "@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');"
);

// Update Colors
content = content.replace(/--primary: #0a0a0a;/g, '--primary: #0f172a;');
content = content.replace(/--bg: #f8f9fa;/g, '--bg: #f8fafc;');
content = content.replace(/--text-main: #2d3436;/g, '--text-main: #334155;');
content = content.replace(/--text-light: #636e72;/g, '--text-light: #64748b;');
content = content.replace(/--accent: #d4a373;/g, '--accent: #3b82f6;');
content = content.replace(/--accent-dark: #b8895a;/g, '--accent-dark: #2563eb;');

// Update Font Families
content = content.replaceAll("'Outfit'", "'Plus Jakarta Sans'");
content = content.replaceAll("'Playfair Display'", "'Plus Jakarta Sans'");

// Update header tracking
content = content.replace(
  /h1,\s*h2,\s*h3,\s*h4\s*\{\s*font-family:\s*'Plus Jakarta Sans',\s*serif;\s*\}/,
  `h1, h2, h3, h4 {\n  font-family: 'Plus Jakarta Sans', sans-serif;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n}`
);

fs.writeFileSync(path, content, 'utf8');
console.log('CSS Updated successfully');
