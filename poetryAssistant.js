/*start of code written taking reference from https://copyprogramming.com/howto/javascript-convert-given-text-to-an-array-javascript*/
//this function stores each word from the text file as an element in a vector (implemented as an array)
async function wordListVector() {
    
    const response = await fetch('wordlist.txt');//fetching the text file
    const text = await response.text();//extracting the text content from the file
    var vector=text.trim().split("\n");//splitting the content by each line, as each line contains a different word
    
/*end of code written taking reference from https://copyprogramming.com/howto/javascript-convert-given-text-to-an-array-javascript*/
    
    // my original code to implement the vector as an array
    //moving the first element of the vector to the end of the array.
    vector[vector.length]=vector[0];
    //storing the length of the vector in the first element of the array.
    vector[0]=vector.length-1
    
    //returning the vector containing each word from the word list
    return vector;
}

 
/*my original algorithm*/
function search(input) { 

    //Function to extract the ending of the input word.
    function extractEnding(input){
        //If the last letter is not a vowel, my algorithm starts searching from the last letter and moving backwards, until it finds the last vowel of the word. Then, it searches for the first consonant/blank before this vowel. All the letters after this consonant/blank are returned as the word ending.
        if(input[input.length-1]!="a" && input[input.length-1]!="e" && input[input.length-1]!="i" && input[input.length-1]!="o" && input[input.length-1]!="u")
            {
                var index=input.length-1;//index of last letter
            }
        //For the special case of words ending in a vowel, my algorithm starts searching from the second-last letter until it finds a vowel. Then it searches for the first consonant/blank before this vowel. It returns all the letters after this consonant/blank as the word ending. Hence, for words like 'chase', and 'fleece', it returns 'ase' and 'eece', instead of simply returning 'e'. 
        else
            {
                var index=input.length-2;//index of second-last letter
            }
        
        //For loop to check the letters of the word, traversing backwards from the last letter
        for(index;index>=0;index--)
        {
                //This conditional statement finds the last vowel (second-last if the last letter is a vowel)
                if(input[index]=="a" || input[index]=="e"|| input[index]=="i"|| input[index]=="o"|| input[index]=="u")
                {
                    //Once the last/second-last vowel is found, the index is decreased by 1, in order to check the letter before it
                    index-=1;
                    
                    //If the letter at this index is a vowel (not a consonant), the index value is decremented again. This condition continues iterating as long as the letter at the given index is a vowel (not a consonant/blank).
                    if(input[index]=="a" || input[index]=="e"|| input[index]=="i"|| input[index]=="o"|| input[index]=="u")
                        {
                            index-=1;
                        }
                            //the index reaches a position where there is no vowel (either a consonant, or no more letters) 
                            //Incrementing the index by 1 so that it is at the first vowel after the consonant/blank.
                            index+=1;
                            
                            //The variable n stores the number of letters in the word ending.
                            var n = input.length - index
                            //Using the slice() method to store the word ending in a variable
                           
                            var Ending = input.slice(-n);
                            //returning the word ending
                            return Ending;
                }
        }
    }
    //callback function to search for rhyming words, after the word list has been stored in a vector
    wordListVector().then(function searchingRhymes (wordsVector) {
        
        //storing the ending of the input word
        var inputEnding = extractEnding(input);
        //creating a dynamic array to store rhyming words
        var rhymesDynamicArray=[];
        //the length of the empty dynamic array is 0
        rhymesDynamicArray[0]=0;
        //if the ending of the input word could not be extracted, it was not a valid word
        if (!inputEnding)
            {
                //printing the message to the console
                console.log("You did not enter a valid word");
                
                //printing the message to the user interface
                var rhyme = document.createElement('div');
                rhyme.innerHTML = "You did not enter a valid word";
                document.body.appendChild(rhyme);
            }
        else 
            {
            //for loop to traverse the vector containing the list of words
            //starting from index 1, as index 0 contains length of the vector
            //the loop terminates when all the words in the words list have been examined, when i equals the length of the vecor which is stored in index 0 of the array.
            for(i=1;i<=wordsVector[0];i++)
                {
                    //the variable Ending stores the ending of each word from the word list
                    var n = inputEnding.length;
                    var Ending = wordsVector[i].slice(-n);//the slice method is used to extract an ending as long as the ending of the input word.

                    //conditional statement that pushes words from the word list to the dynamic array containing rhymes, 
                    //checking that the word is different from the input word
                    if (input!=wordsVector[i])
                        {
                            //checking if the ending of the word and input word match
                            if(Ending == inputEnding)
                              {
                                  rhymesDynamicArray.push(" "+wordsVector[i]);//this statement pushes rhymes to the dynamic array, adds a space between them
                                  rhymesDynamicArray[0]+=1;//the length of the dynamic array, stored in index 0, is incremented
                              }
                        }
                }
        
                //If the dynamic array contains rhymes, it is printed to the console.
                if (rhymesDynamicArray[0]!=0)
                {
                    //printing the rhymes dynamic array to the console
                    console.log(rhymesDynamicArray);
                    
                    //printing the rhymes dynamic array to the interface
                    var rhyme = document.createElement('div');
                    rhyme.innerHTML=rhymesDynamicArray;
                    document.body.appendChild(rhyme);
                }
                //If the dynamic array for rhymes is empty, a message is printed to the console.
                else
                {
                    //printing the message to the console
                    console.log("Could not find any rhymes");
                    
                    //printing the message to the interface
                    var rhyme = document.createElement('div');
                    rhyme.innerHTML = "Could not find any rhymes";
                    document.body.appendChild(rhyme);

                }
            }
    });
}


function newWord(){
    //When the user clicks for a new word, this line of code clears all content from the body of the webpage except the button.
    document.body.innerHTML="<button onclick='newWord()'>Enter a new word</button>"
    
    //creating a prompt for the user to input a word
    var input = prompt("Enter a word to search for rhymes. Use only lowercase letters and no spaces");
    
    search(input);//calling the function to search for rhymes, passing the input word as a parameter
}
/*end of my original algorithm*/
