import { SyntheticEvent, useEffect, useState } from 'react';
import styles from '../../styles/Maneuvers.module.scss'
import { Box, Tabs, Tab, FormControlLabel, Checkbox, FormGroup } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function ManeuversComponent() {

    const [selectedTab, setSelectedTab] = useState(0)
    const [finalText, setFinalText] = useState("Here are my maneuvers: A, B, C")
    const [selectedRadios, setSelectedRadios] = useState({
        barrel_roll: false,
        roll: false,
        cobra: false
    })

    const radioIdToReadableManeuver: Record<string, string> = {
        'barrel_roll': 'Barrel Roll',
        'roll': 'Roll',
        'cobra': 'Cobra Maneuver',
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


    function CustomTabPanel(props: any) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
                <Tab label="Private Pilot" {...a11yProps(0)} />
                <Tab disabled label="Other Modes" {...a11yProps(1)} />
            </Tabs>
            </Box>
            <CustomTabPanel value={selectedTab} index={0}>
                <FormGroup className={styles.FormGroup}>
                    <FormControlLabel
                        control={
                        <Checkbox checked={selectedRadios.barrel_roll} onChange={handleCheckboxChange} name="barrel_roll" />
                        }
                        label={radioIdToReadableManeuver['barrel_roll']}

                    />
                    <FormControlLabel
                        control={
                        <Checkbox checked={selectedRadios.roll} onChange={handleCheckboxChange} name="roll" />
                        }
                        label={radioIdToReadableManeuver['roll']}

                    />
                    <FormControlLabel
                        control={
                        <Checkbox checked={selectedRadios.cobra} onChange={handleCheckboxChange} name="cobra" />
                        }
                        label={radioIdToReadableManeuver['cobra']}
                    />
                </FormGroup>
            </CustomTabPanel>

            <CustomTabPanel value={selectedTab} index={1}>
            Item Two
            </CustomTabPanel>
            
            <textarea className={styles.FinalTextBox} id="copyBox" rows={5} cols={100} readOnly value={finalText}></textarea>
            <input className={styles.CopyButton} type="button" value="Copy text" onClick={copyText}/>
            <ToastContainer/>
            <div id={styles.FooterMsg}>Made by Arthur for Dad</div>

        </div>
        

    )

}

