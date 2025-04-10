import { SyntheticEvent, useEffect, useState } from 'react';
import styles from '../../styles/Maneuvers.module.scss'
import { Box, Tabs, Tab, FormControlLabel, Checkbox, FormGroup } from '@mui/material'
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
    }

    const [selectedTab, setSelectedTab] = useState(0)
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
    })
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Function to check if the device is mobile
        const checkIfMobile = () => {
        const width = window.innerWidth;
        setIsMobile(width < 768); // You can adjust this threshold as needed
        };

        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile);

        // Initial check on component mount
        checkIfMobile();

        // Cleanup function to remove event listener
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const radioIdToReadableManeuver: Record<string, string> = {
        'barrel_roll': 'Barrel Roll',
        'roll': 'Roll',
        'cobra': 'Cobra Maneuver',
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

            if (selectedManeuvers.length === 0) return "No maneuvers were performed"
            if (selectedManeuvers.length === 1) return `Performed a ${selectedManeuvers[0]}`
            else return `Performed the following maneuvers: ${selectedManeuvers.join(', ')}`

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

    let sxProperty = {}
    if (isMobile) {
        sxProperty = {'.MuiTypography-root': {fontSize: '0.9rem'}}
    }


    function CustomTabPanel(props: any) {
        const { children, value, index, ...other } = props;

        let paddingValue = 3
        if (isMobile) paddingValue = 1
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && <Box sx={{ p: paddingValue, overflowX: 'scroll' }}>{children}</Box>}
          </div>
        );
    }

    function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        
        <div className={styles.ManeuversMain}>

            <div>{"Use this form to get a list of completed maneuvers"}</div>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={selectedTab} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="VFR Maneuvers" {...a11yProps(0)} />
                <Tab label="Instrument Maneuvers" {...a11yProps(1)} />
            </Tabs>
            </Box>
            <CustomTabPanel value={selectedTab} index={0}>
                <FormGroup>
                    <FormControlLabel
                        control={
                        <Checkbox checked={selectedRadios.barrel_roll} onChange={handleCheckboxChange} name="barrel_roll" />
                        }
                        sx={sxProperty}
                        label={radioIdToReadableManeuver['barrel_roll']}

                    />
                    <FormControlLabel
                        control={
                        <Checkbox checked={selectedRadios.roll} onChange={handleCheckboxChange} name="roll" />
                        }
                        sx={sxProperty}
                        label={radioIdToReadableManeuver['roll']}

                    />
                    <FormControlLabel
                        control={
                        <Checkbox checked={selectedRadios.cobra} onChange={handleCheckboxChange} name="cobra" />
                        }
                        sx={sxProperty}
                        label={radioIdToReadableManeuver['cobra']}
                    />
                </FormGroup>
            </CustomTabPanel>

            <CustomTabPanel value={selectedTab} index={1}>
            <FormGroup sx={{maxHeight: '40vh'}}>
                {
                    [
                        'instrument_1',
                        'instrument_2',
                        'instrument_3',
                        'instrument_4',
                        'instrument_5',
                        'instrument_3',
                        'instrument_4',
                        'instrument_5',
                        'instrument_2',
                        'instrument_1',
                        'instrument_3',
                    ].map((option_code,index) => {
                        return (
                        <FormControlLabel 
                            control={
                                <Checkbox checked={selectedRadios[option_code as keyof OptionCodes]} onChange={handleCheckboxChange} name={option_code} />
                            }
                            label={radioIdToReadableManeuver[option_code]}
                            sx={sxProperty}
                        /> )
                    })
                }
                    {/* <FormControlLabel
                        control={
                        <Checkbox checked={selectedRadios.instrument_1} onChange={handleCheckboxChange} name="instrument_1" />
                        }
                        label={radioIdToReadableManeuver['instrument_1']}
                        sx={sxProperty}
                    />
                    <FormControlLabel
                        control={
                        <Checkbox checked={selectedRadios.instrument_2} onChange={handleCheckboxChange} name="instrument_2" />
                        }
                        label={radioIdToReadableManeuver['instrument_2']}
                        sx={sxProperty}
                    />
                    <FormControlLabel
                        control={
                        <Checkbox checked={selectedRadios.instrument_3} onChange={handleCheckboxChange} name="instrument_3" />
                        }
                        sx={sxProperty}
                        label={radioIdToReadableManeuver['instrument_3']}
                    />
                    <FormControlLabel
                        control={
                        <Checkbox checked={selectedRadios.instrument_4} onChange={handleCheckboxChange} name="instrument_4" />
                        }
                        sx={sxProperty}
                        label={radioIdToReadableManeuver['instrument_4']}
                    />
                    <FormControlLabel
                        control={
                        <Checkbox checked={selectedRadios.instrument_5} onChange={handleCheckboxChange} name="instrument_5" />
                        }
                        sx={sxProperty}
                        label={radioIdToReadableManeuver['instrument_5']}
                    />
                    <FormControlLabel
                        control={
                        <Checkbox checked={selectedRadios.instrument_3} onChange={handleCheckboxChange} name="instrument_3" />
                        }
                        sx={sxProperty}
                        label={radioIdToReadableManeuver['instrument_3']}
                    />
                    <FormControlLabel
                        control={
                        <Checkbox checked={selectedRadios.instrument_4} onChange={handleCheckboxChange} name="instrument_4" />
                        }
                        sx={sxProperty}
                        label={radioIdToReadableManeuver['instrument_4']}
                    />
                    <FormControlLabel
                        control={
                        <Checkbox checked={selectedRadios.instrument_5} onChange={handleCheckboxChange} name="instrument_5" />
                        }
                        sx={sxProperty}
                        label={radioIdToReadableManeuver['instrument_5']}
                    /> */}
                    
                </FormGroup>
            </CustomTabPanel>
            
            <textarea className={styles.FinalTextBox} id="copyBox" rows={5} cols={100} readOnly value={finalText}></textarea>
            <input className={styles.CopyButton} type="button" value="Copy text" onClick={copyText}/>
            <ToastContainer/>
            <div id={styles.FooterMsg}>Made by Arthur for Dad</div>

        </div>
        

    )

}

