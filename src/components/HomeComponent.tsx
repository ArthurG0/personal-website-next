// @ts-nocheck
import React, { useState , useEffect, ReactPropTypes } from 'react'
import styles from '../styles/HomeComponent.module.scss'
import pic1 from '../assets/personal-pic/linkedin-pic.jpeg'
import linkedLogo from '../assets/icons/linkedin-logo.svg'
import ghLogo from '../assets/icons/github-logo.svg'
import Projects from './Projects.js'
import Link from 'next/link'
import Image from 'next/image'



function HomeComponent(props: any) {

    // let projects = [
    //     {
    //         name: '2048',
    //         desc: 'I built an AI program that defeated the game 2048 and achieved much higher scores. Learn more about the project here:',
    //         link: 'https://github.com/ArthurG0/2048-Defeater'
    //     }
    // ]
    // let projectsHTML = <div className="PersonalProjects"></div>


    const styleObject = <style>{`
        .el-strikethrough {
            text-decoration: line-through;
        }
    `}
    </style>

    const getGreetingText = () => {

        const getEnglishGreetingText = () => {

            const defaultHelloText = 'Hello'
        
            //  6-12 morning
            // 12-17 afternoon
            // 17-22 evening
            const currentHours = new Date().getHours();

            if (currentHours >= 6 && currentHours <= 11) return 'Good Morning';
            if (currentHours >= 12 && currentHours <= 16) return 'Good Afternoon';
            if (currentHours >= 17 && currentHours <= 21) return 'Good Evening';
            else return defaultHelloText;

        }

        const getRussianGreetingText = () => {

            return 'Здравствуйте'

        }
        
        return `${getEnglishGreetingText()} | ${getRussianGreetingText()}!`
        
    }

    return (
        <div className={styles.HomeMainDiv}>
            <div className={styles.HomeGreeting}>{ getGreetingText() }</div>
            <div className={[styles.HomeAbout, styles.HomePageName].join(' ')}>My name is Arthur Gatin.</div>
            <div className={styles.HomeArthurPicContainer}>
                <Image className={styles.ProfilePic} src='/images/linkedin-pic.jpeg' alt="Arthur Gatin Avatar" width={400} height={400} quality={90}></Image>
            </div>
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
            <div className={styles.HomeAbout}>I have graduated from University of California, Santa Barbara as a Bachelor of Computer Science.
            <br/>
            <span className='el-strikethrough'>I am currently enrolled in a 5-year Master's Program at UCSB.</span></div>
            <div className={styles.HomeAbout}>I quit my Master's degree to dive into industry. Now I am a Software Engineer at Amazon.</div>

            <hr/>

            <div className={styles.HomeSection}>Contact me!
                <a id="contact"></a>
            </div>
            <div className={styles.HomeAbout}>The best way to reach me is through email: agatin [at] ucsb.edu</div>
            <hr/>

            <div className={styles.HomeSection}>Portfolio
                <a id="portfolio"></a>
            </div>
            <div className={styles.HomeAbout}>Here is a small selection of my most recent projects:</div>
            {<Projects/>}
            <hr/>
            <div className={styles.HomeSection}>Resume
                <a id="resume"></a>
            </div>
            <div className={styles.HomeAbout}>Here is my resume:</div>
            <iframe src="https://sites.cs.ucsb.edu/~agatin/files/Resume_AXS_F23.pdf#" width="100%" height="1100px">
            </iframe>
            {styleObject}



        </div>


    )
}

export default HomeComponent