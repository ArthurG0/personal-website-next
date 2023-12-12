import React, { useState , useEffect, ReactPropTypes } from 'react'
import Link from 'next/link'
import { query } from 'firebase/firestore'


function Header(props: any) {

    const [isOpen, setisOpen] = useState(false)




    let styleObject = `
    /* For Desktop */
    @media only screen and (min-aspect-ratio: 3/4) {
    
        #body-header {
            display: flex;
            height: 6vh;
            background-color: #d0a978;
            color: #fff;
            
        }

        #body-header-links-container {
            width: 60%;
            height: 100%;
            margin: auto;
            display: flex;
            justify-content: space-between;
        }

        .linkElement {
            height: 100%;
            line-height: 6vh;
        }

        #body-header-links-container-mobile {
            display: none;
        }
    
    
    }
      
    /* For Mobile */
    @media only screen and (max-aspect-ratio: 3/4) {
    
        #body-header {

        }

        #body-header-links-container {
            display: none;
        }

        #body-header-links-container-mobile {
            display: flex;
            flex-flow: wrap-reverse;
            align-items: flex-end;
            justify-content: space-between;
            background-color: #d0a978;
            color: #fff;
        }

        .Header-Hamburger-Icon {
            margin: 6vw;
            display: inline-block;   
            transition: transform 0.5s;

        }

        .Header-Hamburger-Icon.open {
            transform: rotate(-90deg); 
        }

        #header-container-mobile-links {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            min-height: 6vh;
            transition: line-height 0.5s;
            max-height: 17vh;
            width: 80%;
            padding-left: 6vw;
            
        }

        .linkElement {
            transition-delay: 0.1s;
            transition-property: visibility;           
        }

        #header-container-mobile-links:not(.open) {
            line-height: 0.7vh;
        }

        #header-container-mobile-links:not(.open) .linkElement {
            visibility: hidden;
        }

        #header-container-mobile-links.open .linkElement{
            visibility: visible;
        }
        
        #header-container-mobile-links.open {
            line-height: 4vh;
        }


    
    }
    `

    const returnHomeElement = 
    <Link className="Header-Hamburger-Icon" href="/" onClick={() => changeIsOpen()}>
        <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32" fill='white'>
            <path d="M114.022-231.152v-68.37h732.196v68.37H114.022Zm0-214.783v-68.13h732.196v68.13H114.022Zm0-214.543v-68.37h732.196v68.37H114.022Z"/>
        </svg>
    </Link>

    const changeIsOpen = () => {
        setisOpen(!isOpen)
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
        console.log('is open changed!')
        const mobileHeaderContainer = document.querySelector('#body-header-links-container-mobile')
        // find a child of mobileHeaderContainer with className Header-Hamburger-Icon and set its class 'open' to value isOpen
        mobileHeaderContainer?.querySelector('.Header-Hamburger-Icon')?.classList.toggle('open', isOpen)
        mobileHeaderContainer?.querySelector('#header-container-mobile-links')?.classList.toggle('open', isOpen)

    }, [isOpen])

    



return (

    <div id="body-header">
        <div id="body-header-links-container">
            <a className="linkElement" href="#contact">Contact</a>
            <a className="linkElement" href="#portfolio">Portfolio</a>
            <a className="linkElement" href="#resume">Resume</a>
            <Link className="linkElement" href="/startdate">Start Date</Link>
            <Link className="linkElement" href="/russian-typer">Russian Typer</Link>
            <Link className="linkElement" href="/age">Age</Link>
        </div>

        <div id="body-header-links-container-mobile">
            <div id="header-container-mobile-links">
                <a className="linkElement" href="#contact">Contact</a>
                <a className="linkElement" href="#portfolio">Portfolio</a>
                <a className="linkElement" href="#resume">Resume</a>
                <Link className="linkElement" href="/startdate">Start Date</Link>
                <Link className="linkElement" href="/russian-typer">Russian Typer</Link>
                <Link className="linkElement" href="/age">Age</Link>
            </div>
            {returnHomeElement}
        </div>

        <style>{styleObject}</style>
    </div>

    )
}


export default Header