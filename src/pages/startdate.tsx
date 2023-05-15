import styles from '../styles/Startdate.module.css'
import Head from 'next/head'


import React, { useState , useEffect, useRef} from 'react'
import Link from 'next/link'


export default function StartDate() {

    const [date, setDate] = useState(null)

    useEffect(() => {
        async function getDate() {
            const hostname = window.location.href
            const res = await fetch('/api/amazon-start-date');
            const newData = await res.json();
            setDate(newData['start'])
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
    if (date) {
        let startDate = new Date(date)
        let currentTime = new Date(Date.now())

        readable_start_date = `${monthNumToName.get(startDate.getMonth())} ${startDate.getDate()}`

        // console.log(currentTime)
        // console.log(startDate)

        let difference = Math.abs(startDate.getTime() - currentTime.getTime())
        let numDays = Math.ceil(difference / 1000 / 60 / 60 / 24)
        days_left = numDays.toString()
    }

    
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
                <h1 className={styles.largerText}>{days_left}</h1>
                <h3 className={styles.smallerText}>days left until my start date, {readable_start_date}</h3>
                <Link className={styles.homeIcon} href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32px" height="32px">
                        <path d="M 16 2.59375 L 15.28125 3.28125 L 2.28125 16.28125 L 3.71875 17.71875 L 5 16.4375 L 5 28 L 14 28 L 14 18 L 18 18 L 18 28 L 27 28 L 27 16.4375 L 28.28125 17.71875 L 29.71875 16.28125 L 16.71875 3.28125 Z M 16 5.4375 L 25 14.4375 L 25 26 L 20 26 L 20 16 L 12 16 L 12 26 L 7 26 L 7 14.4375 Z"/>
                    </svg>
                </Link>
            </div>
        </>
    )
}
