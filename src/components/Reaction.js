import React, {useState, useEffect} from 'react'
import styles from '../styles/Reaction.module.css'
import ReturnHomeCompoment from './ReturnHomeComponent'

function Reaction(props) {

    /* 
    0 = not started
    1 = activated, yellow
    2 = green
    3 = green stopped
    */ 
    const [status, setStatus] = useState(0)
    const [launchTime, setLaunchTime] = useState(null)
    const [stoppedTime, setStoppedTime] = useState(null)

    return (
        <div className={styles.ReactionWrapper}>
            <ReturnHomeCompoment/>
            <div className={styles.BodyHeader}>Test Your Reaction Time!</div>
            <div className={styles.BodyInfo}>The field will turn yellow, then green. When the field turns green, click as quickly as possible. Activate the field below to start.</div>
            <div className={styles.ReactionResult}>---</div>
            <div className={styles.ReactionField} onClick={fieldClicked}>Not Activated</div>
        </div>
    )

    function fieldClicked(){
        if(status == 0){
            fieldActivated()
        }
        else if(status == 2){
            fieldStop()
        }
    }

    function fieldActivated() {
        console.log('field activated')
        document.getElementsByClassName(`${styles.ReactionField}`)[0].classList.add(styles.yellow)
        document.getElementsByClassName(`${styles.ReactionField}`)[0].innerHTML = 'Get Ready!'
        document.getElementsByClassName(styles.ReactionResult)[0].innerHTML = '---'
        let randomBeforeActivation =  3000 +  Math.floor(Math.random() * 4000)
        setTimeout(() => {
            turnGreen()
        }, randomBeforeActivation)
        setStatus(1)
    }

    function turnGreen() {
        document.getElementsByClassName(styles.ReactionField)[0].classList.remove(styles.yellow)
        document.getElementsByClassName(styles.ReactionField)[0].classList.add(styles.green)
        document.getElementsByClassName(styles.ReactionField)[0].innerHTML = 'CLICK!'
        setLaunchTime(performance.now())
        setStatus(2)
    }

    function fieldStop() {
        const whenStopped = performance.now()
        document.getElementsByClassName(styles.ReactionResult)[0].innerHTML = `${Math.floor(whenStopped - launchTime)} ms`
        setStoppedTime(whenStopped)
        setStatus(0)
        document.getElementsByClassName(styles.ReactionField)[0].classList.remove(styles.green)
        document.getElementsByClassName(styles.ReactionField)[0].classList.remove(styles.yellow)
        document.getElementsByClassName(styles.ReactionField)[0].innerHTML = 'Not Activated'
    }
}




export default Reaction
