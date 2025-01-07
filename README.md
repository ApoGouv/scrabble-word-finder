# Scrabble Word Finder

Scrabble Word Finder is a sophisticated web-based application tailored for Greek Scrabble enthusiasts. This tool offers robust functionalities to validate words for their eligibility in official Hellenic Scrabble tournaments and discover valid Scrabble words that can be formed from a given set of letters. Developed as the final project for the [CS50x](https://cs50.harvard.edu/x/) course by Harvard University, this project showcases a comprehensive application of modern web technologies and programming concepts.

## Features

1. **Word Validation**: Verify if a given Greek word is valid according to the official Hellenic Scrabble dictionary.
2. **Anagram Search**: Input a set of Greek letters and find all valid words (2-8 letters long) that can be formed.
3. **Wildcard Support**: Use one or two asterisks (*) as wildcards in Anagram Search to represent any letter.
4. **User-Friendly Interface**:
   - Clickable Greek Scrabble tiles for letter input.
   - Dynamic results display with enhanced readability.
   - Loading indicator for processing tasks.
   - Keyboard shortcuts: 'Enter' for submission and 'BACKSPACE' to delete the last input entry.

---

## Technical Details

This project is built using modern web technologies:

- **Frontend Framework**: Vue.js 3 with TypeScript.
- **Build Tool**: Vite for fast development and optimized production builds.
- **Data Storage**: IndexedDB for caching JSON data.
- **Styling**: Tailwind CSS for responsive, consistent, and modern UI design.
- **Deployment**: Hosted on GitHub Pages using the `gh-pages` package.
- **Data preprocessing**: JSON word data are generated from our Python powered scripts.

---

### Python Data Preparation

The project also includes a Python-based preprocessing pipeline that prepares the data used in the app. This process involves extracting, cleaning, and organizing the Greek Scrabble word lists into JSON files, which are then served to the frontend. The pipeline performs the following tasks:

1. **Data Extraction**: The Python scripts extract words from official Scrabble word lists (PDFs) and structure them into JSON files.
2. **Data Cleanup**: The extracted data for the words references contain words with greater than 8 characters, so we filter those entries. 
3. **Word Merging**: The raw word lists are merged with references from dictionaries to provide comprehensive data.
4. **Data Processing**: The data is processed to include additional metadata like word length, Scrabble points, and alphagrams (sorted letters).
5. **Data Splitting**: The final processed data is split into smaller files for efficient retrieval in the web app.

### Python Data Flow

After preprocessing, the data is automatically copied into the `public/data` folder of the Vue app using the `copyDataFiles.js` script, enabling seamless integration between the Python data preparation pipeline and the frontend.

---

## Design Decisions

1. **Word Data Organization**:
   - Data is divided into JSON files based on alphagrams and starting letters for efficient searching.
   - IndexedDB is utilized to minimize network requests and improve performance.

2. **Wildcard Implementation**:
   - Wildcards required updating the anagram generation logic to handle multiple combinations for each wildcard.

3. **Accessibility and Usability**:
   - ARIA roles and labels are integrated to enhance accessibility.
   - Keyboard shortcuts, such as 'Enter' for submission and 'BACKSPACE' to delete the last input entry, provide a seamless user experience.

4. **Dynamic Interface**:
   - The app dynamically adapts its results and settings based on the selected mode, ensuring an intuitive workflow.

---

## File Structure

- **`Python Scripts`**:
    - `data-prep/`: Contains Python scripts for preparing the word data.
        - `merge_scrabble_words_with_references.py`: Merges raw words with references from dictionaries.
        - `preprocess_scrabble_data.py`: Processes data, adds additional metadata like points and alphagrams.
        - `split_scrabble_data_for_web.py`: Splits the processed data for web usage based on starting letters and alphagrams.
- **`Vue App Scripts`**:
  - `copyDataFiles.js`: Script to copy the processed data into the Vue app’s public/data folder.

  - **`src/components`**:
    - `Header.vue`: Displays the app’s header with a title and navigation.
    - `Footer.vue`: Contains copyright and link to the source code.
    - `LetterTile.vue`: Represents clickable Greek Scrabble tiles.
    - `Results.vue`: Dynamically renders validation or anagram search results.

  - **`src/api`**:
    - `idb.ts`: Manages IndexedDB operations, such as storing and fetching cached data.
    - `dataFetcher.ts`: Handles fetching JSON files for alphagrams and starting letters.

  - **`src/utils`**:
    - `appHelpers.ts`: Contains utility functions like alphagram generation and wildcard handling.
    - `logger.ts`: Manages environment-specific logging.

  - **`src/views`**:
    - `App.vue`: The main component integrating the app's functionality.
    - `Modes.vue`: Handles mode selection (validation or anagram search).

  - **`public/data`**:
    - JSON datasets containing valid Greek Scrabble words categorized for efficient lookups.

---

## Usage Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/ApoGouv/scrabble-word-finder.git
   cd scrabble-word-finder
   ```

0. Run the Python data preprocessing:
   
   - Move to the `data-prep` folder
    ```bash
   cd data-prep
   ```

    > @see [Python packaging docs for: Create and Use Virtual Environments](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#create-and-use-virtual-environments) 
    
    For Windows: 
    - Create a Virtual Environment and activate it: 
    ```bash
    py -m venv .venv
    .venv\Scripts\activate
    ```

    - Install the required Python packages:
    ```bash
    py -m pip install -r requirements.txt
    ```

    - Run the data preprocessing pipeline:
    ```bash
    python pipeline.py 
    python split_scrabble_data_for_web.py 
    ```

3. Ensure the data is copied to the public/data folder using the copyDataFiles.js script:
    ```bash
    cd ../
    npm run copy-scrabble-web-data
    ```

4. Install npm dependencies:
    ```bash
    npm install
    ```

5. Run the Vite development server and test the app:
    ```bash
    npm run dev
    ```
    Open the app at localhost:5173.

6. Build the app for production:
    ```bash
    npm run build
    ```

## Challenges and Solutions

1. Data Caching:
   - Challenge: Fetching large JSON datasets could result in performance issues
   - Solution: Implemented IndexedDB to store and retrieve data locally. That way we only have to wait once for a JSON file we have not yet fetched and afterwards we are reading the data from IndexedDB.
  
2. Wildcard Logic:

   - Challenge: Generating all possible alphagrams with one or two wildcards was computationally intensive.
   - Solution: Optimized the logic by dynamically replacing wildcards and limiting combinations based on practical Scrabble scenarios.

3. Dynamic Results Display:

   - Challenge: Displaying results in an organized and visually appealing manner.
   - Solution: Grouped results by word length and styled them using Tailwind CSS for clarity.

## Future Enhancements

1. Custom Dictionaries: Allow users to upload and use their own word lists.
2. Statistics: Display player statistics like most frequent words or top scores.


## Conclusion

Scrabble Word Finder is a comprehensive tool for Greek Scrabble players. It combines advanced data processing with a user-friendly interface to deliver a seamless experience. This project challenged me to apply and expand my skills in programming, design, and optimization, and I am proud to present it as my CS50x final project.