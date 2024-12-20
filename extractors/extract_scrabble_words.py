
import pymupdf  # PyMuPDF

from utils.helpers import extract_words, remove_date_text, remove_header_text, remove_page_numbers, save_to_json, save_to_txt


def extract_scrabble_words(
        pdf_path="assets/pdf/scrabble-acceptable-greek-words-2-8-2024_09_01.pdf", 
        start_page=4, 
        end_page=463, 
        output_txt_dir="assets/data/txt/scrabble_words", 
        output_json_file="assets/data/json/scrabble_words.json",
        stats_file="assets/data/txt/scrabble_words_stats.txt"):
    """
    Extract Scrabble words from a given PDF, clean up the text, and save the results.
    
    :param pdf_path: Path to the PDF file
    :param start_page: The starting page number (0-based index)
    :param end_page: The ending page number (0-based index)
    :param output_txt_dir: Directory where text files should be saved
    :param output_json_file: Path to the JSON file where words will be saved
    :param stats_file: Path to the text file where statistics will be saved
    :return: None
    """

    # Open the PDF file
    document = pymupdf.open(pdf_path)

    # Define regex patterns for header, page number, and date
    header_pattern = r"ΑΠΟΔΕΚΤΕΣ ΛΕΞΕΙΣ 2-8 ΓΡΑΜΜΑΤΩΝ"  # Header text
    date_pattern = r"[Α-Ωα-ωΊΪΌΆΈΎΫΉΏίϊΐόάέύϋΰήώ]+\s+\d{4}"  # Month and year
    page_number_pattern = r"\d{1,3}" # Page number (e.g., "1", "2", etc.)

    # Containers for all the words and stats
    all_words = []
    stats = []

    # Calculate total pages to process
    total_pages = end_page - start_page + 1
    pages_processed = 0

    # Iterate through the specified pages
    for page_number in range(start_page - 1, end_page):
        page = document[page_number]
        display_page_number = page_number + 1
        
        # Extract full text from the page
        # TODO: we may use "words" here instead of "text" to get the words
        full_text = page.get_text("text").strip()

        # print(f"Full text from page {page_number + 1}:")
        # print(full_text)

        # Save full text to a file
        output_text_file = f"{output_txt_dir}/page_{display_page_number}_full_text.txt"
        save_to_txt(output_text_file, full_text, intro_text=f"Full text from page {display_page_number}:")

        
        # Remove header, page number, and date entries using regex
        cleaned_text = remove_header_text(full_text, header_pattern)
        cleaned_text = remove_date_text(cleaned_text, date_pattern)
        cleaned_text = remove_page_numbers(cleaned_text, page_number_pattern)

        # Split the cleaned text into words and store in uppercase
        words = extract_words(cleaned_text)
        all_words.extend(words)

        # Record stats for the page
        stats.append(f"Page {display_page_number}: {len(words)} words extracted")
        pages_processed += 1
    
    # Close the document
    document.close()

    # Remove duplicates and sort the words alphabetically
    unique_words = sorted(set(all_words))

    stats.extend([
        f"Total pages to process: {total_pages}",
        f"Total pages actually processed: {pages_processed}",
        f"Total words extracted (including duplicates): {len(all_words)}",
        f"Total unique words: {len(unique_words)}",
    ])

    # Save statistics to a file
    save_to_txt(stats_file, "\n".join(stats), intro_text="Scrabble Words Extraction Statistics")

    # Print statistics to the console
    for stat in stats:
        print(stat)

    # Store the sorted words in a JSON file
    save_to_json(output_json_file, {"words": unique_words})
    