// @ts-nocheck
import React, { useState , useEffect, ReactPropTypes } from 'react'
import styles from '../styles/HomeComponent.module.css'
import pic1 from '../assets/personal-pic/linkedin-pic.jpeg'
import linkedLogo from '../assets/icons/linkedin-logo.svg'
import ghLogo from '../assets/icons/github-logo.svg'
import Projects from './Projects.js'
import Link from 'next/link'



function HomeComponent(props: any) {

    // let projects = [
    //     {
    //         name: '2048',
    //         desc: 'I built an AI program that defeated the game 2048 and achieved much higher scores. Learn more about the project here:',
    //         link: 'https://github.com/ArthurG0/2048-Defeater'
    //     }
    // ]
    // let projectsHTML = <div className="PersonalProjects"></div>

    return (
        <div className={styles.HomeMainDiv}>
            <div className={styles.HomeGreeting}>Hello | Здравствуйте</div>
            <div className={styles.HomeAbout}>My name is Arthur Gatin</div>
            <img className={styles.ProfilePic} src='/images/linkedin-pic.jpeg' alt="Arthur Gatin Avatar"></img>
            <div className={[styles.Home, styles.Flex, styles.Row].join(' ')}>
                <a href='https://linkedin.com/in/arthurg0' target='_blank'>
                    <img className={[styles.Home, styles.Icon].join(' ')} id="linkedInIcon" src='./icons/linkedin-logo.svg'></img>
                </a>
                <a href='https://github.com/arthurg0' target='_blank'>
                    <img className={[styles.Home, styles.Icon].join(' ')} src='./icons/github-logo.svg'>
                    </img>
                </a>
                    
            </div>
            <div className={styles.HomeAbout}>I am a 23-year old Russian-American Software Developer.</div>
            <div className={styles.HomeAbout}>I have graduated from University of California, Santa Barbara as a Bachelor of Computer Science. I am currently enrolled in a 5-year Master's Program at UCSB.</div>
            {/* <div className="HomeAbout">I am looking for work.</div> */}
            <div className={styles.HomeSection}>Contact me!
                <a id="contact"></a>
            </div>
            <div className={styles.HomeAbout}>The best way to reach me is through email: agatin [at] ucsb.edu</div>
            <div className={styles.HomeSection}>Portfolio
                <a id="portfolio"></a>
            </div>
            <div className={styles.HomeAbout}>Here is a small selection of my most recent projects:</div>
            {<Projects/>}
            <div className={styles.HomeSection}>Resume
                <a id="resume"></a>
            </div>
            <div className={styles.HomeAbout}>Here is my resume:</div>
            <iframe src="https://sites.cs.ucsb.edu/~agatin/files/Resume_AXS_F23.pdf#" width="100%" height="100%">
            </iframe>



        </div>


    )
}

export default HomeComponent