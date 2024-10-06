// @ts-nocheck
import styles from '../styles/RussianTyper.module.css'
import React, { useState , useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ENGLISH_TO_RUSSIAN_KEYBOARD } from '../constants/russian-conversion-table'
import Link from 'next/link';


function RussianTyper(props: none) {

    const [typedText, setTypedText] = useState('')

    const handleChange = (event) => {
        setTypedText(event.target.value)
    }

    const copyOriginal = () => {
        var copyText = document.getElementById("inputBox");

        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);

        toast.success('Copied text successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    }

    const copyTransformed = () => {
        var copyText = document.getElementById("copyBox");

        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
        toast.success('Copied text successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    }


    const transformEnglishToRussian = (englishText) => {

        let outputText = ''
        
        for(let i = 0; i < englishText.length; i++){
            if (englishText[i] in ENGLISH_TO_RUSSIAN_KEYBOARD) {
                outputText += ENGLISH_TO_RUSSIAN_KEYBOARD[englishText[i]]
            } else {
                outputText += englishText[i]
            }
        }

        return outputText

    }

    const transformedText = transformEnglishToRussian(typedText)


    const returnHomeElement = 
        <Link className={styles.homeIcon} href="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32px" height="32px">
                <path d="M 16 2.59375 L 15.28125 3.28125 L 2.28125 16.28125 L 3.71875 17.71875 L 5 16.4375 L 5 28 L 14 28 L 14 18 L 18 18 L 18 28 L 27 28 L 27 16.4375 L 28.28125 17.71875 L 29.71875 16.28125 L 16.71875 3.28125 Z M 16 5.4375 L 25 14.4375 L 25 26 L 20 26 L 20 16 L 12 16 L 12 26 L 7 26 L 7 14.4375 Z"/>
            </svg>
        </Link>



    return (
        <div style={{textAlign: 'center', paddingTop: '10vh'}}>
            <h3 style={{maxWidth: '60%', margin: 'auto'}} id='instr-1'>Need to type something in Russian but no Russian keyboard handy? Know where all the Russian keys are but have to stick to an English keyboard (on desktop)? Then this page is for you!</h3>
            <p style={{maxWidth: '60%', margin: 'auto', padding: '2vh 0'}} id='instr-2'>Type something using English letters, and letters will show as if you're typing on a Russian keyboard!</p>
            <form>

            <textarea className={styles.inputBox} id="inputBox" rows="5" cols="50" type='text' autoFocus value={typedText} onChange={handleChange} placeholder="Enter text here:"></textarea>
            <br></br>
            <textarea className={styles.inputBox} id="copyBox" rows="5" cols="50" type='text' readOnly value={transformedText}></textarea>
            <br></br>
            <input className={styles.Button} type="button" value="Copy original" onClick={copyOriginal}/>
            <input className={styles.Button} type="button" value="Copy transformed" onClick={copyTransformed}/>
            </form>
            <ToastContainer/>
            {returnHomeElement}
        </div>
    )

}

export default RussianTyper