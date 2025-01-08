![Scrabble Word Finder](public/scrabble-word-finder_preview.png?raw=true "Scrabble Word Finder")

# Scrabble Word Finder

Scrabble Word Finder is a web-based application designed for Greek Scrabble enthusiasts. It provides two main functionalities:
- **Word Validation**: Check if a Greek word is valid according to the official Hellenic Scrabble dictionary.
- **Anagram Search**: Find all valid Scrabble words that can be formed from a given set of letters.

Developed as the final project for the [CS50x](https://cs50.harvard.edu/x/) course by Harvard University, this app highlights the practical application of modern web technologies and programming principles, including Vue.js, TypeScript, IndexedDB, and Python for data processing.


## Features

1. **Word Validation**: Verify if a given Greek word is valid according to the official Hellenic Scrabble dictionary.
2. **Anagram Search**: Input a set of Greek letters and discover all valid words (2-8 letters long) that can be formed.
   - **Wildcard Support**: Use one or two asterisks (*) as wildcards to represent any letter in the Anagram Search.
   - **Letter Repetition Restrictions**: The app accounts for the Greek letter distribution used in Scrabble (e.g., 1 'Ψ' letter, 2 wildcards (blank tiles), etc.).
3. **User-Friendly Interface**:
   - Clickable Greek Scrabble tiles for easy letter selection.
   - Dynamic and clear results display.
   - Loading indicator to inform users during data processing.
   - Keyboard Shortcuts for improved navigation:
     - **'Enter'**: Submit input.
     - **'BACKSPACE'**: Delete the last entered character.
     - **'1'**: Switch to Word Validation mode.
     - **'2'**: Switch to Anagram Search mode.
     - **Keyboard letters**: English letters are mapped to Greek characters (both Greek and English characters are accepted for keyboard input).
4. **Data Caching**: IndexedDB is used to cache data after the first request, improving performance for subsequent queries. Note: the app is not offline-ready yet, as it requires an initial connection for data fetching.


## Technical Details

This project utilizes modern web technologies to ensure optimal performance and a seamless user experience:

- **Data Preprocessing**: Python scripts are used to extract, clean, and generate the Greek Scrabble word data, which is then served to the app as JSON files.
- - **Build Tool**: Vite is used for fast development, optimized production builds, and efficient module bundling.
- **Frontend Framework**: Vue.js 3 with TypeScript, offering a reactive, scalable, and type-safe UI for improved maintainability.
- **Data Storage**: IndexedDB is used for local caching of JSON word data, significantly improving load times and reducing redundant network requests after the first fetch.
- **Styling**: Tailwind CSS ensures a clean, responsive, and consistent design across different screen sizes and devices.
- **Deployment**: The app is hosted on GitHub Pages, utilizing the `gh-pages` package for easier deployment processes.


---

### Python Data Preparation

The project includes a Python-based preprocessing pipeline to prepare the data used in the app. The process involves extracting, cleaning, and organizing Greek Scrabble word lists into JSON files, which are then served to the frontend. The pipeline works with two primary sources:

1. **Αποδεκτές Λέξεις 2-8 Γραμμάτων (1/9/2024)**: This document contains all valid Greek words from 2 to 8 letters, with a total of 162,531 words extracted from 460 pages of the PDF. File is located in: `data-prep/assets/pdf/scrabble-acceptable-greek-words-2-8-2024_09_01.pdf`
2. **Κρυμμένες Λέξεις, 30ή έκδοση, Φεβρουάριος 2020**: This document provides additional valid words, including metadata like lemma, dictionary source, and example usage. It serves as a helpful reference for tournament officials and includes extra details that enrich the word entries. File is located in: `data-prep/assets/pdf/scrabble-word-refs-2020-02-12.pdf`

The preprocessing pipeline performs the following tasks:

1. **Data Extraction**:
   - Words are extracted from both PDF documents. The first PDF provides a basic list of valid words, while the second one adds metadata such as lemma, dictionary, and example comments.
   
2. **Data Cleanup**:
   - For the second list, a refinement script fixes entries with missing 'lemma' or 'dictionary' fields, ensuring the completeness of the metadata.

3. **Data Filtering**:
   - Words entries from the new fixed list that do not meet the 2-8 letter count restriction are discarded, maintaining consistency with the official Greek Scrabble rules.

4. **Word Merging**:
   - The raw word list from first PDF and the cleanedup list from the second PDF are merged, with the second document's metadata being added to the words from the first document, ensuring comprehensive word information.

5. **Data Processing**:
   - The merged data is further processed to include additional details like word length, Scrabble points, and alphagrams (sorted letters). This helps with validation and anagram search functionalities in the app.

6. **Data Splitting**:
   - The final processed data is split into two primary formats:
     - **Separate JSON files for each starting letter**: This results in 24 JSON files, one for each letter of the Greek alphabet. These are used for word validation in the frontend app.
     - **A single JSON file with words grouped by alphagram**: This file contains words sorted by their alphagram (sorted letters) without additional metadata, used for the anagram search functionality.

This comprehensive data pipeline ensures that the word data is well-structured, accurate, and optimized for use in the app, enabling fast and efficient word validation and anagram search features.


### Python Data Flow


Once the preprocessing pipeline completes, the generated JSON files are seamlessly integrated into the frontend app. This is achieved using the npm script:

```bash
npm run copy-scrabble-web-data
```

This script copies the processed JSON files into the `public/data` folder of the Vue app. Specifically:

   1. The 24 JSON files (one for each Greek alphabet letter) are used in the Word Validation mode.
   2. The single JSON file containing words grouped by alphagram is used in the Anagram Search mode.

This automated process ensures that the most up-to-date word data is always available in the app without manual intervention, streamlining the integration between the Python preprocessing pipeline and the Vue.js frontend.


## Design Decisions and Challenges

1. **Word Data Organization**  
   - **Design Decision**: Word data is structured for optimal performance:
     - JSON files are split by starting letters (24 files) for efficient word validation.  
     - A single JSON file grouped by alphagrams is used for rapid anagram searches.  
   - **Challenge**: Fetching large JSON datasets for word validation and anagram search could lead to performance issues.  
   - **Solution**: Implemented IndexedDB to cache data locally. Users only experience a delay during the initial fetch, and subsequent lookups are fast as data is read from IndexedDB. While the app is not yet offline-ready, this feature sets the foundation for future enhancements.

2. **Wildcard Implementation**  
   - **Design Decision**: The anagram search logic supports up to two wildcard characters (`*`), generating and evaluating multiple letter combinations for each wildcard to ensure accurate results. To handle the complexity of lookups efficiently, the JSON file for alphagrams is kept as a single file rather than split, minimizing file reads and speeding up anagram searches.  
   - **Challenge**: Generating all possible letter combinations for one or two wildcards (`*`) was computationally intensive. Additionally, some combinations were redundant due to the non-importance of letter order in anagrams.
   - **Solution**: 
     - To ensure uniqueness in the generated combinations, we utilized a **Set** to automatically remove duplicate entries.
     - We also applied the **alphagram** concept (sorting the letters alphabetically) to reduce redundancies. For example, when generating combinations for `α*`, we would produce:
       - `αα`, `αβ`, `βα`, `αγ`, `γα`, `αδ`, `δα`
     - After applying the alphagram logic (sorting and filtering), the unique combinations would be:
       - `αα`, `αβ`, `αγ`, `αδ`
     - This approach not only eliminated redundant combinations but also ensured that the anagram search logic remained efficient while maintaining accurate results.

3. **Accessibility and Usability**  
   - **Design Decision**: The app is designed with accessibility and ease of use in mind:
     - ARIA roles and labels are integrated to enhance accessibility for users with disabilities.  
     - Keyboard shortcuts improve usability:
       - **'Enter'**: Submit the current input for validation or search.  
       - **'Backspace'**: Remove the last entered letter.  
       - **'1'** and **'2'**: Switch between the Word Validation and Anagram Search modes.  
       - Greek and English letter input is supported, with automatic mapping to Greek characters.  
   - **Challenge**: Ensuring the app is intuitive for all users, including those relying on assistive technologies.  
   - **Solution**: ARIA roles, labels, and keyboard shortcuts ensure an inclusive and smooth user experience.

4. **Dynamic Interface**  
   - **Design Decision**: The interface dynamically updates results and settings based on the selected mode, offering a seamless workflow. Real-time feedback, including loading indicators during data processing, keeps users informed.  
   - **Challenge**: Displaying search results in an organized and visually appealing way.  
   - **Solution**: Results are grouped by word length and styled using Tailwind CSS, ensuring clarity and visual appeal.

These design choices collectively ensure the app is user-friendly, efficient, and aligned with modern web development best practices.


## Usage Instructions

Follow these steps to set up and run the **Scrabble Word Finder** app locally:

---

### 1. Clone the repository

Clone the project from GitHub and navigate to the project folder:

```bash
git clone https://github.com/ApoGouv/scrabble-word-finder.git
cd scrabble-word-finder
```

---

### 2. Run the Python data preprocessing

The preprocessing pipeline prepares the Scrabble word data for the app.

1. Navigate to the `data-prep` directory:
   ```bash
   cd data-prep
   ```

2. Create and activate a virtual environment:

   Refer to [Python packaging docs for: Create and Use Virtual Environments](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#create-and-use-virtual-environments) for detailed instructions.
 
   - **Windows**:
      ```bash
      py -m venv .venv
      .venv\Scripts\activate
      ```

   - **Linux/Mac**: 
      ```bash
      python3 -m venv .venv
      source .venv/bin/activate
      ```

3. Install the required Python packages:

   - **Windows**: 
      ```bash
      py -m pip install --upgrade pip
      py -m pip --version
      py -m pip install -r requirements.txt
      ```

   - **Linux/Mac**: 
      ```bash
      python3 -m pip install --upgrade pip
      python3 -m pip --version
      python3 -m pip install -r requirements.txt
      ```

4. Run the preprocessing scripts to generate JSON data:
   ```bash
   python pipeline.py
   python split_scrabble_data_for_web.py
   ```

--- 

### 3. Copy Data to the Frontend

Move back to the root directory and copy the processed data into the Vue app’s `public/data` folder:
```bash
cd ../
npm run copy-scrabble-web-data
```

---

### 4. Install Frontend Dependencies
Install all required npm packages:
```bash
npm install
```

---

### 5. Run the App in Development Mode
Start the development server:
```bash
npm run dev
```
The app will be available at: [http://localhost:5173](http://localhost:5173).

---

### 6. Build the App for Production
When ready to deploy, build the app:
```bash
npm run build
```

The production-ready files will be available in the `dist` directory.


## Future Enhancements

1. Custom Dictionaries: Allow users to upload and use their own word lists.
2. Statistics: Display player statistics like most frequent words or top scores.

1. **Offline Mode**: Enhance the app to function offline by caching all necessary data locally, allowing users to continue using it without an internet connection.
2. **Multilingual Support**: Expand the app to support additional languages, allowing users to play with Scrabble word lists in different languages.
3. **Custom Dictionaries**: Allow users to upload their own word lists in a compatible format (e.g., CSV, JSON) for personalized searching expirience.
4. **User Profiles & Statistics**: Enable users to create profiles and track  statistics such as most frequent words, total valid and invalid word searches.

## Cudos & Credits

We would like to extend our gratitude to the following resources and npm packages that made this app possible:

### NPM Packages
- [vue-toastification](https://github.com/Maronato/vue-toastification) - For providing toast notifications.
- [gh-pages](https://github.com/tschaub/gh-pages) - For deploying the app to GitHub Pages.

### Icons
- Icons sourced from [Icônes](https://icones.js.org/), built by @antfu, powered by Iconify, with custom Vue.js components created for this app.

### OpenAI ChatGPT
- Special thanks to [ChatGPT](https://openai.com/chatgpt) by OpenAI for providing invaluable after-hours support during the development of this app. Though some insights required corrections, its assistance was essential to the project.

### Scrabble Word Data
- The Greek Scrabble word data follows the official Greek competitive Scrabble word acceptance rules outlined by the [Panhellenic Scrabble Union (PES)](http://greekscrabble.gr). This includes:
  - [Αποδεκτές Λέξεις 2-8 Γραμμάτων (1/9/2024)](http://greekscrabble.gr/wp-content/uploads/2024/08/2-8-2024_09_01.pdf)
  - [Κρυμμένες Λέξεις, 30ή έκδοση, Φεβρουάριος 2020](http://greekscrabble.gr/wp-content/uploads/2020/02/krymmenes30.pdf)

## Trademark Notice

Scrabble™ (σκραμπλ) is a product and registered trademark of [Mattel Inc.](https://www.mattel.com/), distributed in the Greek market by [Mattel ΑΕΒΕ](http://www.mattel.gr).

## Contact or Feedback

We value your feedback! If you have any suggestions, comments, or issues, please feel free to visit our [GitHub repository](https://github.com/ApoGouv/scrabble-word-finder) to submit your feedback or report any bugs.


## Conclusion

**Scrabble Word Finder** is an efficient and user-friendly tool designed for Greek Scrabble players. By combining advanced data processing techniques with a clean, dynamic interface, the app offers a seamless experience for word validation and anagram search. This project allowed me to apply and deepen my skills in programming, data organization, and optimization. As my final project for the CS50x course, it’s a reflection of my learning journey, and I’m proud to share it as a valuable resource for the Scrabble community.
