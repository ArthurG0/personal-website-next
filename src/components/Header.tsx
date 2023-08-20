import React, { useState , useEffect, ReactPropTypes } from 'react'
import styles from '../styles/HomeComponent.module.css'
import Link from 'next/link'


function Header(props: any) {
return (

    <div className={styles.Home + ' ' + styles.HeaderBar}>
        <a href="#contact">Contact</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#resume">Resume</a>
        <Link href="/startdate">Start Date</Link>
        <Link href="/russian-typer">Russian Typer</Link>
    </div>

    )
}


export default Header