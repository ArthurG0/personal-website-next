// @ts-nocheck
import styles from '../../styles/Bulletins.module.css'
import React, { useState , useEffect, useRef } from 'react'
import Link from 'next/link';



function KeyInputForm(props: none) {

    const NUM_KEYS_IN_CODE = 6

    const [indexSelected, setIndexSelected] = useState(0)
    const [formIsActive, setFormIsActive] = useState(false)
    const [inputString, setInputString] = useState('')

    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ]

    const getInputStyle = (index: Number) => {

        let styleObject = {
            padding: '1.4vw',
            margin: '1vw',
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '20px',
            fontSize: '1.6rem',
            textAlign: 'center',

        }
        

        return styleObject
    }

    const formOnClick = (e: Event) => {
        e.preventDefault()
        console.log('form clicked')
        setFormIsActive(true)
    }

    const textFieldOnBlur = (e: Event) => {
        e.preventDefault()
        console.log('form on blue')
        e.target.blur()
    }

    const textFieldOnFocus = (e: Event) => {
        // e.preventDefault()
        // console.log('form on capture')
        // e.target.blur()
    }

    const handleCellTextChange = (e:Event, index: Number) => {
        console.log('text changed in cell')
        console.log(e)
        console.log(index)

        if(e.target.value == ''){
            setInputString(() => {
                let s = ''
                inputRefs.forEach(x => s+=x.current.value)
                return s
            })
        }

        else if(e.target.value.length == 1){
            setInputString((currValue) => {
                return currValue + e.target.value
            })
        }

    }

    const checkIfMessageExists = (userInput: string) => {
        userInput = userInput.toUpperCase()

        console.log('checking if string: ' , userInput, " exists in the DB")
    } 



    useEffect(() => {

        inputRefs.forEach(x => x.current.blur())

        if (formIsActive){
            inputRefs[Math.min(inputString.length, NUM_KEYS_IN_CODE-1)].current.focus()
        }

    }, [formIsActive, inputString])

    useEffect(() => {
        console.log(inputString)

        if (inputString.length == NUM_KEYS_IN_CODE){
            checkIfMessageExists(inputString)
        }

    }, [inputString])







    return (
        <div className={styles.bulletin_key_input_form}>
            <div className={styles.bltn_key_input_area}>
                <div className={styles.bltn_key_input_text}>Please enter code here:</div>
                <div className={styles.bltn_key_input_row} onClick={(e) => formOnClick(e)}>
                    {
                        [0,1,2,3,4,5].map((value) => {
                            return (
                            <input 
                                key={'bltn_key_input_cell' + value}
                                style={getInputStyle(value)}
                                className={styles.bltn_key_input_cell}
                                type='text'
                                onBlur={(e)=>textFieldOnBlur(e)}
                                onFocus={(e)=>textFieldOnFocus(e)}
                                onChange={(e) => handleCellTextChange(e, value)}
                                maxLength='1' size='1'
                                ref={inputRefs[value]}
                            ></input>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )

}

export default KeyInputForm;
