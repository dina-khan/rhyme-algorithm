# Poetry Rhyme Finder

> A phonetic rhyme-search algorithm built in vanilla JavaScript that finds 
> rhyming words for any user-inputted word from a word list.

**Tech Stack:** HTML · CSS · JavaScript · p5.js

🔍 **[Open in Browser](https://dina-khan.github.io/poetry-rhyme-finder/)** 

 📄 **[View Report](docs/report.pdf)**

---

## How It Works

The algorithm extracts the **word ending** of the input word using a 
vowel/consonant traversal approach:

- Finds the position of the last vowel in the word
- Finds the first consonant before it
- Extracts all letters after that consonant as the word ending

Special case: if the word ends in a vowel (e.g. "chase"), the second-last 
vowel is used instead, so the ending returned is "ase" not just "e".

The extracted ending is then compared against every word in a word list 
stored as a **vector**. Matches are pushed to a **dynamic array** and 
displayed to the user.

## Data Structures
- **Vector** - stores the fixed word list (no insertion/deletion needed)
- **Dynamic Array** - stores rhymes as they are found (extensible)

## Run
Open `index.html` in a browser - no server needed.