// @ts-nocheck

import styles from '../styles/Startdate.module.css'
import Head from 'next/head'
import { START_DATE_FUNCTION_URL } from '../constants/website-constants'



import React, { useState , useEffect, useRef} from 'react'
import Link from 'next/link'


export default function StartDate() {

    const [pageLoading, setPageLoading] = useState(true)
    const [daysLeft, setDaysLeft] = useState(null)
    const [myCurrentDate, setCurrentDate] = useState(null)
    const [myStartDate, setStartDate] = useState(null)
    const [isAhead, setIsAhead] = useState(false)
    const [weeksWorked, setWeeksWorked] = useState(0)


    useEffect(() => {
        async function getDate() {

            console.log(START_DATE_FUNCTION_URL)
            const res = await fetch(START_DATE_FUNCTION_URL, {
                method: 'GET'
            });
            console.log(res)
            const newData = await res.json();
            console.log(newData)
            console.log(newData['numDays'])

            setDaysLeft(newData['numDays'])
            setCurrentDate(newData['currentTime'])
            setStartDate(newData['myStartTime'])
            setWeeksWorked(newData['weeks_worked'])
            setPageLoading(false)
        }
        getDate()
    }, [])
    const monthNumToName  = new Map()
    monthNumToName.set(0, 'January')
    monthNumToName.set(1, 'February')
    monthNumToName.set(2, 'March')
    monthNumToName.set(3, 'April')
    monthNumToName.set(4, 'May')
    monthNumToName.set(5, 'June')
    monthNumToName.set(6, 'July')
    monthNumToName.set(7, 'August')
    monthNumToName.set(8, 'September')
    monthNumToName.set(9, 'October')
    monthNumToName.set(10, 'November')
    monthNumToName.set(11, 'December')


    let days_left = '-'
    let readable_start_date = 'unknown'
    let numWeeksNumeralEnding = ''


    const returnHomeElement = 
        <Link className={styles.homeIcon} href="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32px" height="32px">
                <path d="M 16 2.59375 L 15.28125 3.28125 L 2.28125 16.28125 L 3.71875 17.71875 L 5 16.4375 L 5 28 L 14 28 L 14 18 L 18 18 L 18 28 L 27 28 L 27 16.4375 L 28.28125 17.71875 L 29.71875 16.28125 L 16.71875 3.28125 Z M 16 5.4375 L 25 14.4375 L 25 26 L 20 26 L 20 16 L 12 16 L 12 26 L 7 26 L 7 14.4375 Z"/>
            </svg>
        </Link>
    
    const amazonSmileElement = 
    <img className={styles.AmazonLogo}   src='./icons/Amazoncom-yellow-arrow.png'></img>

    if (daysLeft) {
        let startDate = new Date(myStartDate)
        let currentTime = new Date(Date.now())

        readable_start_date = `${monthNumToName.get(startDate.getMonth())} ${startDate.getDate()}, ${startDate.getFullYear()}`

        // console.log(currentTime)
        // console.log(startDate)

        let difference = Math.abs(startDate.getTime() - currentTime.getTime())
        let numDays = Math.ceil(difference / 1000 / 60 / 60 / 24)
        days_left = numDays.toString()

        numWeeksNumeralEnding = 'th'
        if (isAhead && weeksWorked % 1 == 0 && weeksWorked != 11){
            numWeeksNumeralEnding = 'st'
        } else if (isAhead && weeksWorked % 2 == 0 && weeksWorked != 12){
            numWeeksNumeralEnding = 'nd'
        }
    }

    if (pageLoading) {
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
                    <h1 className={styles.largerText}>-</h1>
                    {returnHomeElement}
                    
                </div>
            </>
        )
    }

    if (isAhead) {
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
                    <h3 className={styles.smallerText}>There are</h3>
                    <h1 className={styles.largerText}>{daysLeft}</h1>
                    <h3 className={styles.smallerText}>days left until my start date, <span style={{fontSize: '200%'}}>{readable_start_date}</span></h3>
                    {returnHomeElement}
                    {amazonSmileElement}

    
                </div>
            </>
        )
    } else {
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
                    <h3 className={styles.smallerText}>Looks like you were already able to start at Amazon!</h3>
                    {amazonSmileElement}


                    <h1 className={styles.largerText}>{daysLeft}</h1>
                    <h3 className={styles.smallerText}>days have passed since your start date, <span style={{fontSize: '200%', margin: '0px 5px'}}>{readable_start_date}</span></h3>
                    <h3 className={styles.smallerText}>which means you must now be in your <span style={{fontSize: '200%', margin: '0px 5px'}}>{weeksWorked}</span>{numWeeksNumeralEnding} week!</h3>

                    {returnHomeElement}
    
                </div>
            </>
        )
    }

    
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