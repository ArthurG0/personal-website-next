// @ts-nocheck
import styles from '../../styles/Bulletins.module.css'
import React, { useState , useEffect } from 'react'




function BulletinsText(props: none) {

    let text_container_styles = [styles.bltn_text_container]

    if (props.text === '') text_container_styles.push(styles.hidden)

    return (
        <div className={text_container_styles.join(' ')}>
            <div className={styles.bltn_text_intro}>Text matching your request:</div>
            <div className={styles.bltn_text}>{props.text}</div>
        </div>
    )

}

export default BulletinsText;