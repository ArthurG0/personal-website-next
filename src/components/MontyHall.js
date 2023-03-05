import React, { useState , useEffect, useRef} from 'react'
import '../styles/Home.module.css'
import { initializeApp } from "firebase/app";
import { getFirestore , collection, doc, getDocs, setDoc } from "firebase/firestore";
import styles from '../styles/MontyHall.module.css'


function MontyHall(props) {

    const almostCar = './monty-hall/mh-almost-open-car.jpg'
    const almostGoat = './monty-hall/mh-almost-open-goat.jpg'
    const barelyOpen = './monty-hall/mh-barely-open.jpg'
    const midOpen = './monty-hall/mh-mid.jpg'
    const openCar = './monty-hall/mh-open-car.jpg'
    const openGoat = './monty-hall/mh-open-goat.jpg'
    const closedDoor = './monty-hall/mh-closed.jpg'
    const wikipic1 = './monty-hall/mh-wikipic1.png'
    const wikipic2 = './monty-hall/mh-wikipic2.png'

    const [statsData, setStatsData] = useState({})
    const [statsLoaded, setStatsLoaded] = useState(false)
    const [infoShown, setInfoShown] = useState(false)
    const [numOfGames, setNumOfGames] = useState(0)
    const [selectionStatus, setSelectionStatus] = useState('none')
    const [doorPrizes, setDoorPrizes] = useState(generatePrizes())
    const FirestoreRef = useRef(null)
    const TextRef = useRef()
    const Door1Ref = useRef()
    const Door2Ref = useRef()
    const Door3Ref = useRef()

    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_MH_DATABASE_API_KEY,
        authDomain: "fir-test-759bf.firebaseapp.com",
        projectId: "fir-test-759bf",
    };

    let app;
    let firestore;

    let doors = 
    
    <div className={styles.MontyHallDoorsFlex}>
    {
        [Door1Ref, Door2Ref, Door3Ref].map((x, index) => {
            return (
            <div className={styles.DoorWrapper}>
                <img 
                    src={closedDoor}
                    ref={x}
                    onMouseEnter={() => doorHover(index)}
                    onMouseOut={() => doorMouseOut(index)}
                    onClick={() => doorClick(index)}
                ></img>
                <div className={styles.DoorLabel} id={`MontyHallDoor${index}Label`}>{`Door ${index + 1}`}</div>
            </div>
            )
        })
    }

    </div>

    let introText = 'Welcome to the Monty Hall Paradox! Behind these doors is ' +
    'one brand new car and two goats. Try your luck, and hopefully win a shiny new car! Click on a door to open it.'

    let infoTextPart1 = 'The Monty Hall problem is a brain teaser, in the form of a probability puzzle. ' + 
    'It became famous as a question from Marilyn vos Savant\'s "Ask Marilyn" column in Parade magazine in 1990'

    let infoTextPart2 = 'Suppose you\'re on a game show, and you\'re given the choice of three doors: Behind one door is a car; behind the others, goats. ' + 
    'You pick a door, say No. 1, and the host, who knows what\'s behind the doors, opens another door, say No. 3, which has a goat. ' + 
    'He then says to you, "Do you want to pick door No. 2?" Is it to your advantage to switch your choice?'

    let infoTextPart3 = 'Vos Savant\'s response was that the contestant should switch to the other door. Under the standard assumptions, the switching strategy has a ' + 
    '2/3 probability of winning the car, while the strategy that remains with the initial choice has only a 1/3 probability.'

    let infoTextPart4 = 'When the player first makes their choice, there is a 2/3 chance that the car is behind one of the doors not chosen. ' + 
    'This probability does not change after the host opens one of the unchosen doors. When the host provides information about the 2 unchosen doors ' + 
    '(revealing that one of them does not have the car behind it), the 2/3 chance of the car being behind one of the unchosen doors rests ' + 
    'on the unchosen and unrevealed door, as opposed to the 1/3 chance of the car being behind the door the contestant chose initially.'

    let infoTextPart5 = 'Many readers of vos Savant\'s column refused to believe switching is beneficial and rejected her explanation. ' + 
    'After the problem appeared in Parade, approximately 10,000 readers, including nearly 1,000 with PhDs, wrote to the magazine, most of them calling vos Savant wrong. ' + 
    'Even when given explanations, simulations, and formal mathematical proofs, many people still did not accept that switching is the best strategy. ' + 
    'Paul Erdős, one of the most prolific mathematicians in history, remained unconvinced until he was shown a computer simulation demonstrating vos Savant\'s predicted result.'

      
      
      // Initialize Firebase
      
    useEffect(() => {
        console.log('initializing app')
        // console.log(firebaseConfig.authDomain)
        // console.log(firebaseConfig.apiKey)
        document.title = "Monty Hall Paradox"
        app = initializeApp(firebaseConfig);
        FirestoreRef.current = getFirestore();
        // if(Door1Ref.current) Door1Ref.current.srcObj = closedDoor
        // if(Door2Ref.current) Door2Ref.current.srcObj = closedDoor
        // if(Door3Ref.current) Door3Ref.current.srcObj = closedDoor
        getInitialData()
        setTimeout(() => {
            chatBoxAddText(introText)
        }, 2000)

    }, [])

    let chatBox = 
        <div className={styles.ChatBoxText} ref={TextRef}>
            <svg className={styles.corner} viewBox="0 0 65 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 3.5L45 6.5V42L0 0L25 3.5Z or" fill="white"/>
            </svg>
        </div>

    let statistics = statsLoaded ? 
        <div className={styles.MontyHallStatsTableWrapper}>
            <div>The curious statistics of Monty Hall Paradox</div>
            <table className={styles.MontyHallStatsTable}>
                <tbody>
                    <tr>
                        <td>
                        Times people swapped: {statsData.swap_total}
                        </td>
                        <td>
                        Times swaps resulted in car: {statsData.swap_success}
                        </td>
                        <td>
                        Swap winrate: {Math.round(statsData.swap_success / statsData.swap_total * 100) + '%'}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Times people stayed: {statsData.stay_total}
                        </td>
                        <td>
                        Times stays resulted in car: {statsData.stay_success}
                        </td>
                        <td>
                        Stay winrate: {Math.round(statsData.stay_success / statsData.stay_total * 100) + '%'}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        : ""




    return (
        <div className={styles.MontyHallMain}>
            {infoShown ? 
                <div>
                    <div className={styles.MontyHallOverlay} onClick={exitOverlay}>
                        <div className={styles.MontyHallInfoSection}>
                            <div className={styles.MontyHallInfoHeader}>The Monty Hall Paradox: The explanation</div>
                            <div className={styles.MontyHallInfoBackground}>{infoTextPart1}</div>
                            <img src={wikipic1}></img>
                            <div className={styles.MontyHallInfoBackground + ' ' + styles.code}>{infoTextPart2}</div>
                            <div className={styles.MontyHallInfoBackground}>{infoTextPart3}</div>
                            <img src={wikipic2}></img>
                            <div className={styles.MontyHallInfoBackground}>{infoTextPart5}</div>

                        </div>
                    </div>
                </div>
            : ""}
            <div className="MontyHallLabel">
                <span style={{fontVariantCaps: 'petite-caps'}}>The Monty Hall Paradox</span>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="32" height="32"
                    viewBox="0 0 32 32"
                    className="MontyHallInfoIcon"
                    alt="Click to Learn More"
                    onClick={infoIconClicked}
                >
                    <path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 15 10 L 15 12 L 17 12 L 17 10 Z M 15 14 L 15 22 L 17 22 L 17 14 Z">
                    </path>
                </svg>
            </div>
            {
                chatBox
            }
            {/* {
                statsLoaded ? 
                
                <div className="MontyMainContent">
                    {
                        doors
                    }
                    <button onClick={button1Clicked}>Button1</button>
                    <button onClick={button2Clicked}>Button2</button>
                </div>
                : 
                
                <div className="MontyLoading">
                Loading...
                </div>

            } */}
                <div className={styles.MontyMainContent}>
                        {
                            doors
                        }
                        <div className={styles.MontyHallButtonRow}>
                            <button
                                className={styles.MontyHallPlayAgainButton}
                                id="MontyHallPlayAgainBtn"
                                onClick={playAgainClicked}
                            >Play Again</button>
                            <button
                                className={[styles.MontyHallPlayAgainButton, styles.hollow].join(' ')}
                                id="MontyHallLearnBtn"
                                onClick={learnButtonClicked}
                            >Learn More</button>

                        </div>
                        {
                            statistics
                        }
                        {/* <button onClick={button1Clicked}>Button1</button>
                        <button onClick={button2Clicked}>Button2</button> */}

                </div>
        </div>
    )

    async function getInitialData(){
        // console.log(FirestoreRef.current)
        const querySnapshot = await getDocs(collection(FirestoreRef.current, 'guess-stats'));
        const document = querySnapshot.docs.find(x => x.id === process.env.NEXT_PUBLIC_MH_DATABASE_DOCUMENT_ID)
        let initial_data = Object.assign({} , document.data())
        setStatsData(initial_data)
        setStatsLoaded(true)

    }

    async function button1Clicked() {

        const querySnapshot = await getDocs(collection(FirestoreRef.current, 'guess-stats'));
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id}`);
            // console.log(doc.data())
        });

    }
    async function button2Clicked() {

        const querySnapshot = await getDocs(collection(FirestoreRef.current, 'guess-stats'));
        const document = querySnapshot.docs.find(x => x.id === process.env.NEXT_PUBLIC_MH_DATABASE_DOCUMENT_ID)
        let current_data = Object.assign({} , document.data())
        current_data.swap_total+=1;
        current_data.swap_success+=1;

        await setDoc(doc(FirestoreRef.current, 'guess-stats', process.env.NEXT_PUBLIC_MH_DATABASE_DOCUMENT_ID), current_data)

    }

    function doorHover(index) {
        // console.log(`door ${index} hover`)
        let ref;
        if(index === 0) ref = Door1Ref
        else if(index === 1) ref = Door2Ref
        else if(index === 2) ref = Door3Ref
        if(selectionStatus === 'none'){
            ref.current.src = barelyOpen
        }
        // 
        else if(selectionStatus === 'all opened') {

        }
        //
        else if(selectionStatus.indexOf(`opened:${index}`) >= 0){
            
        }
        //
        else {
            ref.current.src = barelyOpen
        }
    }
    function doorMouseOut(index) {
        // console.log(`door ${index} mouse out`) 
        let ref;
        if(index === 0) ref = Door1Ref
        else if(index === 1) ref = Door2Ref
        else if(index === 2) ref = Door3Ref
        if(selectionStatus === 'none'){
            ref.current.src = closedDoor
        }
        // 
        else if(selectionStatus === 'all opened') {

        }
        //
        else if(selectionStatus.indexOf(`opened:${index}`) >= 0){
            
        }
        //
        else {
            ref.current.src = closedDoor
        }

    }

    function doorClick(index) {
        // console.log(`door ${index} clicked`)
        let ref = getDoorRef(index)
        if(selectionStatus === 'none'){
            ref.current.src = midOpen
            let doorToOpen = chooseDoorToOpen(index)
            setSelectionStatus(`selected:${index} opened:${doorToOpen}`)
            revealDoor(doorToOpen)
            chatBoxAddText(generateSecondLine(index, doorToOpen))
            let otherChoice = [0,1,2].filter(x => (x !== index && x !== doorToOpen))[0]
            document.getElementById(`MontyHallDoor${otherChoice}Label`).innerHTML += ' (switch)'
            document.getElementById(`MontyHallDoor${index}Label`).innerHTML += ' (stay)'
        }
        else if( selectionStatus === 'all opened') {

        }
        
        else if(selectionStatus.indexOf(`opened:${index}`) >= 0){

        }
        
        else {
            let didSwitch;
            let didWin;
            if(index == selectionStatus.split(' ')[0][selectionStatus.split(' ')[0].length - 1]){
                didSwitch = false
            } else didSwitch = true
            if(doorPrizes[index] === 'car') didWin = true
            else didWin = false
            revealDoor(0)
            revealDoor(1)
            revealDoor(2)
            showStatistics()
            recordResult(didWin, didSwitch)
            revealPlayAgainButton()
            setNumOfGames(numOfGames + 1)
            setSelectionStatus('all opened')
            chatBoxAddText(generateThirdLine(didWin, didSwitch))
        }
    }

    function getDoorRef(index){
        if(index === 0) return Door1Ref
        else if(index === 1) return Door2Ref
        else if(index === 2) return Door3Ref
    }

    function chatBoxAddText(text) {
        // first make all the previously added text visible
        // console.log(TextRef.current.childNodes)
        // TextRef.current.childNodes.clear
        // TextRef.current.childNodes.forEach(node => {
        //     if(node.nodeName === 'SPAN' && node.className.indexOf('revealed') === -1) node.classList.add('revealed')
        // })
        let cornerElement
        while (TextRef.current.firstChild){
            if(TextRef.current.firstChild.nodeName === 'svg') cornerElement = TextRef.current.firstChild
            TextRef.current.removeChild(TextRef.current.firstChild)
        }
        TextRef.current.appendChild(
            cornerElement
        )
        let characters = []
        text.split("").forEach(char => {
            if(char === '\n'){
                TextRef.current.appendChild(document.createElement('br'))
                return
            }
            let newSpan = document.createElement('span')
            newSpan.classList.add(styles.MontyHallSpan)
            newSpan.innerHTML = char
            TextRef.current.appendChild(newSpan)
            characters.push({span: newSpan, delay: 75})
        })

        revealOneCharacterAtATime(characters)

        
    }

    function revealOneCharacterAtATime(list){
        if(list.length <= 0) return
        let charToReveal = list.splice(0,1)[0]
        charToReveal.span.classList.add(styles.revealed)
        setTimeout(() => {
            revealOneCharacterAtATime(list)
        }, charToReveal.delay)
    }

    function generatePrizes() {
        let random = Math.floor(Math.random()*100000)
        if(random % 3 === 0) return ['car', 'goat', 'goat']
        if(random % 3 === 1) return ['goat', 'car', 'goat']
        return ['goat', 'goat', 'car']
    }

    function generateSecondLine(chosenDoor, openedDoor) {
        let textToDisplay = `Awesome - you chose door ${chosenDoor + 1}. Now see that door ${openedDoor + 1} has `
        textToDisplay += 'a goat inside. Would you like to change your choice of doors before we reveal the prizes? '
        textToDisplay += `\nClick on door ${chosenDoor + 1} to stay with your original choice, or click on the other door to switch.`

        return textToDisplay
    }

    function generateThirdLine(roundWon, didSwitch){
        let textToDisplay;
        if(roundWon && didSwitch) {
            textToDisplay = 'Congratulations! You decided to switch and won.'
            textToDisplay += '\nCuriously, those who switch have a 67% chance of winning! Want to play again?'
        } else if(roundWon && !didSwitch) {
            textToDisplay = 'Huh: you didn\'t switch your door and still won!'
            textToDisplay += '\nCuriously, those who stay only have a 33% chance of winning! Want to play again?'
        } else if(!roundWon && didSwitch) {
            textToDisplay = 'Huh: you switched your door and lost...'
            textToDisplay += '\nCuriously, those who switch have a 67% chance of winning! Want to play again?'
        } else if(!roundWon && !didSwitch){
            textToDisplay = 'Huh: you stayed with the original choice and lost...'
            textToDisplay += '\nCuriously, those who switch have a 67% chance of winning! Want to play again?'
        }

        return textToDisplay

    }

    function chooseDoorToOpen(chosenDoor){
        // console.log('here are the prizes:')
        // console.log(doorPrizes)
        let options = [0,1,2].filter(x => {
            return (x !== chosenDoor && doorPrizes[x] !== 'car')
        })
        // console.log('here are our options')
        // console.log(options)

        if(options.length === 1) return options[0]
        else {
            let rand = Math.random();
            if(rand < 0.5) return options[0]
            return options[1]
        }
    }

    function revealDoor(index){
        let ref = getDoorRef(index);
        if(doorPrizes[index] === 'car') ref.current.src = openCar
        else if(doorPrizes[index] === 'goat') ref.current.src = openGoat
    }

    function playAgainClicked() {
        setDoorPrizes(generatePrizes())
        getDoorRef(0).current.src = closedDoor
        getDoorRef(1).current.src = closedDoor
        getDoorRef(2).current.src = closedDoor
        document.getElementById(`MontyHallDoor0Label`).innerHTML = 'Door 1'
        document.getElementById(`MontyHallDoor1Label`).innerHTML = 'Door 2'
        document.getElementById(`MontyHallDoor2Label`).innerHTML = 'Door 3'
        setSelectionStatus('none')
        chatBoxAddText(introText)
        document.getElementById('MontyHallPlayAgainBtn').classList.remove(styles.revealed)
        document.getElementById('MontyHallLearnBtn').classList.remove(styles.revealed)
    }

    function showStatistics(){
        document.getElementsByClassName(styles.MontyHallStatsTableWrapper)[0].classList.add(styles.revealed)
    }
    function revealPlayAgainButton() {
        document.getElementById('MontyHallPlayAgainBtn').classList.add(styles.revealed)
        document.getElementById('MontyHallLearnBtn').classList.add(styles.revealed)
    }

    async function recordResult(didWin, didSwap) {
        // query the database
        // update the data depending on if won or lost
        // write back to the database

        const querySnapshot = await getDocs(collection(FirestoreRef.current, 'guess-stats'));
        const document = querySnapshot.docs.find(x => x.id === process.env.NEXT_PUBLIC_MH_DATABASE_DOCUMENT_ID)

        console.log(`won?: ${didWin}, swap: ${didSwap}`)
        let temp_data = Object.assign({} , document.data())
        if(didSwap) temp_data.swap_total++;
        else temp_data.stay_total++;
        
        if(didSwap && didWin) temp_data.swap_success++;
        else if(!didSwap && didWin) temp_data.stay_success++;
        await setDoc(doc(FirestoreRef.current, 'guess-stats', process.env.NEXT_PUBLIC_MH_DATABASE_DOCUMENT_ID), temp_data)

        // update the State object statsData
        let current_state = Object.assign({}, statsData)
        if(didSwap) current_state.swap_total++;
        else current_state.stay_total++;
        
        if(didSwap && didWin) current_state.swap_success++;
        else if(!didSwap && didWin) current_state.stay_success++;

        setStatsData(current_state)
    }

    function infoIconClicked(){
        // console.log('info clicked')
        setInfoShown(true)
    }

    function exitOverlay(){
        setInfoShown(false)
    }

    function learnButtonClicked(){
        setInfoShown(true)
    }
}

export default MontyHall
