import os

from extractors.extract_scrabble_word_refs import extract_scrabble_word_refs


def run_pipeline():
    """
    Run the full pipeline for extracting Scrabble words from the PDF.
    """

    # Generic Directories
    output_json_dir= "assets/data/json"
    if not os.path.exists(output_json_dir):
        os.makedirs(output_json_dir)

    output_txt_dir= "assets/data/txt"
    if not os.path.exists(output_txt_dir):
        os.makedirs(output_txt_dir)

    # Configuration for Scrabble Words (sw)
    sw_pdf_path = "assets/pdf/scrabble-acceptable-greek-words-2-8-2024_09_01.pdf"
    sw_start_page = 4
    sw_end_page = 463  # Maximum page number is 463

    # Directories and files
    sw_output_txt_dir = f"{output_txt_dir}/scrabble_words"
    # Create output directory if it doesn't exist
    if not os.path.exists(sw_output_txt_dir):
        os.makedirs(sw_output_txt_dir)

    sw_output_json_file = f"{output_json_dir}/scrabble_words.json"

    # Call the extraction function for Scrabble Words
    # extract_scrabble_words(sw_pdf_path, sw_start_page, sw_end_page, sw_output_txt_dir, sw_output_json_file)

    # Configuration for Scrabble Word References (swr)
    swr_pdf_path = "assets/pdf/scrabble-word-refs-2020-02-12.pdf"
    swr_start_page = 5
    swr_end_page = 6  # Maximum page number is 67

    swr_output_txt_dir = f"{output_txt_dir}/scrabble_word_refs"
    # Create output directory if it doesn't exist
    if not os.path.exists(swr_output_txt_dir):
        os.makedirs(swr_output_txt_dir)

    swr_output_json_file = f"{output_json_dir}/scrabble_words_with_refs.json"

    # Call the extraction function for Scrabble Words References
    extract_scrabble_word_refs(swr_pdf_path, swr_start_page, swr_end_page, swr_output_txt_dir, swr_output_json_file)

if __name__ == "__main__":
    run_pipeline()
