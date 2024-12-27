import re

#################################
# TESTING
#################################

# date_pattern = r"^(Ιανουάριος|Φεβρουάριος|Μάρτιος|Απρίλιος|Μάιος|Ιούνιος|Ιούλιος|Αύγουστος|Σεπτέμβριος|Οκτώβριος|Νοέμβριος|Δεκέμβριος)+\s+\d{4}$"  # Month and year

# Define the pattern to match Greek month and year (space between month and year)
# date_pattern = r"(Ιανουάριος|Φεβρουάριος|Μάρτιος|Απρίλιος|Μάιος|Ιούνιος|Ιούλιος|Αύγουστος|Σεπτέμβριος|Οκτώβριος|Νοέμβριος|Δεκέμβριος)\s+\d{4}"

date_pattern = r"[Α-Ωα-ωΊΪΌΆΈΎΫΉΏίϊΐόάέύϋΰήώ]+\s+\d{4}"  # Month and year

test = """ΑΒΑΦΟΙ
ΑΒΓΟΚΟΨΕ
ΑΒΕΡΤΗΣ
ΑΒΙΩΤΗΣ
ΑΠΟΔΕΚΤΕΣ ΛΕΞΕΙΣ 2-8 ΓΡΑΜΜΑΤΩΝ
4
Σεπτέμβριος 2024

"""

cleaned_text = re.sub(date_pattern, '', test)  # Remove date

output_test_text_after_date_file = "assets/data/full_test_text_after_date.txt"
with open(output_test_text_after_date_file, "w", encoding="utf-8") as text_file:
    # Save the full text to the file
    text_file.write(cleaned_text)


quit()