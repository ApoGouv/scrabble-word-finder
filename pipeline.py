import os

from extractors.extract_scrabble_words_from_pdf import extract_scrabble_words
from extractors.extract_scrabble_word_refs_from_pdf import extract_scrabble_word_refs
from processors.fix_scrabble_word_refs import fix_scrabble_refs
from processors.filter_scrabble_word_refs_by_length import filter_scrabble_word_refs
from processors.merge_scrabble_words_with_references import merge_scrabble_words_with_refs
from processors.preprocess_scrabble_data import preprocess_scrabble_data

def run_pipeline():
    """
    Run the full pipeline for extracting Scrabble words from the PDF.
    """

    # Generic Directories
    json_output_dir = "assets/data/json"
    if not os.path.exists(json_output_dir):
        os.makedirs(json_output_dir)

    txt_output_dir = "assets/data/txt"
    if not os.path.exists(txt_output_dir):
        os.makedirs(txt_output_dir)

    # Configuration for Scrabble Words (sw)
    scrabble_words_pdf_path = "assets/pdf/scrabble-acceptable-greek-words-2-8-2024_09_01.pdf"
    scrabble_words_start_page = 4
    scrabble_words_end_page = 463  # Maximum page number is 463

    # Directories and files for Scrabble Words
    scrabble_words_txt_dir = f"{txt_output_dir}/scrabble_words_raw"
    # Create output directory if it doesn't exist
    if not os.path.exists(scrabble_words_txt_dir):
        os.makedirs(scrabble_words_txt_dir)

    scrabble_words_json_file = f"{json_output_dir}/scrabble_words_raw.json"

    # Extract Scrabble Words
    extract_scrabble_words(scrabble_words_pdf_path, scrabble_words_start_page, scrabble_words_end_page, scrabble_words_txt_dir, scrabble_words_json_file)

    # Configuration for Scrabble Word References (swr)
    scrabble_word_refs_pdf_path = "assets/pdf/scrabble-word-refs-2020-02-12.pdf"
    scrabble_word_refs_start_page = 5
    scrabble_word_refs_end_page = 67  # Maximum page number is 67

    scrabble_word_refs_txt_dir = f"{txt_output_dir}/scrabble_word_refs_raw"
    # Create output directory if it doesn't exist
    if not os.path.exists(scrabble_word_refs_txt_dir):
        os.makedirs(scrabble_word_refs_txt_dir)

    scrabble_word_refs_json_file = f"{json_output_dir}/scrabble_word_refs_raw.json"

    # Extract Scrabble Word References
    extract_scrabble_word_refs(scrabble_word_refs_pdf_path, scrabble_word_refs_start_page, scrabble_word_refs_end_page, scrabble_word_refs_txt_dir, scrabble_word_refs_json_file)

    # Fix Scrabble Word References
    scrabble_word_refs_fixed_json_file = f"{json_output_dir}/scrabble_word_refs_fixed.json"
    fix_scrabble_refs(scrabble_word_refs_json_file, scrabble_word_refs_fixed_json_file)

    # Filter Scrabble Words by Length (2 to 8 characters)
    filtered_scrabble_word_refs_json_file = f"{json_output_dir}/scrabble_words_filtered_2_to_8_chars.json"
    filter_scrabble_word_refs(scrabble_word_refs_fixed_json_file, filtered_scrabble_word_refs_json_file)

    # Merge Scrabble Words with References
    merged_scrabble_words_json_file = f"{json_output_dir}/merged_scrabble_words_with_refs.json"
    merge_scrabble_words_with_refs(
        dict_file=scrabble_words_json_file,
        fixed_file=filtered_scrabble_word_refs_json_file,
        output_file=merged_scrabble_words_json_file)

    # Final Preprocessing of Scrabble Words
    final_scrabble_words_json_file = f"{json_output_dir}/scrabble_words_2_to_8_chars.json"
    final_scrabble_words_metadata_json_file = f"{json_output_dir}/scrabble_words_2_to_8_chars_metadata.json"
    preprocess_scrabble_data(
        input_file=merged_scrabble_words_json_file, 
        output_words_file=final_scrabble_words_json_file, 
        output_stats_file=final_scrabble_words_metadata_json_file)

if __name__ == "__main__":
    run_pipeline()
