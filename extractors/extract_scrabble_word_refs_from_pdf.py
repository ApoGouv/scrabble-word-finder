

import pymupdf  # PyMuPDF

from utils.helpers import save_to_json, save_to_txt


def extract_scrabble_word_refs(
        swr_pdf_path="assets/pdf/scrabble-word-refs-2020-02-12.pdf", 
        swr_start_page=4, 
        swr_end_page=67, 
        swr_output_txt_dir="assets/data/txt/scrabble_word_refs_raw", 
        swr_output_json_file="assets/data/json/scrabble_word_refs_raw.json",
        swr_stats_file="assets/data/txt/scrabble_word_refs_raw_stats.txt"):
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
    pdf_doc = pymupdf.open(swr_pdf_path)

    # Containers for all the word refs and stats
    word_refs = []
    stats = {
        "total_pages_to_process": swr_end_page - swr_start_page + 1,
        "total_pages_processed": 0,
        "total_entries_extracted": 0,
        "unique_dictionaries": set(),
        "entries_missing_fields": 0,
        "empty_comments_count": 0,
        "empty_lemma": {"count": 0, "words": []},
        "empty_dictionary": {"count": 0, "words": []},
    }

    print(f"PDF doc pages: {pdf_doc.page_count}\n")

    def merge_text(current, new):
        """Helper to merge text spans."""
        return f"{current} {new}".strip()

    # Iterate through the specified pages
    for page_number in range(swr_start_page - 1, swr_end_page):
        page = pdf_doc[page_number]
        stats["total_pages_processed"] += 1

        """
        Extract text blocks. Textpage content as a list of text lines grouped by block. Each list items looks like this:
        (x0, y0, x1, y1, "lines in the block", block_no, block_type)
        """
        page_dict = page.get_text("dict", sort=True)
        page_blocks = page_dict.get("blocks", [])

        # Iterate through the blocks
        for block in page_blocks:
            # Skip first block as it includes the table headers
            if block["number"] == 0:
                continue

            # Skip non-text blocks
            if block["type"] != 0:
                continue
            
            current_entry = {"word": "", "lemma": "", "dictionary": "", "comments": ""}
            last_field = "word"

            # Iterate through the lines and spans
            for line in block.get("lines", []):
                # Process the first span and check if there are multiple spans in the line
                spans = line.get("spans", [])
                if spans:
                    first_span = spans[0]
                    x0 = first_span["bbox"][0]
                    text = first_span["text"].strip()

                    # Debug known problematic cases
                    if text in {"ΑΔΗΛΟΣ, ΚΡΥΦΙΟΣ ΤΡΙΑΝ", "ΑΔΟΛΕΣΧΩ (-ΕΙΣ) ΑΔΟΛΕΣΧΙΑ"}:
                        print("\n### Debugging Specific Case ###\n")
                        print(f"Full Line Details: {line}\n")
                        print(f"Line Text: {text}, x0: {x0}\n")
                        for span in spans:
                            print(f"Span Text: {span['text']}, x0: {span['bbox'][0]}\n")

                    # Identify columns based on x0 and assign values
                    if 30.00 <= x0 <= 30.99:  # Indicates a new word
                        # Save the previous entry if not empty
                        if current_entry["word"] and last_field != "word":
                            # Check for empty lemma
                            if not current_entry["lemma"]:
                                stats["entries_missing_fields"] += 1
                                stats["empty_lemma"]["count"] += 1
                                stats["empty_lemma"]["words"].append(current_entry["word"])
                            
                            # Check for empty dictionary
                            if not current_entry["dictionary"]:
                                stats["entries_missing_fields"] += 1
                                stats["empty_dictionary"]["count"] += 1
                                stats["empty_dictionary"]["words"].append(current_entry["word"])
                            
                            # Check for empty comments
                            if not current_entry["comments"]:
                                stats["empty_comments_count"] += 1

                            word_refs.append(current_entry)
                            stats["total_entries_extracted"] += 1
                            current_entry = {"word": "", "lemma": "", "dictionary": "", "comments": ""}
                        current_entry["word"] = merge_text(current_entry["word"], text)
                        last_field = "word"

                    elif 102.00 <= x0 <= 102.99:  # Indicates lemma
                        current_entry["lemma"] = merge_text(current_entry["lemma"], text)
                        last_field = "lemma"

                    elif 185.00 <= x0 <= 185.99:  # Indicates dictionary
                        current_entry["dictionary"] = merge_text(current_entry["dictionary"], text)
                        stats["unique_dictionaries"].add(current_entry["dictionary"])
                        last_field = "dictionary"

                    elif 232.00 <= x0 <= 232.99:  # Indicates comment
                        if last_field == "comments":
                            current_entry["comments"] = merge_text(current_entry["comments"], text)
                        else:
                            current_entry["comments"] = text
                        last_field = "comments"

                    # Merge the remaining spans (if any) to the first span's text
                    for span in spans[1:]:
                        current_text = span["text"].strip()
                        if current_text:
                            current_entry[last_field] = merge_text(current_entry[last_field], current_text)

            # Append the final entry
            if current_entry["word"]:
                # Check for empty lemma
                if not current_entry["lemma"]:
                    stats["entries_missing_fields"] += 1
                    stats["empty_lemma"]["count"] += 1
                    stats["empty_lemma"]["words"].append(current_entry["word"])
                
                # Check for empty dictionary
                if not current_entry["dictionary"]:
                    stats["entries_missing_fields"] += 1
                    stats["empty_dictionary"]["count"] += 1
                    stats["empty_dictionary"]["words"].append(current_entry["word"])
                
                # Check for empty comments
                if not current_entry["comments"]:
                    stats["empty_comments_count"] += 1
                word_refs.append(current_entry)
                stats["total_entries_extracted"] += 1

    # Close the document
    pdf_doc.close()

    # Save results to JSON
    save_to_json(swr_output_json_file, word_refs)

    # Format stats for output
    stats_summary = (
        f"\nExtraction Statistics:\n"
        f"======================\n"
        f"Total Pages Processed: {stats['total_pages_processed']}\n"
        f"Total Entries Extracted: {stats['total_entries_extracted']}\n"
        f"Unique Dictionary Values: {len(stats['unique_dictionaries'])}\n"
        f"Entries Missing Fields: {stats['entries_missing_fields']}\n"
        f"Entries with Empty Comments: {stats['empty_comments_count']}\n"
        f"Entries with Empty Lemma: {stats['empty_lemma']['count']}\n"
        f"Words with Empty Lemma: {', '.join(stats['empty_lemma']['words'][:10])} ...\n"  # Limit to 10 words for brevity
        f"Entries with Empty Dictionary: {stats['empty_dictionary']['count']}\n"
        f"Words with Empty Dictionary: {', '.join(stats['empty_dictionary']['words'][:10])} ...\n"
        f"Unique Dictionary Entries: {' | '.join(stats['unique_dictionaries'])}\n"
    )
    print(stats_summary)

    # Save stats to a text file
    save_to_txt(swr_stats_file, stats_summary)

    save_to_txt(
        "assets/data/txt/empty_fields_stats.txt",
        f"Empty Lemma Entries:\n{', '.join(stats['empty_lemma']['words'])}\n\n"
        f"Empty Dictionary Entries:\n{', '.join(stats['empty_dictionary']['words'])}\n"
    )
    
