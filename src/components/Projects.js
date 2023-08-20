import Link from 'next/link'
import React, { useState , useEffect } from 'react'
import styles from '../styles/Projects.module.css'


function Projects() {


    let projects = [
        {
            name: '2048-Defeater',
            desc: 'I built an AI program that defeated the game 2048 and achieved much higher scores. ' + 
            'By implementing a custom Minimax algorithm, I was able to teach the program to select the best possible move to maximize future score. ',
            technologies: ['Python', 'AI', 'Minimax', 'Math'],
            link: 'https://github.com/ArthurG0/2048-Defeater',
            pic: './portfolio-pics/2048-pic.png'
        },
        {
            name: 'Monty Hall Paradox',
            desc: 'Monty Hall is a famous mathematical/statistical riddle that is ridiculously counterintuitive. ' +
            'I built a demonstration game as well as Firebase integration to illustrate the paradox.',
            technologies: ['Javascript', 'React', 'Firebase', 'Backend'],
            link: '/monty-hall',
            pic: './portfolio-pics/monty-pic.png'
        },
        {
            name: 'Reaction Time Test',
            desc: 'Not all reflexes are created equal. The difference in reaction times really shows for top athletes and in e-sports. ' + 
            'I created this basic reaction testing tool to see if the differences in performance between me and my friends are just based on skill, ' +
            'or if their brain is giving them an unfair advantage.',
            technologies: ['Javascript', 'React'],
            link: '/reaction',
            pic: './portfolio-pics/reaction-pic.png'
        },
        {
            name: 'Website for ACM UCSB',
            desc: 'I designed and built a website for UCSB\'s Association of Computing Machinery. We are a small organization, and wanted our website to ' + 
            'attract new students, serve as a gallery for our events and projects, and a platform to help us grow.',
            technologies: ['Javasctipt', 'React'],
            link: 'https://ucsbacm.com',
            pic: './portfolio-pics/acm-pic.svg'
        },
        {
            name: 'This Personal Website',
            desc: 'I\'ve always wanted to have a personal website and was fascinated by an idea that people all over the world, through a click of a link, can find me ' + 
            'I\'ve built this website so I could use it as my business card, since all projects are hard to place on a Resume paper',
            technologies: ['Javasctipt', 'React'],
            link: '/',
            pic: './portfolio-pics/personal-website-pic.jpeg'
        }
    ]
    let projectsHTML = <div className={styles.PersonalProjects}>
        {
            
            projects.map((x, index) => {
                let projName = <div className={styles.IPName}>{x.name}</div>
                let projDesc = <div className={styles.IPDesc}>{x.desc}</div>
                let projLink = <Link className={styles.IPLink} href={x.link}>Learn More...</Link>
                let projPhoto = <div className={styles.IPPhotoWrapper}>
                    <img className={styles.IPPhoto} alt='Portfolio Avatar' id={`Portfolio-${index}`} src={x.pic}></img>
                </div>



                if(index % 2) {
                    return (
                        <div className={styles.IndividualProject} key={"index" + index.toString()}>
                            <div className={styles.IPRightSide}> 
                            {
                                projPhoto
                            }
                            </div>
                            <div className={styles.IPLeftSide}> 
                            {projName}
                            {projDesc}
                            {projLink}
                            </div>
                        </div>
                    )
                }
                return (
                <div className={styles.IndividualProject} key={"index" + index.toString()}>
                    <div className={styles.IPLeftSide}> 
                        {projName}
                        {projDesc}
                        {projLink}
                    </div>
                    <div className={styles.IPRightSide}>
                    {
                        projPhoto
                    }
                    </div>
                </div>
            )
            })
        }
    </div>

    return (
        <div className={styles.ProjectsWrapper}>
            {
                projectsHTML
            }
        </div>
    )
}

export default Projects