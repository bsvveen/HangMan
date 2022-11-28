import React, { useEffect, useState } from 'react';
import Drawing from './drawing';

export default function Hangman() {

    const [word, setWord] = React.useState('');

    const [Guesses, setGuesses] = useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await (await fetch('https://random-words-api.vercel.app/word/dutch')).json();                  
            setWord(String(response[0].word).toUpperCase());
        };
        fetchData();
    }, []);   
    
    const alphabets = ["A", "B", "C", "D", "E", "F", "G","H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    
    const maskedWord = word.split('').map(letter => Guesses.includes(letter) ? letter : "_").join(" ");    

    const drawing = [
        {row:4,col:0,char:'\u007C'},{row:3,col:0,char:'\u007C'},{row:2,col:0,char:'\u007C'},{row:1,col:0,char:'\u007C'},{row:0,col:0,char:'\u007C'},
        {row:0,col:1,char:'\u00AF'},{row:0,col:2,char:'\u00AF'},{row:0,col:3,char:'\u007C'},{row:1,col:3,char:'\u004F'},{row:2,col:2,char:'\u00AF'},
        {row:2,col:3,char:'\u007C'},{row:2,col:4,char:'\u00AF'},{row:3,col:3,char:'\u007C'},{row:4,col:2,char:'\u002F'},{row:4,col:4,char:'\u005C'}
    ];

    if (Guesses.length > drawing.length) {
        return (<div> Failed the word was:  {word} </div>)
    }

    if (maskedWord.replaceAll(' ', '') == word) {
        return (<div> You won with:  {word} </div>)
    }

    console.log(maskedWord + " = " + word);

    return (
        <div style={{display: "flex"}}><div style={{width: 500}}>
            <p>{maskedWord}</p>
            { alphabets.map((letter, index) => 
                <button key={index} 
                    onClick={() => { setGuesses([...Guesses, letter])}}
                    disabled={Guesses.includes(letter)}
                >
                { letter }
                </button>)}
        </div><div style={{flex: 1}}>
            {<Drawing Drawing={drawing} MaxIndex={Guesses.length} />}
        </div></div>
    );
}