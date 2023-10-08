// @ts-nocheck

import styles from '../styles/Startdate.module.css'
import Head from 'next/head'
import { BIRTH_DATE_FUNCTION_URL, START_DATE_FUNCTION_URL } from '../constants/website-constants'



import React, { useState , useEffect, useRef} from 'react'
import Link from 'next/link'


export default function AgeComponent() {

    const [pageLoading, setPageLoading] = useState(true)
    const [fullAge, setFullAge] = useState(0)
    const [decimalAge, setDecimalAge] = useState(0)
    const [birth_date, setBirthDate] = useState(new Date('1970-01-01'))
    const [stateCounter, setStateCounter] = useState(0)

    const loadBirthDate = async () => {
        console.log(BIRTH_DATE_FUNCTION_URL)
        const res = await fetch(BIRTH_DATE_FUNCTION_URL, {
            method: 'GET'
        });
        console.log('res')
        console.log(res)
        const newData = await res.json();
        console.log('data')
        console.log(newData)

        console.log(newData["birth_datetime"])
        setBirthDate(new Date(newData["birth_datetime"]))
        setPageLoading(false)
        
    }

    const computeAge = () => {

        console.log('computeAge called')

        const currentDate = new Date()

        console.log(birth_date)

        // compute difference between current date and birth date
        const difference = currentDate.getTime() - birth_date.getTime()

        // console log difference
        console.log('difference: ' + difference)

        // convert difference to years
        const years = difference / (1000 * 60 * 60 * 24 * 365)

        // set full age and decimal age
        setFullAge(Math.floor(years))
        setDecimalAge((years - Math.floor(years)).toString().substring(1,10))

        // console log full age and decimal age
        console.log('full age: ' + Math.floor(years))
        console.log(years - Math.floor(years))

        setStateCounter((oldValue) => {
            return oldValue + 1
        })


    }

    let timer = null

    // when the page loads, set a timer to refresh every second
    useEffect(() => {
        loadBirthDate()

        return () => {
            if (timer) {
                clearInterval(timer)
            }
        }
        
    }, [])

    useEffect(() => {
        setPageLoading(false)
        timer = setInterval(() => computeAge(), 1000)
        return () => {
            if (timer) {
                clearInterval(timer)
            }
        }

    }, [birth_date])

    const returnHomeElement = 
    <Link className={styles.homeIcon} href="/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32px" height="32px">
            <path d="M 16 2.59375 L 15.28125 3.28125 L 2.28125 16.28125 L 3.71875 17.71875 L 5 16.4375 L 5 28 L 14 28 L 14 18 L 18 18 L 18 28 L 27 28 L 27 16.4375 L 28.28125 17.71875 L 29.71875 16.28125 L 16.71875 3.28125 Z M 16 5.4375 L 25 14.4375 L 25 26 L 20 26 L 20 16 L 12 16 L 12 26 L 7 26 L 7 14.4375 Z"/>
        </svg>
    </Link>

    return (
        <>
        <Head>
            <title>Countdown to Arthur's Start Date</title>
            <meta
                name="description"
                key="desc"
                content="Countdown to Arthur's start date at Amazon"
            ></meta>
        </Head>
        <div style={{textAlign: 'center', paddingTop: '10vh'}}>
            <h3 className={styles.AgeMainText}>Life is moving. Are you?</h3>
            {(pageLoading || decimalAge == 0) ? 
            <h1 className={styles.AgeFullYears}>-</h1> :
            <h1 className={styles.AgeFullYears}>{fullAge}<span className={styles.AgeDecimalText}>{decimalAge}</span></h1>}
            {returnHomeElement}

        </div>
        </>
    )

    
}


/*
0 -> 1
1 -> 1
2 -> 1
3 -> 1
4 -> 1
5 -> 1
6 -> 1 S
7 -> 1 S
8 -> 2
9 -> 2
10 -> 2
11 -> 2
12 -> 2
13 -> 2 S
14 -> 2 S
15 -> 3

(x + x%7) // 7

41 + 

*/