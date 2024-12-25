from utils.helpers import save_to_json
import json

def fix_scrabble_refs(
        input_file="assets/data/json/scrabble_words_with_refs.json",
        output_file="assets/data/json/scrabble_words_with_refs_fixed.json"):
    """
    Fix entries with empty 'lemma' or 'dictionary' fields in a JSON file.

    :param input_file: Path to the input JSON file
    :param output_file: Path to the output JSON file
    :return: None
    """
    try:
        # Load the data from the input file
        with open(input_file, 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)
        
        for entry in data:
            # Skip entries where both 'lemma' and 'dictionary' are empty
            if not entry['lemma'] and not entry['dictionary']:
                continue

            # Fix empty 'lemma' field
            if not entry['lemma']:
                # Assume lemma is the last word in the 'word' field split by spaces
                words = entry['word'].split()

                # If the word field contains more than one word, extract the last word as the lemma
                if len(words) > 1:
                    entry['lemma'] = words[-1]

                    # Remove the extracted lemma from the 'word' field
                    entry['word'] = ' '.join(words[:-1]).strip()
            
            # Fix empty 'dictionary' field
            if not entry['dictionary']:
                # Assume dictionary is the last word in the 'lemma' field split by spaces
                lemmas = entry['lemma'].split()

                # If the lemma field contains more than one word, extract the last word as the dictionary
                if len(lemmas) > 1:
                    entry['dictionary'] = lemmas[-1]

                    # Remove the extracted dictionary from the 'lemma' field
                    entry['lemma'] = ' '.join(lemmas[:-1]).strip()
        
        # Save the fixed data to the output file
        save_to_json(output_file, data)
        print("Entries fixed and saved successfully.")
    
    except Exception as e:
        print(f"Error processing the file: {e}")

