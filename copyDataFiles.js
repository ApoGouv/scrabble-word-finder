import { promises as fs } from 'fs';
import path, { resolve, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = resolve(__dirname, 'data-prep/assets/web_data');
const destDir = resolve(__dirname, 'public/data');

async function clearDestDir() {
  try {
    // Remove the destination directory recursively to clear old files
    await fs.rm(destDir, { recursive: true, force: true });
    console.log('Destination directory cleared!');
  } catch (err) {
    console.error('Error while clearing destination directory:', err.message);
  }
}

async function copyData() {
  try {
    // Ensure destination directory exists after clearing
    await fs.mkdir(destDir, { recursive: true });

    // Copy 'words_by_alphagram' directory
    await fs.cp(
      join(sourceDir, 'words_by_alphagram'),
      join(destDir, 'words_by_alphagram'),
      { recursive: true }
    );
    console.log('words_by_alphagram copied!');

    // Copy 'words_by_starting_letter' directory
    await fs.cp(
      join(sourceDir, 'words_by_starting_letter'),
      join(destDir, 'words_by_starting_letter'),
      { recursive: true }
    );
    console.log('words_by_starting_letter copied!');
  } catch (err) {
    console.error('Error during copy:', err.message);
  }
}

// Run the process to clear and then copy the data
async function execute() {
  await clearDestDir();
  await copyData();
}

// Run the entire process
execute();
