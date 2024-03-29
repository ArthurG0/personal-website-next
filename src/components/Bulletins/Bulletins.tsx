// @ts-nocheck
import styles from '../../styles/Bulletins.module.css'
import React, { useState , useEffect } from 'react'
import Link from 'next/link';
import KeyInputForm from './CodeInputForm';
import BulletinsText from './BulletinText';



function Bulletins(props: none) {

    // const [showText, setShowText] = useState('loren ipsum dolor sit amen. loren ipsum dolor sit amen. loren ipsum dolor sit amen. loren ipsum dolor sit amen. loren ipsum dolor sit amen.')
    const [showText, setShowText] = useState('')

    const DEBUG_MODE = false


    const updateShowText = (newText: string) => {
        setShowText(newText)
    }



    const returnHomeElement = 
        <Link className={styles.homeIcon} href="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32px" height="32px">
                <path d="M 16 2.59375 L 15.28125 3.28125 L 2.28125 16.28125 L 3.71875 17.71875 L 5 16.4375 L 5 28 L 14 28 L 14 18 L 18 18 L 18 28 L 27 28 L 27 16.4375 L 28.28125 17.71875 L 29.71875 16.28125 L 16.71875 3.28125 Z M 16 5.4375 L 25 14.4375 L 25 26 L 20 26 L 20 16 L 12 16 L 12 26 L 7 26 L 7 14.4375 Z"/>
            </svg>
        </Link>



    return (
        <div className={styles.blnts_container}>
            <BulletinsText
                text={showText}
            />
            {returnHomeElement}
            <KeyInputForm
                updateShowText={updateShowText}
            />
            {
                DEBUG_MODE ?
                <>
                <button onClick={() => updateShowText('')}>Click me for nothing</button>
                <button onClick={() => updateShowText('apple apple apple apple apple apple apple')}>Click me for text</button>
                </> : ""
            }
        </div>
    )

}

export default Bulletins