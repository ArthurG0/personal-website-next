import { SyntheticEvent, useEffect, useState } from 'react';
import styles from '../../styles/Maneuvers.module.scss'
import { Box, Tabs, Tab, FormControlLabel, Checkbox, FormGroup, FormLabel, FormControl, Button } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function ManeuversComponent() {

    type OptionCodeKey =
    | 'm_1'  | 'm_2'  | 'm_3'  | 'm_4'  | 'm_5'  | 'm_6'  | 'm_7'  | 'm_8'  | 'm_9'  | 'm_10'
    | 'm_11' | 'm_12' | 'm_13' | 'm_14' | 'm_15' | 'm_16' | 'm_17' | 'm_18' | 'm_19' | 'm_20'
    | 'm_21' | 'm_22' | 'm_23' | 'm_24' | 'm_25' | 'm_26' | 'm_27' | 'm_28' | 'm_29' | 'm_30'
    | 'm_31' | 'm_32' | 'm_33' | 'm_34' | 'm_35' | 'm_36' | 'm_37' | 'm_38' | 'm_39' | 'm_40'
    | 'm_41' | 'm_42' | 'm_43' | 'm_44' | 'm_45' | 'm_46' | 'm_47' | 'm_48' | 'm_49' | 'm_50'
    | 'm_51' | 'm_52' | 'm_53' | 'm_54' | 'm_55' | 'm_56' | 'm_57' | 'm_58' | 'm_59' | 'm_60'
    | 'm_61' | 'm_62' | 'm_63' | 'm_64' | 'm_65' | 'm_66' | 'm_67' | 'm_68' | 'm_69' | 'm_70'
    | 'm_71' | 'm_72' | 'm_73' | 'm_74' | 'm_75' | 'm_76' | 'm_77' | 'm_78' | 'm_79' | 'm_80'
    | 'm_81' ;

    type OptionCodes = Record<OptionCodeKey, boolean>;


    const [selectedTab, setSelectedTab] = useState(0)
    const [isMobile, setIsMobile] = useState(true);
    const [isPhoneSize, setIsPhoneSize] = useState(false);
    const [screenWidth, setScreenWidth] = useState(768);
    const [finalText, setFinalText] = useState("Here are my maneuvers: A, B, C")
    const [selectedRadiosList, setSelectedRadiosList] = useState<string[]>([])
    const [radioValues, setRadioValues] = useState<Record<OptionCodeKey, boolean>>({

        // Ground
        m_1: false,
        m_2: false,
        m_3: false,
        m_4: false,
        m_5: false,
        m_6: false,
        m_7: false,

        m_8: false,
        m_9: false,
        m_10: false,

        m_11: false,
        m_12: false,
        m_13: false,
        m_14: false,
        m_15: false,
        m_16: false,
        m_17: false,
        m_18: false,
        
        m_19: false,
        m_20: false,
        m_21: false,
        m_22: false,
        m_23: false,
        m_24: false,
        m_25: false,
        m_26: false,
        m_27: false,

        m_28: false,
        m_29: false,
        m_30: false,
        m_31: false,
        m_32: false,
        m_33: false,
        m_34: false,
        m_35: false,
        m_36: false,
        m_37: false,

        m_38: false,
        m_39: false,
        m_40: false,
        m_41: false,

        m_42: false,
        m_43: false,
        m_44: false,
        m_45: false,

        m_46: false,
        m_47: false,
        m_48: false,
        m_49: false,
        m_50: false,
        m_51: false,
        m_81: false,

        m_52: false,
        m_53: false,

        m_54: false,
        m_55: false,
        m_80: false,
        m_56: false,
        m_57: false,
        m_58: false,
        m_59: false,
        m_60: false,
        m_61: false,
        m_62: false,
        m_63: false,
        m_64: false,
        m_65: false,
        m_66: false,
        m_67: false,
        m_68: false,
        m_69: false,

        m_70: false,
        m_71: false,
        m_72: false,

        m_73: false,
        m_74: false,
        m_75: false,
        m_76: false,
        m_77: false,
        m_78: false,
        m_79: false,
    })


    useEffect(() => {
        // Function to check if the device is mobile
        const checkIfMobile = () => {
            const width = window.innerWidth;
            setIsMobile(width < 770); // You can adjust this threshold as needed
            setIsPhoneSize(width < 600);
            setScreenWidth(width);
            
        };

        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile);

        // Initial check on component mount
        checkIfMobile();

        // Cleanup function to remove event listener
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const radioIdToReadableManeuver: Record<string, string> = {
        // Ground Operations
        'm_1' :'Preflight Preparation',
        'm_2' :'Preflight Inspection',
        'm_3' :'Ground Operations',
        'm_4' :'Engine Starting',
        'm_5' :'Taxiing',
        'm_6' :'Post-Flight',
        'm_7' :'Securing and Servicing',

        // Airport Operations
        'm_8': 'Traffic Patterns and Operations',
        'm_9': 'Non-Towered Airport Operations',
        'm_10': 'Runway Incursion',

        // Basic Flight Maneuvers
        'm_11': 'Straight-and-Level Flight',
        'm_12': 'Trim Control',
        'm_13': 'Level Turns',
        'm_14': 'Climb',
        'm_15': 'Climbing Turns',
        'm_16': 'Descents',
        'm_17': 'Descending Turns',
        'm_18': 'Gliding',

        // Upset Prevention and Recovery Training
        'm_19': 'Slow Flight',
        'm_20': 'Power off Stall',
        'm_21': 'Power on Stall',
        'm_22': 'Secondary Stall',
        'm_23': 'Accelerated Stall',
        'm_24': 'Cross-Control Stall',
        'm_25': 'Elevator Trim Stall',
        'm_26': 'Spin & Recovery Procedures',
        'm_27': 'Unusual Attitudes Recovery',

        // Takeoffs and Landings
        'm_28': 'Using Flaps',
        'm_29': 'Stabilized Approach Concept',
        'm_30': 'Normal TO&LDG',
        'm_31': 'Crosswind TO&LDG',
        'm_32': 'Short field TO&LDG',
        'm_33': 'Soft field TO&LDG',
        'm_34': 'Forward Slip to a LDG',
        'm_35': 'Power off 180 approach',
        'm_36': 'Ground Effect',
        'm_37': 'Go Around',

        // Ground Reference Maneuvers
        'm_38': 'Rectangular Course',
        'm_39': 'Turns Around a Point',
        'm_40': 'S-Turns',
        'm_41': 'Eights-on-Pylons',

        // Performance Maneuvers
        'm_42': 'Steep turns',
        'm_43': 'Chandelle',
        'm_44': 'Lazy Eight',
        'm_45': 'Steep Spiral',

        // Navigation
        'm_46': 'BAI',
        'm_47': 'VOR Navigation',
        'm_48': 'GPS Navigation',
        'm_49': 'Pilotage',
        'm_50': 'Dead Reckoning',
        'm_51': 'Diversion',

        // Night Operations
        'm_52': 'Night operations',
        'm_53': 'Night TO&LDG',

        // Emergency Procedures
        'm_54': 'Emergency Approaches and Landings',
        'm_55': 'Engine Failure After Takeoff',
        'm_56': 'Emergency Descents',
        'm_57': 'In-Flight Fire',
        'm_58': 'Engine Fire',
        'm_59': 'Electrical Fires',
        'm_60': 'Cabin Fire',
        'm_61': 'Flight Control Malfunction/Failure',
        'm_62': 'Total Flap Failure',
        'm_63': 'Asymmetric (Split) Flap',
        'm_64': 'Loss of Elevator Control',
        'm_65': 'Landing Gear Malfunction',
        'm_66': 'System Malfunctions',
        'm_67': 'Electrical System',
        'm_68': 'Pitot-Static System',
        'm_69': 'Abnormal Engine Instrument Indication',

        // Transition to Complex Airplanes
        'm_70': 'Constant-Speed Propeller Operation',
        'm_71': 'Turbocharger Operation',
        'm_72': 'Retractable Landing Gear',

        // Transition to Multiengine Airplanes
        'm_73': 'Feathering Propellers',
        'm_74': 'Propeller Synchronization',
        'm_75': 'Fuel Crossfeed',
        'm_76': 'Anti-Icing Deicing Equipment Operation',
        'm_77': 'Single Engine Operation',
        'm_78': 'Vmc Demo',
        'm_79': 'Engine Inoperative Approach and Landing',

        // Later additions
        
        // Emergency Procedure #3
        'm_80': 'Engine Failure',

        // Navigation Last
        'm_81': 'Lost Procedures',

    }

    useEffect(() => {

        setFinalText(() => {
            
            const selectedManeuvers: string[] = []
            selectedRadiosList.forEach(element => selectedManeuvers.push(radioIdToReadableManeuver[element]))
            
            if (selectedManeuvers.length === 0) return "Select maneuvers to continue."
            else return `${selectedManeuvers.join(', ')}`

        })

    }, [selectedRadiosList])


    function handleChange(event: SyntheticEvent, newTabIndex: number) : void {
        setSelectedTab(newTabIndex)
    }

    function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
        setRadioValues({
            ...radioValues,
            [event.target.name]: event.target.checked
        });

        setSelectedRadiosList(existingList => {
            const alreadyPresent = existingList.includes(event.target.name)
            if (event.target.checked && !alreadyPresent) {
                return [...existingList, event.target.name]
            }
            if (!event.target.checked && alreadyPresent) {
                return existingList.filter(el => el != event.target.name)
            }
            return existingList;
        })
    };


    function copyText() {
        const copyText = document.getElementById("copyBox") as HTMLInputElement;

        if (copyText == null) return

        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
        toast.success('Copied text successfully', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    // how many columns you need.
    let columnsProperty = '4 19vw';
    let columnGapProperty = '4vw';
    if(screenWidth < 1200) {
        columnsProperty = '3 25vw'
    }
    if(screenWidth < 900) {
        columnsProperty = '2 40vw'
        columnGapProperty = '5vw'
    }
    if(screenWidth < 600) {
        columnsProperty = '1'
        columnGapProperty = ''
    }

    let formControlLabelSxProperty: Record<string, any> = {
        marginLeft: '-8px',
        '.MuiButtonBase-root': { padding: '6px' }
    }
    let formLabelSxProperty : Record<string, any> = { fontWeight: 'bold', textDecoration: 'underline', textDecorationThickness: '2px' }
    let groupContainerSxProperty: Record<string, any> = {
        minWidth: '51%',
        margin: '0 0 1.5vh 0'
    }
    let checkboxBoxSxProperty: Record<string, any> = {
        textAlign: 'left',
        columns: columnsProperty,
        columnGap: columnGapProperty,
        // display: 'flex',
        // gap: '30px 30px', 
        // flexWrap: 'wrap'
    }

    if (isMobile) {
        formControlLabelSxProperty = {
            marginLeft: '-8px',
            '.MuiTypography-root': { fontSize: '1rem' },
            '.MuiButtonBase-root': { padding: '5px 5px 5px 8px' }
        }
        groupContainerSxProperty = {
            ...groupContainerSxProperty,
            minWidth: '51%',
            margin: '0 0 1.5vh 0',
        }
    }


    function CustomTabPanel(props: any) {
        const { children, value, index, ...other } = props;

        let paddingValue = '3vh 3vw'
        if (isMobile){ 
            paddingValue = '8px 8px 15vh 8px'
        }
        let boxSx = { p: paddingValue }
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && <Box sx={boxSx}>{children}</Box>}
          </div>
        );
    }

    function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    let textAndCopyTextFooterCompoment = (
        <>
            <textarea className={styles.FinalTextBox} id="copyBox" rows={5} cols={100} readOnly value={finalText}></textarea>
            <Button className={styles.CopyButton} variant="contained" onClick={copyText}>Copy text</Button>
        </>
    )

    if (isMobile) {
        textAndCopyTextFooterCompoment = (
        <div className={styles.FloatingMobileFooterBox}>
            <textarea className={styles.FinalTextBox} id="copyBox" rows={4} cols={100} readOnly value={finalText}></textarea>
            <Button className={styles.CopyButton} variant="contained" onClick={copyText}>Copy text</Button>
        </div>
        )
    }

    return (
        
        <div className={styles.ManeuversMain}>

            <div>{"Use this form to get a list of completed maneuvers"}</div>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs variant='scrollable' value={selectedTab} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Private Pilot" {...a11yProps(0)} />
                <Tab label="Advanced Flight" {...a11yProps(1)} />
                <Tab disabled label="Instrument Flight" {...a11yProps(2)} />
            </Tabs>
            </Box>
            <CustomTabPanel value={selectedTab} index={0}>
            <Box sx={checkboxBoxSxProperty}>
                <FormControl sx={groupContainerSxProperty}>
                <FormLabel sx={formLabelSxProperty} component="legend">Ground Operations</FormLabel>
                    <FormGroup>
                        {
                            ['m_1', 'm_2', 'm_3', 'm_4', 'm_5', 'm_6', 'm_7'].map((option_code, index) => {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox 
                                                checked={radioValues[option_code as keyof OptionCodes]}
                                                onChange={handleCheckboxChange}
                                                name={option_code} 
                                            />
                                        }
                                        label={radioIdToReadableManeuver[option_code]}
                                        sx={formControlLabelSxProperty}
                                        key={`groundOps-${index}`}
                                    /> )
                            })
                        }
                    </FormGroup>
                </FormControl>

                <FormControl sx={groupContainerSxProperty}>
                <FormLabel sx={formLabelSxProperty} component="legend">Airport Operations</FormLabel>
                    <FormGroup>
                        {
                            ['m_8', 'm_9', 'm_10'].map((option_code, index) => {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox checked={radioValues[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                        }
                                        label={radioIdToReadableManeuver[option_code]}
                                        sx={formControlLabelSxProperty}
                                        key={`airportOps-${index}`}

                                    /> )
                            })
                        }
                    </FormGroup>
                </FormControl>

                <FormControl sx={groupContainerSxProperty}>
                <FormLabel sx={formLabelSxProperty} component="legend">Basic Flight Maneuvers</FormLabel>
                    <FormGroup>
                        {
                            ['m_11', 'm_12', 'm_13', 'm_14', 'm_15', 'm_16', 'm_17', 'm_18'].map((option_code, index) => {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox checked={radioValues[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                        }
                                        label={radioIdToReadableManeuver[option_code]}
                                        sx={formControlLabelSxProperty}
                                        key={`basic-flight-${index}`}

                                    /> )
                            })
                        }
                    </FormGroup>
                </FormControl>

                <FormControl sx={groupContainerSxProperty}>
                <FormLabel sx={formLabelSxProperty} component="legend">Upset Prevention and Recovery Training</FormLabel>
                    <FormGroup>
                        {
                            ['m_19', 'm_20', 'm_21', 'm_22', 'm_23', 'm_24', 'm_25', 'm_26', 'm_27'].map((option_code, index) => {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox checked={radioValues[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                        }
                                        label={radioIdToReadableManeuver[option_code]}
                                        sx={formControlLabelSxProperty}
                                        key={`upset-prev-${index}`}

                                    /> )
                            })
                        }
                    </FormGroup>
                </FormControl>

                <FormControl sx={groupContainerSxProperty}>
                <FormLabel sx={formLabelSxProperty} component="legend">Takeoffs and Landings</FormLabel>
                    <FormGroup>
                        {
                            ['m_28', 'm_29', 'm_30', 'm_31', 'm_32', 'm_33', 'm_34', 'm_35', 'm_36', 'm_37'].map((option_code, index) => {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox checked={radioValues[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                        }
                                        label={radioIdToReadableManeuver[option_code]}
                                        sx={formControlLabelSxProperty}
                                        key={`takeoffs-${index}`}

                                    /> )
                            })
                        }
                    </FormGroup>
                </FormControl>

                <FormControl sx={groupContainerSxProperty}>
                <FormLabel sx={formLabelSxProperty} component="legend">Ground Reference Maneuvers</FormLabel>
                    <FormGroup>
                        {
                            ['m_38', 'm_39', 'm_40', 'm_41'].map((option_code, index) => {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox checked={radioValues[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                        }
                                        label={radioIdToReadableManeuver[option_code]}
                                        sx={formControlLabelSxProperty}
                                        key={`ground-ref-${index}`}

                                    /> )
                            })
                        }
                    </FormGroup>
                </FormControl>

                <FormControl sx={groupContainerSxProperty}>
                <FormLabel sx={formLabelSxProperty} component="legend">Performance Maneuvers</FormLabel>
                    <FormGroup>
                        {
                            ['m_42', 'm_43', 'm_44', 'm_45'].map((option_code, index) => {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox checked={radioValues[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                        }
                                        label={radioIdToReadableManeuver[option_code]}
                                        sx={formControlLabelSxProperty}
                                        key={`perf-${index}`}

                                    /> )
                            })
                        }
                    </FormGroup>
                </FormControl>

                <FormControl sx={groupContainerSxProperty}>
                <FormLabel sx={formLabelSxProperty} component="legend">Navigation</FormLabel>
                    <FormGroup>
                        {
                            ['m_46', 'm_47', 'm_48', 'm_49', 'm_50', 'm_51', 'm_81'].map((option_code, index) => {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox checked={radioValues[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                        }
                                        label={radioIdToReadableManeuver[option_code]}
                                        sx={formControlLabelSxProperty}
                                        key={`nav-${index}`}

                                    /> )
                            })
                        }
                    </FormGroup>
                </FormControl>

                <FormControl sx={groupContainerSxProperty}>
                <FormLabel sx={formLabelSxProperty} component="legend">Night Operations</FormLabel>
                    <FormGroup>
                        {
                            ['m_52', 'm_53'].map((option_code, index) => {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox checked={radioValues[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                        }
                                        label={radioIdToReadableManeuver[option_code]}
                                        sx={formControlLabelSxProperty}
                                        key={`night-${index}`}

                                    /> )
                            })
                        }
                    </FormGroup>
                </FormControl>

                <FormControl sx={groupContainerSxProperty}>
                <FormLabel sx={formLabelSxProperty} component="legend">Emergency Procedures</FormLabel>
                    <FormGroup>
                        {
                            ['m_54', 'm_55', 'm_80', 'm_56', 'm_57', 'm_58', 'm_59', 'm_60', 'm_61', 'm_62', 'm_63', 'm_64', 'm_65', 'm_66', 'm_67', 'm_68', 'm_69'].map((option_code, index) => {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox checked={radioValues[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                        }
                                        label={radioIdToReadableManeuver[option_code]}
                                        sx={formControlLabelSxProperty}
                                        key={`emergency-${index}`}

                                    /> )
                            })
                        }
                    </FormGroup>
                </FormControl>
            </Box>
            <div id={styles.FooterMsg}>Made by Arthur for Dad</div>

            </CustomTabPanel>


            <CustomTabPanel value={selectedTab} index={1}>
                <Box sx={checkboxBoxSxProperty}>
                    <FormControl sx={groupContainerSxProperty}>
                    <FormLabel sx={formLabelSxProperty} component="legend">Transition to Complex Airplanes</FormLabel>
                        <FormGroup>
                            {
                                ['m_70', 'm_71', 'm_72'].map((option_code, index) => {
                                    return (
                                        <FormControlLabel 
                                            control={
                                                <Checkbox checked={radioValues[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                            }
                                            label={radioIdToReadableManeuver[option_code]}
                                            sx={formControlLabelSxProperty}
                                            key={`trans-compl-${index}`}

                                        /> )
                                })
                            }
                        </FormGroup>
                    </FormControl>

                    <FormControl sx={groupContainerSxProperty}>
                    <FormLabel sx={formLabelSxProperty} component="legend">Transition to Multiengine Airplanes</FormLabel>
                        <FormGroup>
                            {
                                ['m_73', 'm_74', 'm_75', 'm_76', 'm_77', 'm_78', 'm_79'].map((option_code, index) => {
                                    return (
                                        <FormControlLabel 
                                            control={
                                                <Checkbox checked={radioValues[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                            }
                                            label={radioIdToReadableManeuver[option_code]}
                                            sx={formControlLabelSxProperty}
                                            key={`trans-multieng-${index}`}

                                        /> )
                                })
                            }
                        </FormGroup>
                    </FormControl>
                </Box>
                <div id={styles.FooterMsg}>Made by Arthur for Dad</div>
            </CustomTabPanel>
            <ToastContainer/>
            
            { textAndCopyTextFooterCompoment }

        </div>
        

    )

}

