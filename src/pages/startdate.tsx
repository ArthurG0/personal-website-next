import styles from '../styles/Startdate.module.css'


import React, { useState , useEffect, useRef} from 'react'


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

        console.log(currentTime)
        console.log(startDate)

        let difference = Math.abs(startDate.getTime() - currentTime.getTime())
        let numDays = Math.ceil(difference / 1000 / 60 / 60 / 24)
        days_left = numDays.toString()
    }

    
    return (
        <div style={{textAlign: 'center', paddingTop: '10vh'}}>
            <h3 className={styles.smallerText}>There are</h3>
            <h1 className={styles.largerText}>{days_left}</h1>
            <h3 className={styles.smallerText}>days left until my start date, {readable_start_date}</h3>
        </div>
    )
}
