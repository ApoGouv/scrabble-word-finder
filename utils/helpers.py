import json
import re


def remove_header_text(text, header_pattern):
    """
    Remove the header text from the given text using the provided regex pattern.

    :param text: The text to be cleaned.
    :param header_pattern: The regex pattern to identify the header text.
    :return: The cleaned text with the header removed.
    """
    return re.sub(header_pattern, '', text)

def remove_date_text(text, date_pattern):
    """
    Remove date patterns from the text using the provided regex pattern.

    :param text: The text to be cleaned.
    :param date_pattern: The regex pattern to identify date text.
    :return: The cleaned text with the date removed.
    """
    return re.sub(date_pattern, '', text)

def remove_page_numbers(text, page_number_pattern):
    """
    Remove page numbers from the text using the provided regex pattern.

    :param text: The text to be cleaned.
    :param page_number_pattern: The regex pattern to identify page numbers.
    :return: The cleaned text with the page numbers removed.
    """
    return re.sub(page_number_pattern, '', text)

def extract_words(text):
    """
    Split text into words and convert them to uppercase.
    
    :param text: The text to be split
    :return: List of cleaned words in uppercase
    """
    return [word.upper() for word in text.split() if word]

def save_to_txt(file_path, text, intro_text=""):
    """
    Save the given text to a text file. Optionally, a header can be added to the file.

    :param file_path: The path of the file where the text will be saved.
    :param text: The text to be saved.
    :param intro_text: Optional text to be added at the beginning of the file.
    :return: None
    """
    try:
        with open(file_path, "w", encoding="utf-8") as text_file:
            if intro_text:
                text_file.write(intro_text)
                text_file.write("\n\n")
            text_file.write(text)
        print(f"Text successfully saved to {file_path}")
    except Exception as e:
        print(f"Error saving Text to {file_path}: {e}")

def save_to_json(file_path, data):
    """
    Save data to a JSON file.
    
    :param file_path: Path to the JSON file
    :param data: Data to be written to JSON
    :return: None
    """
    try:
        with open(file_path, 'w', encoding='utf-8') as json_file:
            json.dump(data, json_file, ensure_ascii=False, indent=4)
        print(f"Data successfully saved to {file_path}")
    except Exception as e:
        print(f"Error saving JSON to {file_path}: {e}")