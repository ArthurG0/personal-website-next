// @ts-nocheck
import styles from '../../styles/Bulletins.module.css'
import React, { useState , useEffect, useRef } from 'react'
import Link from 'next/link';
import { BULLETINS_GET_TEXT_FUNCTION_URL } from '@/constants/website-constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loading_gif from '../../../public/icons/loading-gif.gif'



function KeyInputForm(props: any) {

    const NUM_KEYS_IN_CODE = 6

    const [indexSelected, setIndexSelected] = useState(0)
    const [formIsActive, setFormIsActive] = useState(false)
    const [inputString, setInputString] = useState('')
    const [isLoading, setLoading] = useState(false)

    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ]

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const longTestText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo elit at imperdiet dui accumsan. Accumsan in nisl nisi scelerisque eu. Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Diam maecenas ultricies mi eget mauris pharetra et ultrices neque. Lorem mollis aliquam ut porttitor leo a diam. Mauris rhoncus aenean vel elit scelerisque. Risus quis varius quam quisque id diam. Aliquam ut porttitor leo a diam. Ut diam quam nulla porttitor massa id neque aliquam. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui. Donec et odio pellentesque diam volutpat commodo sed egestas egestas. Ultrices dui sapien eget mi. Integer vitae justo eget magna fermentum iaculis eu non. Scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt. Adipiscing elit ut aliquam purus sit amet. Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra.'

    const triggerShowTextProcess = (showText: string) => {
        toast.success('Your code matched a text!', {
            position: "top-center",
            autoClose: 900,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

        setTimeout(() => props.updateShowText(showText), 2400);
    }


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

    const resetForm = () => {
        setFormIsActive(true)
        setInputString('')

        inputRefs.forEach(ref => ref.current.value = '')

        props.updateShowText('')
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

    const checkIfMessageExists = async (userInput: string) => {
        // userInput = userInput.toUpperCase()

        console.log('checking if string: ' , userInput, " exists in the DB")
        setLoading(true)

        let res = await fetch(BULLETINS_GET_TEXT_FUNCTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({key: userInput})
        })

        setLoading(false)
        console.log(res)

        if (res.status == 404){
            toast.error('No text with that code', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            props.updateShowText('')
        }

        else if (res.status == 200) {
            console.log('found text in DB!')
            res = await res.json()
            if (res) {
                triggerShowTextProcess(res)
            }
        }

        // await sleep(1400)
        // setLoading(false)


        // let res = {
        //     status: 200,
        //     // json: async () => new Promise((resolve) => resolve(longTestText+longTestText+longTestText+longTestText))
        //     json: async () => new Promise((resolve) => resolve('apple apple apple apple'))
        // }

        // if (res.status == 200){
        //     console.log('found text in DB!')
        //     res = await res.json()
        //     console.log(res)

        //     toast.success('Your code matched a text!', {
        //         position: "top-center",
        //         autoClose: 900,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "colored",
        //     });

        //     setTimeout(() => props.updateShowText(res), 2500)
        
        // }

        

        

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
                <ToastContainer/>
                <div className={styles.bltn_key_input_text}>Please enter code here:</div>
                <div className={styles.bltn_key_input_row} onClick={(e) => formOnClick(e)}>
                    <div style={{width: '50px', height: '100%', margin: 'auto 0', display: 'flex'}}>

                    </div>
                    {
                        [0,1,2,3,4,5].map((value) => {
                            return (
                            <input 
                                key={'bltn_key_input_cell' + value}
                                className={styles.bltn_key_input_cell}
                                type='text'
                                autoCapitalize='off'
                                onBlur={(e)=>textFieldOnBlur(e)}
                                onChange={(e) => handleCellTextChange(e, value)}
                                maxLength='1' size='1'
                                ref={inputRefs[value]}
                            ></input>
                            )
                        })
                        
                    }
                    <div style={{width: '50px', height: '100%', margin: 'auto 0', display: 'flex'}}>
                        { isLoading ? 
                            <img src='./icons/loading-gif.gif' style={{width: '100%', margin: 'auto'}}></img>
                            : ""
                        }
                    </div>

                </div>
            </div>
            <button className={styles.bltn_button} onClick={resetForm}>clear input</button>
        </div>
    )

}

export default KeyInputForm;
