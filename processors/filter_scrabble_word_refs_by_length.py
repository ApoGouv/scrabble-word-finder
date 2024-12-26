from utils.helpers import save_to_json
import json

def filter_scrabble_word_refs(
        input_file="assets/data/json/scrabble_word_refs_fixed.json",
        output_file="assets/data/json/scrabble_words_filtered_2_to_8_chars.json"):
    """
    Filter entries to include only those where the first word in the 'word' field has 2-8 characters.

    :param input_file: Path to the input JSON file
    :param output_file: Path to the output JSON file
    :return: None
    """
    try:
        # Load the data from the input file
        with open(input_file, 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)
        
        filtered_data = []

        for entry in data:
            word_field = entry.get('word', "").strip()  # Safely get 'word' and strip whitespace
            if not word_field:  # Skip entries with empty 'word' fields
                print(f"Skipping entry due to empty 'word': {entry}")
                continue
            
            # Split the word field into individual words
            words = word_field.split()
            
            # Use the full 'word' field if splitting fails
            first_word = words[0] if words else word_field
            
            if 2 <= len(first_word) <= 8:
                # Update the word field to retain only the first word
                entry['word'] = first_word

                # Keep the entry if the first word's length is between 2 and 8
                filtered_data.append(entry)
        
        # Save the filtered data to the output file
        save_to_json(output_file, filtered_data)
        print(f"Filtered data saved successfully to {output_file}.")
        print(f"Total valid entries: {len(filtered_data)}")
    
    except Exception as e:
        print(f"Error processing the file: {e}")
