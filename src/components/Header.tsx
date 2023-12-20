import React, { useState , useEffect, ReactPropTypes } from 'react'
import Link from 'next/link'
import { query } from 'firebase/firestore'
import styles from '../styles/Header.module.scss'


function Header(props: any) {

    const [isOpen, setIsOpen] = useState(false)

    const changeIsOpen = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const mobileHeaderContainer = document.querySelector('#body-header-links-container-mobile')
        if(!isOpen) {
            // for all children of mobileHeaderContainer with linkElement in class, set display to none
            mobileHeaderContainer?.querySelectorAll('.linkElement').forEach((element: any) => {
                // element.style.display = 'none'
        })
    }
    }, [])

    useEffect(() => {
        console.log('is open changed:', isOpen)

    }, [isOpen])

    
    let hamburgerIconStyles = [styles.Header_Hamburger_Icon]
    const hamburgerColor = '#ffffff'

    let headerContainerMobileStyles = [styles.header_container_mobile]

    if (isOpen) {
        hamburgerIconStyles.push(styles.Header_Open)
        headerContainerMobileStyles.push(styles.Header_Open)
    }

    const hamburgerIcon = 
    <Link className={hamburgerIconStyles.join(' ')} href="/" onClick={() => changeIsOpen()}>
        <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32" fill={hamburgerColor}>
            <path d="M114.022-231.152v-68.37h732.196v68.37H114.022Zm0-214.783v-68.13h732.196v68.13H114.022Zm0-214.543v-68.37h732.196v68.37H114.022Z"/>
        </svg>
    </Link>

return (

    <div className={styles.body_header}>
        <div className={styles.header_container_desktop}>
            <div className={styles.body_header_links_container}>
                <a className={styles.linkElement} href="#contact">
                    <div>Contact</div>
                </a>
                <a className={styles.linkElement} href="#portfolio">
                    <div>Portfolio</div>
                </a>
                <a className={styles.linkElement} href="#resume">
                    <div>Resume</div>
                </a>
                <Link className={styles.linkElement} href="/startdate">
                    <div>Start Date</div>
                </Link>
                <Link className={styles.linkElement} href="/russian-typer">
                    <div>Russian Typer</div>
                </Link>
                <Link className={styles.linkElement} href="/age">
                    <div>Age</div>
                </Link>
                <Link className={styles.linkElement} href="/bulletins">
                    <div>Texts</div>
                </Link>
            </div>
        </div>

        <div className={headerContainerMobileStyles.join(' ')}>
            {hamburgerIcon}
            <div className={styles.header_container_mobile_links}>
                <a className={styles.linkElement} href="#contact">
                    <div>Contact</div>
                </a>
                <a className={styles.linkElement} href="#portfolio">
                    <div>Portfolio</div>
                </a>
                <a className={styles.linkElement} href="#resume">
                    <div>Resume</div>
                </a>
                <Link className={styles.linkElement} href="/startdate">
                    <div>Start Date</div>
                </Link>
                <Link className={styles.linkElement} href="/russian-typer">
                    <div>Russian Typer</div>
                </Link>
                <Link className={styles.linkElement} href="/age">
                    <div>Age</div>
                </Link>
                <Link className={styles.linkElement} href="/bulletins">
                    <div>Texts</div>
                </Link>
            </div>
        </div>
    </div>

    )
}


export default Header