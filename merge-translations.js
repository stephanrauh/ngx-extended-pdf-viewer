#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to merge all translation files from additional-locale folder
 * into a single _temp.ftl file with English translations first
 */

const ADDITIONAL_LOCALE_DIR = path.join(__dirname, 'projects/ngx-extended-pdf-viewer/assets/additional-locale');
const OUTPUT_FILE = path.join(ADDITIONAL_LOCALE_DIR, '_temp.ftl');

// Language code to display name mapping for better organization
const LANGUAGE_NAMES = {
  'en': 'ENGLISH',
  'bg': 'BULGARIAN', 
  'cs': 'CZECH',
  'da': 'DANISH',
  'de': 'GERMAN',
  'es': 'SPANISH',
  'fi': 'FINNISH',
  'fr': 'FRENCH',
  'hr': 'CROATIAN',
  'hu': 'HUNGARIAN',
  'it': 'ITALIAN',
  'nb-NO': 'NORWEGIAN BOKMÅL',
  'nl': 'DUTCH',
  'pl': 'POLISH',
  'pt': 'PORTUGUESE',
  'ro': 'ROMANIAN',
  'sk': 'SLOVAK',
  'sl': 'SLOVENIAN',
  'sv-SE': 'SWEDISH',
  'uk': 'UKRAINIAN'
};

function mergeTranslationFiles() {
  try {
    console.log('🔄 Starting translation file merge...');
    
    // Check if additional-locale directory exists
    if (!fs.existsSync(ADDITIONAL_LOCALE_DIR)) {
      throw new Error(`Additional locale directory not found: ${ADDITIONAL_LOCALE_DIR}`);
    }

    // Read all .ftl files from the directory
    const files = fs.readdirSync(ADDITIONAL_LOCALE_DIR)
      .filter(file => file.endsWith('.ftl') && file !== '_temp.ftl')
      .sort((a, b) => {
        // Put English first, then sort alphabetically
        if (a === 'en.ftl') return -1;
        if (b === 'en.ftl') return 1;
        return a.localeCompare(b);
      });

    if (files.length === 0) {
      throw new Error('No .ftl files found in additional-locale directory');
    }

    console.log(`📁 Found ${files.length} translation files:`, files.map(f => f.replace('.ftl', '')).join(', '));

    // Start building the merged content
    let mergedContent = `# Copyright 2019-2093 by Stephan Rauh
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# MERGED ADDITIONAL TRANSLATIONS FILE
# Contains all translations from additional-locale folder
# Generated automatically by merge-translations.js

`;

    // Process each file
    files.forEach((filename, index) => {
      const languageCode = filename.replace('.ftl', '');
      const languageName = LANGUAGE_NAMES[languageCode] || languageCode.toUpperCase();
      const filePath = path.join(ADDITIONAL_LOCALE_DIR, filename);
      
      console.log(`📝 Processing ${languageCode} (${languageName})...`);
      
      // Read the file content
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Extract only the translation lines (skip header comments)
      const lines = content.split('\n');
      const translationLines = [];
      let inTranslationSection = false;
      
      for (const line of lines) {
        if (line.includes('# Additional translations')) {
          inTranslationSection = true;
          continue;
        }
        if (inTranslationSection && line.trim() && !line.startsWith('#')) {
          translationLines.push(line);
        }
      }
      
      // Add language section header
      mergedContent += `# ===== ${languageName} (${languageCode}.ftl) =====\n`;
      
      // Add translations
      translationLines.forEach(line => {
        mergedContent += line + '\n';
      });
      
      // Add spacing between sections (except for the last one)
      if (index < files.length - 1) {
        mergedContent += '\n';
      }
    });

    // Write the merged file
    fs.writeFileSync(OUTPUT_FILE, mergedContent, 'utf8');
    
    console.log(`✅ Successfully merged ${files.length} translation files into _temp.ftl`);
    console.log(`📄 Output file: ${OUTPUT_FILE}`);
    console.log(`📊 Total lines: ${mergedContent.split('\n').length}`);
    
    // Show summary of languages
    const languageCount = files.length;
    console.log(`\n🌍 Languages included (${languageCount} total):`);
    files.forEach(filename => {
      const languageCode = filename.replace('.ftl', '');
      const languageName = LANGUAGE_NAMES[languageCode] || languageCode.toUpperCase();
      console.log(`  • ${languageName} (${languageCode})`);
    });
    
  } catch (error) {
    console.error('❌ Error merging translation files:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  mergeTranslationFiles();
}

module.exports = { mergeTranslationFiles };