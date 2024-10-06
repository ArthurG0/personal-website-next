// @ts-nocheck
import { useEffect, useState, useRef } from "react"
import styles from '../styles/MatrixRain.module.css'
import ReturnHomeCompoment from "./ReturnHomeComponent"

function MatrixRainComponent(props: any) {

    const UPDATE_STATE_IS_JUST_RANDOM_LETTERS = false
    const LETTER_WIDTH_PX = 12
    const LETTER_HEIGHT_PX = 18
    const FPS = 20
    const DEBUG_NEW_RAINS = false
    const DEBUG_BUTTONS_ON = false
    const DEBUG_LETTERS = false

    // matrix rail text shape is 25x70

    const [ROW_COUNT, setRowCount] = useState(null)
    const [COLUMN_COUNT, setColumnCount] = useState(null)
    const [isReady, setIsReady] = useState(false)
    const [stateIsMobile, setIsMobile] = useState(false)
    const [letterState, setLetterState] = useState(null)
    const [desiredCapacity, setDesiredCapacity] = useState(0.7)
    const [tickCounter, setTickCounter] = useState(0)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const intervalRef = useRef(null)

    useEffect(() => {
        console.log('useEffect called')
        if (isMobile()) {
            setColumnCount(20)
            setRowCount(30)
        } else {
            setColumnCount(70)
            setRowCount(25)
        }
        setIsMobile(isMobile())
        setIsReady(true)
        
    }, [])

    useEffect(() => {
        setLetterState(getDefaultState(ROW_COUNT, COLUMN_COUNT))
        const msPerFrame = 1000 / FPS

        const interval = setInterval(() => {
            setTickCounter(tickCounter => tickCounter + 1)
        }, msPerFrame)
        intervalRef.current = interval
        setCanvasAttributes(canvasRef.current)
        return (() => clearInterval(intervalRef.current))


    }, [isReady])

    useEffect(() => {
        // high accuracy stopwatch initialize
        if (letterState == null) return
        let timeBegin = performance.now()
        updateLetters(tickCounter)
        paintCanvas(tickCounter)
        let timeEnd = performance.now()
        console.log(`time taken for tick ${tickCounter}: ${timeEnd - timeBegin}ms`)

        // every 40 ticks update the new desired capacity for rains
        if (tickCounter % 40 == 39) setDesiredCapacity(getNewDesiredCapacity())
    }, [tickCounter])

    function isMobile() {
        return window.innerWidth < window.innerHeight
    }
    function paintCanvas() {
        clearCanvas()
        if (letterState == null) return
        for (let row = 0; row < letterState.letters.length; row++) {
            for (let column = 0; column < letterState.letters[row].length; column++) {
                if (letterState.letters[row][column].key != -1) {
                    drawLetter(letterState.letters[row][column], row, column)
                }
            }
        }
    }

    function updateLetters(tick) {
        setLetterState(currentState => transformState(currentState, tick))
    }
    function getNewDesiredCapacity() {
        if (stateIsMobile) return generateBellCurveRandom(0.75, 0.05)
        return generateBellCurveRandom(0.65, 0.05)
    }
    function generateBellCurveRandom(mean = 0, standardDeviation = 1) {
        let u = 0, v = 0;
        
        // Transform two random uniform numbers into normal distributed numbers
        while (u === 0) u = Math.random(); // Avoid 0 for logarithm
        while (v === 0) v = Math.random();
        
        let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        
        // Scale and shift to match the desired mean and standard deviation
        return z * standardDeviation + mean;
    }

    // not used
    function generateRandomLettersBoard() {
        let numRandomLetters = 10
        let board = getDefaultLetters(ROW_COUNT, COLUMN_COUNT)
        for (let i = 0; i < numRandomLetters; i++) {
            let randomLetter = generateRandomLetterAndLocation(25, 70)
            board[randomLetter.r][randomLetter.c] = {key: randomLetter.l}
        }
    
        return {
            letters: board,
            rain: getEmptyRains(COLUMN_COUNT)
        }
    }

    function getNextStateRains(currentRains, tick) {
        // will change this object and return it
        let newRains = JSON.parse(JSON.stringify(currentRains))

        let currentActiveRains = currentRains.filter(rain => rain.active)
        let currentEmptyRains = currentRains.filter(rain => (!rain.active))
        let desiredActiveRainsAtAnyPoint = Math.floor(desiredCapacity * COLUMN_COUNT)
        let capacityForNew = ( desiredActiveRainsAtAnyPoint - currentActiveRains.length )
        let chanceOfNewGeneratedThisTick = ( capacityForNew / 50 / COLUMN_COUNT )

        if (DEBUG_NEW_RAINS) {
            console.log(`currentActiveRains: ${currentActiveRains.length}`)
            console.log(`desiredActiveRainsAtAnyPoint: ${desiredActiveRainsAtAnyPoint}`)
            console.log(`using desiredCapacity: ${desiredCapacity}`)
            console.log(`capacity for new: ${capacityForNew}`)
        }

        for (let i = 0; i < currentEmptyRains.length; i++) {
            let emptyRainIndex = currentEmptyRains[i].column
            let thisColumnChance = chanceOfNewGeneratedThisTick
            // if there is an active rain to the left, decrease change of new rain in this column
            if (emptyRainIndex > 0 && currentRains[emptyRainIndex-1].active) {
                thisColumnChance = thisColumnChance * 0.9
            } else thisColumnChance = thisColumnChance * 1.1
            // if there is an active rain to the right, decrease change of new rain in this column
            if (emptyRainIndex < COLUMN_COUNT-1 && currentRains[emptyRainIndex+1].active) {
                thisColumnChance = thisColumnChance * 0.9
            } else thisColumnChance = thisColumnChance * 1.1

            if (Math.random() < thisColumnChance) {
                let emptyRainIndex = currentEmptyRains[i].column
                newRains[emptyRainIndex] = generateSingleNewRain(emptyRainIndex)

                // in 5% of cases, generate a second rain in the left column if it is empty
                if (Math.random() < 0.05 ) {
                    if (emptyRainIndex > 0 && !currentRains[emptyRainIndex-1].active) {
                        newRains[emptyRainIndex-1] = generateSingleNewRain(emptyRainIndex-1)
                        newRains[emptyRainIndex-1].age = newRains[emptyRainIndex].age
                        newRains[emptyRainIndex-1].speed = newRains[emptyRainIndex].speed
                        
                    }
                }
            }
        }

        for (let i = 0; i < newRains.length; i++) {
            if (tick % newRains[i].speed != 0) continue
            if (newRains[i].active) {
                newRains[i].age += 1
                if (newRains[i].cleanup) {
                    newRains[i].cleanupAge += 1
                }

                if (!newRains[i].cleanup && newRains[i].age > newRains[i].maxAge) {
                    newRains[i].cleanup = true
                    newRains[i].cleanupAge = 1
                    newRains[i].cleanupMaxAge = getCleanupMaxAge()
                }
                
                if (newRains[i].cleanupAge > newRains[i].cleanupMaxAge) {
                    newRains[i].active = false
                    newRains[i].cleanup = false
                }
            }
        }
        return newRains
    }

    function getNextStateLetters(oldLetters, rains, tick) {
        let newLetters = JSON.parse(JSON.stringify(oldLetters))
        for (let i = 0; i < rains.length; i++) {
            if (tick % rains[i].speed != 0) continue;
            for (let row = 0; row < ROW_COUNT; row++) {
                newLetters[row][i].blueHighlightLeft -= 1
            }
            if (rains[i].active) {
                let rainAge = rains[i].age
                if (rainAge > 0 && rainAge <= ROW_COUNT) {
                    newLetters[rainAge-1][i] = generateSingleNewLetter(tickCounter, rainAge-1, rains[i].maxAge)

                    // check for edge case where this letter's blue highlight expires before one above it
                    let currentRow = rainAge-1
                    if (currentRow-1 >= 0 && newLetters[currentRow-1][i].blueHighlightMaxTick > newLetters[currentRow][i].blueHighlightMaxTick) {
                        newLetters[currentRow][i].blueHighlightMaxTick = newLetters[currentRow-1][i].blueHighlightMaxTick
                    }
                }
            }
            if (rains[i].active && rains[i].cleanup) {
                let rainCleanUpAge = rains[i].cleanupAge
                if (rainCleanUpAge > 0 && rainCleanUpAge <= ROW_COUNT) {
                    newLetters[rainCleanUpAge-1][i] = {key: -1 }
                }
            }
            
            if (!rains[i].active) {
                for (let row = 0; row < ROW_COUNT; row++) {
                    newLetters[row][i] = {key: -1}
                }
            }
        }

        for (let row = 0; row < ROW_COUNT; row++) {
            for (let column = 0; column < COLUMN_COUNT; column++) {
                if (tick % rains[column].speed == 0) {
                    newLetters[row][column].style = getChangedLetterStyle(
                        newLetters[row][column].style, // current style,
                        row, // letter's row
                        rains[column].age, // age of rain
                        rains[column].maxAge, // max age of rain
                        rains[column].lettersDimTime // lettersDimTime

                    )
                }
                // // randomly change style
                // if (newLetters[row][column].key != -1 && Math.random() < 0.4 && tick % rains[column].speed == 0) {
                //     newLetters[row][column].style = getChangedLetterStyle(
                //         newLetters[row][column].style,
                //         rains[column].age,
                //         rains[column].maxAge
                //     )
                // }
                // // for each letter, if rain's age - row >= lettersSwitchTime, switch to a random letter and style
                // if (newLetters[row][column].key != -1) {
                //     if (rains[column].age - row == rains[column].lettersSwitchTime && tick % rains[column].speed == 0) {
                //         newLetters[row][column].key = generateRandomLetter()
                //         newLetters[row][column].style = getNewLetterStyle()
                //     }
                // }
            }
        }
        for (let row = 0; row < ROW_COUNT; row++) {
            for (let column = 0; column < COLUMN_COUNT; column++) {
                if (newLetters[row][column].key != -1) {
                    if (rains[column].age - row == rains[column].lettersSwitchTime && tick % rains[column].speed == 0) {
                        newLetters[row][column].key = generateRandomLetter()
                        // newLetters[row][column].style = getNewLetterStyle()
                    }
                    if (Math.random() < 0.005) newLetters[row][column].key = generateRandomLetter()
                }
            }
        }
        if (DEBUG_LETTERS) {
            newLetters[0][0] = {key: '0', blueHighlightLeft: -1}
            newLetters[0][1] = {key: '1', blueHighlightLeft: -1}
            newLetters[0][2] = {key: '2', blueHighlightLeft: -1}
            newLetters[0][3] = {key: '3', blueHighlightLeft: -1}
            newLetters[0][4] = {key: '4', blueHighlightLeft: -1}
            newLetters[0][5] = {key: '5', blueHighlightLeft: -1}
            newLetters[0][6] = {key: '6', blueHighlightLeft: -1}
            newLetters[0][7] = {key: '7', blueHighlightLeft: -1}
            newLetters[0][8] = {key: '8', blueHighlightLeft: -1}
            newLetters[0][9] = {key: '9', blueHighlightLeft: -1}
        }
        return newLetters
    }

    function generateSingleNewRain(column) {
        let thisRainLifetime = getNextRainMaxAge();
        return {
            column,
            age: Math.min(0, Math.round(generateBellCurveRandom(0, 10))),
            cleanupAge: 0,
            maxAge: thisRainLifetime,
            active: true,
            cleanup: false,
            lettersSwitchTime: thisRainLifetime - Math.max(0,Math.floor(generateBellCurveRandom(10, 5))),
            speed: getRainSpeed(),
            lettersDimTime: generateBellCurveRandom(0.85, 0.06),
        }
    }


    function generateSingleNewLetter(currentTick, row, maxAgeOfItsRain) {
        return {
            key: generateRandomLetter(),
            blueHighlightLeft: getBlueHighlightAge(),
            style: getNewLetterStyle()
        }
    }
    function getNextRainMaxAge() {
        return 5 + Math.max(0, Math.floor(generateBellCurveRandom(33, 9)))
    }
    function getCleanupMaxAge() {
        return ROW_COUNT + Math.max(0, Math.floor(generateBellCurveRandom(5, 10)))
    }

    function transformState(currentState, tick) {
        if (currentState == null) return {
            letters: getEmptyLetters(ROW_COUNT, COLUMN_COUNT),
            rain: getEmptyRains(COLUMN_COUNT)
        }
        if (UPDATE_STATE_IS_JUST_RANDOM_LETTERS) {
            return generateRandomLettersBoard()
        } else {
            let newRains = getNextStateRains(currentState.rain, tick)
            let newLetters = getNextStateLetters(currentState.letters, newRains, tick)
            return {
                letters: newLetters,
                rain: newRains
            }
        }
    }

    function getFillRectangleStyle(letterStyle) {
        if (letterStyle == 1) return "#001B0F"
        if (letterStyle == 2) return "#002313"
        if (letterStyle == 3) return "#000000"
        if (letterStyle == 4) return "#000600"
    }

    function getFillLetterStyle(letterStyle, isBlueHighlight) {
        if (isBlueHighlight && letterStyle == 1) return "#5df5eb"
        if (isBlueHighlight && letterStyle == 2) return "#75aaff"
        if (isBlueHighlight && letterStyle == 3) return "#5df5eb"
        if (isBlueHighlight && letterStyle == 4) return "#5df5eb"
        if (letterStyle == 1) return "#0f6e15"
        if (letterStyle == 2) return "#199421"
        if (letterStyle == 3) return "#365938"
        if (letterStyle == 4) return "#014204"
    }

    function getLetterFont() {
        return "24px Courier"
    }

    function drawLetter(letter, row, column) {
        let coords = getCoordsFromRowColumn(row, column)
        let boxCoords = getCoordsForBox(coords.x, coords.y)
        const ctx = canvasRef.current.getContext('2d')
        const letterStyle = letter.style

        // fill rectangle
        ctx.fillStyle = getFillRectangleStyle(letterStyle);
        ctx.fillRect(boxCoords.x, boxCoords.y, boxCoords.width, boxCoords.height)

        // fill letter
        ctx.fillStyle = getFillLetterStyle(letterStyle, letter.blueHighlightLeft > 0)
        ctx.font = getLetterFont();

        const letterText = letter.key
        ctx.fillText(letterText,coords.x,coords.y);
    }

    function getCoordsFromRowColumn(row, column) {
        return {x: column*LETTER_WIDTH_PX-2, y: row*LETTER_HEIGHT_PX+15} ;
    }
    function getCoordsForBox(letterX, letterY) {
        return {x: letterX+1, y: letterY-15, width: LETTER_WIDTH_PX, height: LETTER_HEIGHT_PX}
    }
    function getColorForBox() {
        return "#1b2511"
    }
    function getBlueHighlightAge() {
        // return 3 in 2% cases
        // return 2 in 23% cases
        // in all other cases, return 1
        let random = Math.random()
        if (random < 0.02) {
            return 3
        } else if (random < 0.23) {
            return 2
        } else {
            return 1
        }
    }

    function getRainSpeed() {
        // return 2 in 75% of cases
        // return 1 in 10% of cases
        // return 3 in 10% of cases
        // return 4 in 5% of cases
        let random = Math.random()
        if (random < 0.05) {
            return 4
        } else if (random < 0.15) {
            return 3
        } else if (random < 0.25) {
            return 1
        } else {
            return 2
        }

    }

    function getNewLetterStyle() {
        // return 3 in 5% cases
        // return 2 in 15% cases
        // in all other cases, return 1
        let random = Math.random()
        if (random < 0.05) {
            return 3
        } else if (random < 0.20) {
            return 2
        } else {
            return 1
        }

    }

    function getChangedLetterStyle(currentStyle, currentRow, ageOfRain, maxAgeOfRain, rainDimTime) {
        // if ageOfRain - currentRow >= maxAgeOfRain * rainDimTime, return 4
        if (ageOfRain - currentRow >= maxAgeOfRain * rainDimTime) return 4;

        // change only in 20% of the time
        if (Math.random() > 0.2) return currentStyle

        // 1 should be chosen 85% of the time
        // 2 should be chosen 5% of the time
        // 3 should be chosen 5% of the time
        // 4 should be chosen 3% of the time


        let random = Math.random()
        if (random < 0.03) return 4   
        if (random < 0.08) return 3
        if (random < 0.13) return 2
        return 1
        

    }

    function generateRandomLetterAndLocation(maxHeight, maxWidth) {
        let randomRow = Math.floor(Math.random() * maxHeight)
        let randomColumn = Math.floor(Math.random() * maxWidth)
        // randomly pick a letter from A-Z
        let randomLetter = generateRandomLetter()
        return {r: randomRow, c: randomColumn, l: randomLetter}
    }

    function generateRandomLetter() {
        // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾙﾚﾜﾝ010101010101010101010101010101012'
        // const characters = 'ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾙﾚﾜﾝ01233456789'
        const characters = '00000001111111ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        return characters.charAt(Math.floor(Math.random() * characters.length))
    }


    function drawOnCanvas(currentTick: number) {

        console.log('drawing on canvas', currentTick)

        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        console.log(context)
        context!.fillStyle = "red";
        context!.font = "50px Arial";
        context!.fillText("0123456789",0,38);
    }

    function getDefaultState(nRows, nCols) {
        return {
            letters: getEmptyLetters(nRows, nCols),
            rain: getEmptyRains(nCols)
        }
    }

    function getEmptyRains(columnCount) {
        const rains = []
        for (let i = 0; i < columnCount; i++) {
            rains.push({column: i, active: false})
        }
        return rains
    }

    function getEmptyLetters(rows, columns) {
        let table = []
        for (let i = 0; i < rows; i++) {
            let row = []
            for (let j = 0; j < columns; j++) {
                row.push({key: -1})
            }  
            table.push(row)
        }
        return table    
    }

    function helper1() {
        clearInterval(intervalRef.current)
    }

    function helper2() {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        console.log(context)
        context!.fillStyle = "red";
        context!.font = "50px Arial";
        context!.fillText("0123456789",0,38);
    }

    function helper3() {
        setTickCounter(tickCounter + 1)
    }

    function helper4() {
        clearCanvas()
    }
    function helper5() {
        document.body.classList.toggle('dark-matrix')
    }

    function clearCanvas() {
        let canvasDrawingWidth = LETTER_WIDTH_PX * COLUMN_COUNT
        let canvasDrawingHeight = LETTER_HEIGHT_PX * ROW_COUNT
        canvasRef.current.getContext('2d').clearRect(0, 0, canvasDrawingWidth, canvasDrawingHeight)
    }

    function setCanvasAttributes(canvas) {


        // calculate total dimensions of board
        let canvasDrawingWidth = LETTER_WIDTH_PX * COLUMN_COUNT
        let canvasDrawingHeight = LETTER_HEIGHT_PX * ROW_COUNT

        // print total dimensions of board
        console.log(`canvas dimensions: ${canvasDrawingWidth} x ${canvasDrawingHeight}`)

        const ratio = window.devicePixelRatio;
        // print out the device width and height in pixels
        console.log(`device dimensions: ${window.innerWidth} x ${window.innerHeight}`)
        let deviceViewPortDimensions = {width: window.innerWidth, height: window.innerHeight}
        let desiredWidth = Math.floor(deviceViewPortDimensions.width * 0.8)
        let desiredHeight = Math.floor(deviceViewPortDimensions.height * 0.8)
        while (desiredWidth % 10 != 0) desiredWidth -=1
        while (desiredHeight % 10 != 0) desiredHeight -=1
        console.log(`devicePixelRatio: ${ratio}`)
        // canvas.width = desiredWidth;
        // canvas.height = desiredHeight;
        canvas.width = canvasDrawingWidth;
        canvas.height = canvasDrawingHeight;
        canvas.style.width = desiredWidth + "px";
        canvas.style.height = desiredHeight + "px";
        canvas.style.backgroundColor = 'black'


        // canvas.getContext('2d').scale(desiredWidth/canvasDrawingWidth, desiredHeight/canvasDrawingHeight)
        // will use this later to scale from desired 22*70 x 22x25 to actual screen dimensions
    }
    const canvas = <canvas 
        className={styles.canvas}
        ref={canvasRef}
        id='matrix-canvas'
    ></canvas>

    function getNeoDotsText() {
        let dots = ''
        let currentDots = Math.floor(tickCounter / FPS) % 5
        for (let i = 1; i < currentDots; i++) {
            dots += '.'
        }
        return dots
    }

    return (
        <div>
            <div id="niss"></div>
            <ReturnHomeCompoment/>


            <div className={styles.helloNeoCtnr}>
                <div className={styles.neoDotsSpace}></div>
                <div className={styles.helloNeoTxt} onClick={() => drawRandomLetter()}>Hello Neo</div>
                <div className={styles.neoDots}>{getNeoDotsText()}</div>
            </div>
            <div id="cnvs-ctr" className={styles.canvasContainer}>
                {canvas}
            </div>
            {
                DEBUG_BUTTONS_ON ? 
                <div>
                    <button onClick={() => helper1()}>stop timer</button>
                    <button onClick={() => helper2()}>helper 2</button>
                    <button onClick={() => helper3()}>tick+1</button>
                    <button onClick={() => helper4()}>clear cnvs</button>
                </div> : ""}
            <div >{tickCounter}</div>
            <button onClick={() => helper5()}>darkB</button>
        </div>
    )
}
export default MatrixRainComponent