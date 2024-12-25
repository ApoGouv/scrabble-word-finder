from utils.helpers import save_to_json
import json

# Greek Scrabble points based on the Wikipedia description
scrabble_points_gr = {
    'Α': 1, 'Ο': 1, 'Ε': 1, 'Ι': 1, 'Τ': 1, 'Η': 1, 'Σ': 1, 'Ν': 1,
    'Ρ': 2, 'Κ': 2, 'Π': 2, 'Υ': 2,
    'Λ': 3, 'Μ': 3, 'Ω': 3,
    'Γ': 4, 'Δ': 4,
    'Β': 8, 'Φ': 8, 'Χ': 8,
    'Ζ': 10, 'Θ': 10, 'Ξ': 10, 'Ψ': 10,
}

def preprocess_scrabble_data(
        input_file="assets/data/json/merged_scrabble_words.json", 
        output_words_file="assets/data/json/scrabble_words_2_to_8_chars.json", 
        output_stats_file="assets/data/json/scrabble_words_2_to_8_chars_metadata.json"):
    """
    Processes the Scrabble word data and calculates the necessary fields.

    Args:
        input_file (str): Path to the input JSON file containing the merged scrabble words.
        output_words_file (str): Path to the output JSON file to save the processed word data.
        output_stats_file (str): Path to the output JSON file to save the statistics.

    Returns:
        None
    """
    # Load the merged scrabble words JSON
    with open(input_file, 'r', encoding='utf-8') as f:
        words = json.load(f)

    processed_words = []
    min_length = float('inf')
    max_length = 0

    # Loop through the words and process each
    for word_entry in words:
        word = word_entry['word']
        
        # Calculate the alphagram (sorted letters)
        alphagram = ''.join(sorted(word.upper()))
        
        # Calculate the length of the word
        length = len(word)
        
        # Calculate the Scrabble points for the word
        points = sum(scrabble_points_gr.get(letter.upper(), 0) for letter in word)
        
        # Update min and max lengths for stats purposes
        min_length = min(min_length, length)
        max_length = max(max_length, length)
        
        # Add the new keys to the word entry
        word_entry['alphagram'] = alphagram
        word_entry['length'] = length
        word_entry['points'] = points

        processed_words.append(word_entry)

    # Prepare the final stats
    stats = {
        'total_words': len(processed_words),
        'min_length': min_length,
        'max_length': max_length
    }

    # Save the processed words directly to the file
    save_to_json(output_words_file, processed_words)

    # Save the stats to scrabble_words_metadata.json
    save_to_json(output_stats_file, stats)

    print(f"Preprocessing complete. Total words: {len(processed_words)}, Min length: {min_length}, Max length: {max_length}.")
