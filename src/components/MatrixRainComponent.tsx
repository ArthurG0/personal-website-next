// @ts-nocheck
import { useEffect, useState, useRef } from "react"
import styles from '../styles/MatrixRain.module.css'

function MatrixRainComponent(props: any) {

    const UPDATE_STATE_IS_JUST_RANDOM_LETTERS = false
    const ROW_COUNT = 25
    const COLUMN_COUNT = 70
    const LETTER_WIDTH_PX = 24
    const LETTER_HEIGHT_PX = 32
    const FPS = 5

    // matrix rail text shape is 25x70

    const [letterState, setLetterState] = useState(getDefaultState())
    const [tickCounter, setTickCounter] = useState(0)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const intervalRef = useRef(null)

    useEffect(() => {
        console.log('useEffect called')
        const msPerFrame = 1000 / FPS

        const interval = setInterval(() => {
            setTickCounter(tickCounter => tickCounter + 1)
        }, msPerFrame)
        intervalRef.current = interval
        
        setCanvasAttributes(canvasRef.current)
        return (() => clearInterval(interval))
    }, [])

    useEffect(() => {
        updateLetters(tickCounter)
        paintCanvas(tickCounter)
    }, [tickCounter])

    function paintCanvas() {
        clearCanvas()
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

    function generateRandomLettersBoard() {
        let numRandomLetters = 10
        let board = getDefaultLetters(25, 70)
        for (let i = 0; i < numRandomLetters; i++) {
            let randomLetter = generateRandomLetterAndLocation(25, 70)
            board[randomLetter.r][randomLetter.c] = {key: randomLetter.l}
        }
        // board[0][0] = {key: '0'}
        // board[0][1] = {key: '1'}
        // board[0][2] = {key: '2'}
        // board[0][3] = {key: '3'}
        // board[0][4] = {key: '4'}
        // board[0][5] = {key: '5'}
        // board[0][6] = {key: '6'}
        // board[0][7] = {key: '7'}
        // board[0][8] = {key: '8'}
        // board[0][9] = {key: '9'}
        // board[1][0] = {key: '0'}
        // board[1][1] = {key: '1'}
        // board[1][2] = {key: '2'}
        // board[1][3] = {key: '3'}
        // board[1][4] = {key: '4'}
        // board[1][5] = {key: '5'}
        // board[1][6] = {key: '6'}
        // board[1][7] = {key: '7'}
        // board[1][8] = {key: '8'}
        // board[1][9] = {key: '9'}

        // board[0][10] = {key: '0'}
        // board[0][11] = {key: '1'}
        // board[0][12] = {key: '2'}
        // board[0][13] = {key: '3'}
        // board[0][14] = {key: '4'}
        // board[0][15] = {key: '5'}
        // board[0][16] = {key: '6'}
        // board[0][17] = {key: '7'}
        // board[0][18] = {key: '8'}
        // board[0][19] = {key: '9'}

        // board[0][30] = {key: '0'}
        // board[0][31] = {key: '1'}
        // board[0][32] = {key: '2'}
        // board[0][33] = {key: '3'}
        // board[0][34] = {key: '4'}
        // board[0][35] = {key: '5'}
        // board[0][36] = {key: '6'}
        // board[0][37] = {key: '7'}
        // board[0][38] = {key: '8'}
        // board[0][39] = {key: '9'}

        // board[0][40] = {key: '0'}
        // board[0][41] = {key: '1'}
        // board[0][42] = {key: '2'}
        // board[0][43] = {key: '3'}
        // board[0][44] = {key: '4'}
        // board[0][45] = {key: '5'}
        // board[0][46] = {key: '6'}
        // board[0][47] = {key: '7'}
        // board[0][48] = {key: '8'}
        // board[0][49] = {key: '9'}

        // board[0][50] = {key: '0'}
        // board[0][51] = {key: '1'}
        // board[0][52] = {key: '2'}
        // board[0][53] = {key: '3'}
        // board[0][54] = {key: '4'}
        // board[0][55] = {key: '5'}
        // board[0][56] = {key: '6'}
        // board[0][57] = {key: '7'}
        // board[0][58] = {key: '8'}
        // board[0][59] = {key: '9'}

        // board[0][60] = {key: '0'}
        // board[0][61] = {key: '1'}
        // board[0][62] = {key: '2'}
        // board[0][63] = {key: '3'}
        // board[0][64] = {key: '4'}
        // board[0][65] = {key: '5'}
        // board[0][66] = {key: '6'}
        // board[0][67] = {key: '7'}
        // board[0][68] = {key: '8'}
        // board[0][69] = {key: '9'}

        // board[0][20] = {key: '0'}
        // board[0][21] = {key: '1'}
        // board[0][22] = {key: '2'}
        // board[0][23] = {key: '3'}
        // board[0][24] = {key: '4'}
        // board[0][25] = {key: '5'}
        // board[0][26] = {key: '6'}
        // board[0][27] = {key: '7'}
        // board[0][28] = {key: '8'}
        // board[0][29] = {key: '9'}

        // board[0][20] = {key: '0'}
        // board[0][21] = {key: '1'}
        // board[0][22] = {key: '2'}
        // board[0][23] = {key: '3'}
        // board[0][24] = {key: '4'}
        // board[0][25] = {key: '5'}
        // board[0][26] = {key: '6'}
        // board[0][27] = {key: '7'}
        // board[0][28] = {key: '8'}
        // board[0][29] = {key: '9'}

        return {
            letters: board,
            rain: getDefaultRain(COLUMN_COUNT)
        }
    }

    function getNextStateRains(currentRains, tick) {
        let currentActiveRains = currentRains.filter(rain => rain.active).length
        let desiredActiveRains = 45
        let newOpportunities = (desiredActiveRains - currentActiveRains)
        let chanceOfSingleNew = newOpportunities / (COLUMN_COUNT * 50)
        console.log(`chance Of Single New rain: ${chanceOfSingleNew}`)
        let newRain = JSON.parse(JSON.stringify(currentRains))
        for (let i = 0; i < newRain.length; i++) {
            if (!newRain[i].active) {
                if (Math.random() < chanceOfSingleNew) {
                    newRain[i].active = true
                    newRain[i].cleanup = false
                    newRain[i].age = 1
                    newRain[i].maxAge = getNextRainMaxAge()
                }
            } else if (newRain[i].active) {
                newRain[i].age += 1
                if (newRain[i].age > newRain[i].maxAge) {
                    if (newRain[i].cleanup) {
                        newRain[i].active = false
                    } else {
                        newRain[i].cleanup = true
                        newRain[i].age = 1
                        newRain[i].maxAge = getCleanupMaxAge()
                    }
                }
            }
            // if (newRain[i].active && newRain[i].cleanup && newRain[i].age > newRain[i].maxAge) {
            //     newRain[i].active = false
            // } else if (newRain[i].active && !newRain[i].cleanup) {
            //     newRain[i].age += 1
            //     if (newRain[i].age > newRain[i].maxAge) {
            //         newRain[i].cleanup = true
            //         newRain[i].age = 1
            //         newRain[i].maxAge = getCleanupMaxAge()
            //     }
            // } else if (!newRain[i].active) {
            //     if (Math.random() < chanceOfSingleNew) {
            //         newRain[i].active = true
            //         newRain[i].cleanup = false
            //         newRain[i].age = 1
            //         newRain[i].maxAge = getNextRainMaxAge()
            //     }
            // }
        }
        return newRain
    }

    function getNextStateLetters(oldLetters, rains, tick) {
        let newLetters = JSON.parse(JSON.stringify(oldLetters))
        for (let i = 0; i < rains.length; i++) {
            if (rains[i].active && rains[i].cleanup) {
                let rainAge = rains[i].age
                if (rainAge > 0 && rainAge <= 25) {
                    newLetters[rainAge-1][i] = {key: -1 }
                }
               
            } else if (rains[i].active && !rains[i].cleanup) {
                let rainAge = rains[i].age
                if (rainAge > 0 && rainAge <= 25) {
                    newLetters[rainAge-1][i] = {key: generateRandomLetter() , age: tickCounter}
                }
            } else {
                for (let row = 0; row < ROW_COUNT; row++) {
                    newLetters[row][i] = {key: -1}
                }
            }
        }
        return newLetters
    }

    function getNextRainMaxAge() {
        // return a number between 51 and 191
        return Math.floor(Math.random() * 140) + 51
    }
    function getCleanupMaxAge() {
        // return a number between 28 and 63
        return Math.floor(Math.random() * 35) + 28
    }

    function transformState(currentState, tick) {
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


    function drawLetter(letter, row, column) {
        let coords = getCoordsFromRowColumn(row, column)
        let boxCoords = getCoordsForBox(coords.x, coords.y)
        const ctx = canvasRef.current.getContext('2d')

        // fill rectangle
        ctx.fillStyle = "#1b2511";
        ctx.fillRect(boxCoords.x, boxCoords.y, boxCoords.width, boxCoords.height)

        // fill letter
        ctx.fillStyle = "#0f8a35";
        if (letter.age && (tickCounter - letter.age <= getAgeDiffForBlueLetter())) {
            ctx.fillStyle = "#5df5eb";
        }
        ctx.font = "47px Courier";

        const letterText = letter.key
        ctx.fillText(letterText,coords.x,coords.y);
    }

    function getCoordsFromRowColumn(row, column) {
        return {x: column*LETTER_WIDTH_PX-3, y: row*LETTER_HEIGHT_PX+31} ;
    }
    function getCoordsForBox(letterX, letterY) {
        return {x: letterX+3, y: letterY-30, width: 22, height: 30}
    }
    function getColorForBox() {
        return "#1b2511"
    }
    function getAgeDiffForBlueLetter() {
        // return 3 in 1% cases
        // return 2 in 7% cases
        // in all other cases, return 1
        let random = Math.random()
        if (random < 0.01) {
            return 3
        } else if (random < 0.08) {
            return 2
        } else {
            return 1
        }
    }

    function drawRandomLetter() {

          // randomly pick a number from 0 to 25
          let randomRow = Math.floor(Math.random() * 5)
          let randomColumn = Math.floor(Math.random() * 5)
          // randomly pick a letter from A-Z
          let randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
  
          console.log(`drawing letter ${randomLetter} at row ${randomRow} and column ${randomColumn}`)
          drawLetter({key: letter, age: 0}, randomRow, randomColumn)
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

    function getDefaultState() {
        return {
            letters: getDefaultLetters(ROW_COUNT, COLUMN_COUNT),
            rain: getDefaultRain(COLUMN_COUNT)
        }
    }

    function getDefaultRain(columns) {
        const rain = []
        for (let i = 0; i < columns; i++) {
            rain.push({active: false})
        }
        return rain
    }

    function getDefaultLetters(rows, columns) {
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
        canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }

    function setCanvasAttributes(canvas) {


        // calculate total dimensions of board
        let canvasDrawingWidth = LETTER_WIDTH_PX * COLUMN_COUNT
        let canvasDrawingHeight = LETTER_HEIGHT_PX * ROW_COUNT

        const ratio = window.devicePixelRatio;
        console.log(`devicePixelRatio: ${ratio}`)
        canvas.width = canvasDrawingWidth;
        canvas.height = canvasDrawingHeight;
        canvas.style.width = canvasDrawingWidth + "px";
        canvas.style.height = canvasDrawingHeight + "px";
        canvas.style.backgroundColor = 'black'


        // canvas.getContext('2d').scale(ratio, ratio)
        // will use this later to scale from desired 22*70 x 22x25 to actual screen dimensions
    }
    const canvas = <canvas 
        className={styles.canvas}
        ref={canvasRef}
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
            <div >{tickCounter}</div>

            <div className={styles.helloNeoCtnr}>
                <div className={styles.neoDotsSpace}></div>
                <h2 className={styles.helloNeoTxt} onClick={() => drawRandomLetter()}>Hello Neo</h2>
                <h2 className={styles.neoDots}>{getNeoDotsText()}</h2>
            </div>
            <div id="cnvs-ctr" className={styles.canvasContainer}>
                {canvas}
            </div>
            <button onClick={() => helper1()}>stop timer</button>
            <button onClick={() => helper2()}>helper 2</button>
            <button onClick={() => helper3()}>tick+1</button>
            <button onClick={() => helper4()}>clear cnvs</button>
            <button onClick={() => helper5()}>darkB</button>
        </div>
    )
}
export default MatrixRainComponent