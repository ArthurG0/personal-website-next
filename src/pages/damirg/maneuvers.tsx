import { SyntheticEvent, useEffect, useState } from 'react';
import styles from '../../styles/Maneuvers.module.scss'
import { Box, Tabs, Tab, FormControlLabel, Checkbox, FormGroup, FormLabel, FormControl, Button } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function ManeuversComponent() {

    interface OptionCodes {
        barrel_roll: boolean,
        roll: boolean,
        cobra: boolean,
        instrument_1: boolean,
        instrument_2: boolean,
        instrument_3: boolean,
        instrument_4: boolean,
        instrument_5: boolean,
        instrument_6: boolean,
        m_1: boolean,
        m_2: boolean,
        m_3: boolean,
        m_4: boolean,
        m_5: boolean,
        m_6: boolean,
        m_7: boolean,
        m_8: boolean,
        m_9: boolean,
        m_10: boolean,
        m_11: boolean,
        m_12: boolean,
        m_13: boolean,
        m_14: boolean,
        m_15: boolean,
        m_16: boolean,
        m_17: boolean,
        m_18: boolean,
        m_19: boolean,
        m_20: boolean,
        m_21: boolean,
        m_22: boolean,
        m_23: boolean,
        m_24: boolean,
        m_25: boolean,
        m_26: boolean,
        m_27: boolean,
        m_28: boolean,
        m_29: boolean,
        m_30: boolean,
        m_31: boolean,
        m_32: boolean,
        m_33: boolean,
        m_34: boolean,
        m_35: boolean,
        m_36: boolean,
        m_37: boolean,
        m_38: boolean,
        m_39: boolean,
        m_40: boolean,
        m_41: boolean,
        m_42: boolean,
        m_43: boolean,
        m_44: boolean,
        m_45: boolean,
        m_46: boolean,
        m_47: boolean,
        m_48: boolean,
        m_49: boolean,
        m_50: boolean,
        m_51: boolean,
        m_52: boolean,
        m_53: boolean,
        m_54: boolean,
        m_55: boolean,
        m_56: boolean,
        m_57: boolean,
        m_58: boolean,
        m_59: boolean,
        m_60: boolean,
        m_61: boolean,
        m_62: boolean,
        m_63: boolean,
        m_64: boolean,
        m_65: boolean,
        m_66: boolean,
        m_67: boolean,
        m_68: boolean,
        m_69: boolean,
        m_70: boolean,
        m_71: boolean,
        m_72: boolean,
        m_73: boolean,
        m_74: boolean,
        m_75: boolean,
        m_76: boolean,
        m_77: boolean,
        m_78: boolean,
        m_79: boolean,
    }

    const [selectedTab, setSelectedTab] = useState(0)
    const [isMobile, setIsMobile] = useState(false);
    const [finalText, setFinalText] = useState("Here are my maneuvers: A, B, C")
    const [selectedRadios, setSelectedRadios] = useState<OptionCodes>({
        barrel_roll: false,
        roll: false,
        cobra: false,
        instrument_1: false,
        instrument_2: false,
        instrument_3: false,
        instrument_4: false,
        instrument_5: false,
        instrument_6: false,
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
        m_52: false,
        m_53: false,
        m_54: false,
        m_55: false,
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
        'm_41': 'Eights-on-Pylons 7-14',

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







        'instrument_1': 'Instrument Maneuver 1',
        'instrument_2': 'Maneuver 2',
        'instrument_3': 'Instrument Maneuver 3',
        'instrument_4': 'Instrument Maneuver 4',
        'instrument_5': 'Maneuver 5',
        'instrument_6': 'Instrument Maneuver 6',

    }

    useEffect(() => {

        setFinalText(() => {
            
            const selectedManeuvers: string[] = []
            for (const [key,value] of Object.entries(selectedRadios)) {
                if (value) selectedManeuvers.push(radioIdToReadableManeuver[key])
            }

            if (selectedManeuvers.length === 0) return "Select maneuvers to continue."
            else return `${selectedManeuvers.join(', ')}`

        })

    }, [selectedRadios])


    function handleChange(event: SyntheticEvent, newTabIndex: number) : void {
        setSelectedTab(newTabIndex)
    }

    function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSelectedRadios({
            ...selectedRadios,
            [event.target.name]: event.target.checked
        });
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

    let formControlLabelSxProperty: Record<string, any> = {
        '.MuiButtonBase-root': { padding: '6px' }
    }
    let formLabelSxProperty : Record<string, any> = { fontWeight: 'bold' }
    let formControlSxProperty: Record<string, any> = { minWidth: '20%' }
    let checkboxBoxSxProperty: Record<string, any> = {textAlign: 'left', display: 'flex', gap: '30px 30px', flexWrap: 'wrap' }
    if (isMobile) {
        formControlLabelSxProperty = {
            '.MuiTypography-root': { fontSize: '1rem' },
            '.MuiButtonBase-root': { padding: '6px' }
        }
        checkboxBoxSxProperty = {
            ...checkboxBoxSxProperty,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px 20px'
        }
        formControlSxProperty = {
            ...formControlSxProperty,
            minWidth: '40%',
        }
    }


    function CustomTabPanel(props: any) {
        const { children, value, index, ...other } = props;

        let paddingValue = '3vh 3vw'
        if (isMobile){ 
            paddingValue = '8px 8px 20vh 8px'
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
            <Button className={ styles.CopyButton } variant="contained" onClick={copyText}>Copy text</Button>
        </>
    )

    if (isMobile) {
        textAndCopyTextFooterCompoment = (
        <div className={styles.FloatingMobileFooterBox}>
            <textarea className={styles.FinalTextBox} id="copyBox" rows={5} cols={100} readOnly value={finalText}></textarea>
            <Button className={ styles.CopyButton } variant="contained" onClick={copyText}>Copy text</Button>
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
                <FormControl sx={formControlSxProperty}>
                <FormLabel sx={formLabelSxProperty} component="legend">Ground Operations</FormLabel>
                    <FormGroup sx={formControlSxProperty}>
                        {
                            ['m_1', 'm_2', 'm_3', 'm_4', 'm_5', 'm_6', 'm_7'].map((option_code, index) => {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox 
                                                checked={selectedRadios[option_code as keyof OptionCodes]}
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

                <FormControl sx={formControlSxProperty}>
                <FormLabel sx={{fontWeight: 'bold'}} component="legend">Airport Operations</FormLabel>
                    <FormGroup>
                        {
                            ['m_8', 'm_9', 'm_10'].map((option_code, index) => {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox checked={selectedRadios[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                        }
                                        label={radioIdToReadableManeuver[option_code]}
                                        sx={formControlLabelSxProperty}
                                        key={`airportOps-${index}`}

                                    /> )
                            })
                        }
                    </FormGroup>
                </FormControl>

                <FormControl sx={formControlSxProperty}>
                <FormLabel sx={formLabelSxProperty} component="legend">Basic Flight Maneuvers</FormLabel>
                    <FormGroup>
                        {
                            ['m_11', 'm_12', 'm_13', 'm_14', 'm_15', 'm_16', 'm_17', 'm_18'].map((option_code, index) => {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox checked={selectedRadios[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                        }
                                        label={radioIdToReadableManeuver[option_code]}
                                        sx={formControlLabelSxProperty}
                                        key={`basic-flight-${index}`}

                                    /> )
                            })
                        }
                    </FormGroup>
                </FormControl>

                <FormControl sx={formControlSxProperty}>
                <FormLabel sx={formLabelSxProperty} component="legend">Upset Prevention and Recovery Training</FormLabel>
                    <FormGroup>
                        {
                            ['m_19', 'm_20', 'm_21', 'm_22', 'm_23', 'm_24', 'm_25', 'm_26', 'm_27'].map((option_code, index) => {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox checked={selectedRadios[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                        }
                                        label={radioIdToReadableManeuver[option_code]}
                                        sx={formControlLabelSxProperty}
                                        key={`upset-prev-${index}`}

                                    /> )
                            })
                        }
                    </FormGroup>
                </FormControl>

                <FormControl sx={formControlSxProperty}>
                <FormLabel sx={formLabelSxProperty} component="legend">Takeoffs and Landings</FormLabel>
                    <FormGroup>
                        {
                            ['m_28', 'm_29', 'm_30', 'm_31', 'm_32', 'm_33', 'm_34', 'm_35', 'm_36', 'm_37'].map((option_code, index) => {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox checked={selectedRadios[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                        }
                                        label={radioIdToReadableManeuver[option_code]}
                                        sx={formControlLabelSxProperty}
                                        key={`takeoffs-${index}`}

                                    /> )
                            })
                        }
                    </FormGroup>
                </FormControl>

                <FormControl sx={formControlSxProperty}>
                <FormLabel sx={formLabelSxProperty} component="legend">Ground Reference Maneuvers</FormLabel>
                    <FormGroup>
                        {
                            ['m_38', 'm_39', 'm_40', 'm_41'].map((option_code, index) => {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox checked={selectedRadios[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                        }
                                        label={radioIdToReadableManeuver[option_code]}
                                        sx={formControlLabelSxProperty}
                                        key={`ground-ref-${index}`}

                                    /> )
                            })
                        }
                    </FormGroup>
                </FormControl>

                <FormControl sx={formControlSxProperty}>
                <FormLabel sx={formLabelSxProperty} component="legend">Performance Maneuvers</FormLabel>
                    <FormGroup>
                        {
                            ['m_42', 'm_43', 'm_44', 'm_45'].map((option_code, index) => {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox checked={selectedRadios[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                        }
                                        label={radioIdToReadableManeuver[option_code]}
                                        sx={formControlLabelSxProperty}
                                        key={`perf-${index}`}

                                    /> )
                            })
                        }
                    </FormGroup>
                </FormControl>

                <FormControl sx={formControlSxProperty}>
                <FormLabel sx={formLabelSxProperty} component="legend">Navigation</FormLabel>
                    <FormGroup>
                        {
                            ['m_46', 'm_47', 'm_48', 'm_49', 'm_50', 'm_51'].map((option_code, index) => {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox checked={selectedRadios[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                        }
                                        label={radioIdToReadableManeuver[option_code]}
                                        sx={formControlLabelSxProperty}
                                        key={`nav-${index}`}

                                    /> )
                            })
                        }
                    </FormGroup>
                </FormControl>

                <FormControl sx={formControlSxProperty}>
                <FormLabel sx={formLabelSxProperty} component="legend">Night Operations</FormLabel>
                    <FormGroup>
                        {
                            ['m_52', 'm_53'].map((option_code, index) => {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox checked={selectedRadios[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                        }
                                        label={radioIdToReadableManeuver[option_code]}
                                        sx={formControlLabelSxProperty}
                                        key={`night-${index}`}

                                    /> )
                            })
                        }
                    </FormGroup>
                </FormControl>

                <FormControl sx={formControlSxProperty}>
                <FormLabel sx={formLabelSxProperty} component="legend">Emergency Procedures</FormLabel>
                    <FormGroup>
                        {
                            ['m_54', 'm_55', 'm_56', 'm_57', 'm_58', 'm_59', 'm_60', 'm_61', 'm_62', 'm_63', 'm_64', 'm_65', 'm_66', 'm_67', 'm_68', 'm_69'].map((option_code, index) => {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox checked={selectedRadios[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                        }
                                        label={radioIdToReadableManeuver[option_code]}
                                        sx={formControlLabelSxProperty}
                                        key={`emergency-${index}`}

                                    /> )
                            })
                        }
                    </FormGroup>
                </FormControl>
                <div id={styles.FooterMsg}>Made by Arthur for Dad</div>

            </Box>
            </CustomTabPanel>

            <CustomTabPanel value={selectedTab} index={1}>
                <Box sx={checkboxBoxSxProperty}>
                    <FormControl sx={formControlSxProperty}>
                    <FormLabel sx={formLabelSxProperty} component="legend">Transition to Complex Airplanes</FormLabel>
                        <FormGroup>
                            {
                                ['m_70', 'm_71', 'm_72'].map((option_code, index) => {
                                    return (
                                        <FormControlLabel 
                                            control={
                                                <Checkbox checked={selectedRadios[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                            }
                                            label={radioIdToReadableManeuver[option_code]}
                                            sx={formControlLabelSxProperty}
                                            key={`trans-compl-${index}`}

                                        /> )
                                })
                            }
                        </FormGroup>
                    </FormControl>

                    <FormControl sx={formControlSxProperty}>
                    <FormLabel sx={formLabelSxProperty} component="legend">Transition to Multiengine Airplanes</FormLabel>
                        <FormGroup>
                            {
                                ['m_73', 'm_74', 'm_75', 'm_76', 'm_77', 'm_78', 'm_79'].map((option_code, index) => {
                                    return (
                                        <FormControlLabel 
                                            control={
                                                <Checkbox checked={selectedRadios[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                                            }
                                            label={radioIdToReadableManeuver[option_code]}
                                            sx={formControlLabelSxProperty}
                                            key={`trans-multieng-${index}`}

                                        /> )
                                })
                            }
                        </FormGroup>
                    </FormControl>
                    <div id={styles.FooterMsg}>Made by Arthur for Dad</div>

                </Box>
            </CustomTabPanel>
            <ToastContainer/>
            
            { textAndCopyTextFooterCompoment }

        </div>
        

    )

}

