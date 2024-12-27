import os
import json

def split_data_by_starting_letter(data, output_dir):
    """
    Split data into separate JSON files based on the starting letter of each word.
    """
    # Group words by starting letter
    grouped_data = {}
    for entry in data:
        starting_letter = entry["word"][0].upper()
        if starting_letter not in grouped_data:
            grouped_data[starting_letter] = []
        grouped_data[starting_letter].append(entry)

    # Write each group to a separate file
    for letter, words in grouped_data.items():
        letter_file_readable = os.path.join(output_dir, f"words_starting_with_{letter}.json")
        letter_file_minified = os.path.join(output_dir, f"words_starting_with_{letter}_min.json")

        # Write readable version
        with open(letter_file_readable, "w", encoding="utf-8") as f:
            json.dump(words, f, ensure_ascii=False, indent=2)

        # Write minified version
        with open(letter_file_minified, "w", encoding="utf-8") as f:
            json.dump(words, f, ensure_ascii=False)

def split_data_by_anagram(data, output_dir):
    """
    Split data into a single JSON file grouped by anagrams, without metadata.
    """
    # Group words by anagram (sorted letters)
    grouped_anagrams = {}
    for entry in data:
        anagram_key = entry["alphagram"]
        if anagram_key not in grouped_anagrams:
            grouped_anagrams[anagram_key] = []
        grouped_anagrams[anagram_key].append(entry["word"])

    # Write readable version
    anagrams_file_readable = os.path.join(output_dir, "words_grouped_by_anagrams.json")
    with open(anagrams_file_readable, "w", encoding="utf-8") as f:
        json.dump(grouped_anagrams, f, ensure_ascii=False, indent=2)

    # Write minified version
    anagrams_file_minified = os.path.join(output_dir, "words_grouped_by_anagrams_min.json")
    with open(anagrams_file_minified, "w", encoding="utf-8") as f:
        json.dump(grouped_anagrams, f, ensure_ascii=False)

if __name__ == "__main__":
    # File paths
    final_scrabble_words_json_file = "assets/data/json/scrabble_words_2_to_8_chars.json"
    web_output_dir = "assets/web_data"

    # Create output directory if it doesn't exist
    if not os.path.exists(web_output_dir):
        os.makedirs(web_output_dir)

    # Load the data
    with open(final_scrabble_words_json_file, "r", encoding="utf-8") as f:
        scrabble_data = json.load(f)

    # Split data by starting letter
    words_by_letter_dir = os.path.join(web_output_dir, "words_by_starting_letter")
    os.makedirs(words_by_letter_dir, exist_ok=True)
    split_data_by_starting_letter(scrabble_data, words_by_letter_dir)

    # Split data by anagrams
    words_by_anagrams_dir = os.path.join(web_output_dir, "words_by_anagram")
    os.makedirs(words_by_anagrams_dir, exist_ok=True)
    split_data_by_anagram(scrabble_data, words_by_anagrams_dir)

    print(f"Data successfully split and stored in {web_output_dir}")
