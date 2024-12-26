from utils.helpers import save_to_json
import json

def merge_scrabble_words_with_refs(
        dict_file="assets/data/json/scrabble_words_raw.json",
        fixed_file="assets/data/json/scrabble_words_filtered_2_to_8_chars.json",
        output_file="assets/data/json/merged_scrabble_words_with_refs.json"):
    """
    Merge all words from the dictionary JSON with data from the fixed JSON.

    :param dict_file: Path to the dictionary JSON file
    :param fixed_file: Path to the fixed JSON file
    :param output_file: Path to the output JSON file
    :return: None
    """
    try:
        # Load data from the dictionary JSON
        with open(dict_file, 'r', encoding='utf-8') as dict_json:
            dictionary_data = json.load(dict_json)["words"]
        
        # Load data from the fixed JSON
        with open(fixed_file, 'r', encoding='utf-8') as fixed_json:
            fixed_data = {entry['word']: entry for entry in json.load(fixed_json)}
        
        merged_data = []

        for word in dictionary_data:
            # Check if the word exists in the fixed data
            if word in fixed_data:
                merged_data.append(fixed_data[word])
            else:
                # Create a blank entry if no match is found
                merged_data.append({
                    "word": word,
                    "lemma": "",
                    "dictionary": "",
                    "comments": ""
                })
        
        # Save the merged data to the output file
        save_to_json(output_file, merged_data)
        print(f"Merged data saved successfully to {output_file}.")
        print(f"Total entries: {len(merged_data)}")
    
    except Exception as e:
        print(f"Error processing the files: {e}")

