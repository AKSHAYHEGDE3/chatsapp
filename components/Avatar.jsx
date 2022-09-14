import React from 'react'
import styles from '../styles/Sidebar.module.css'

const Avatar = ({name,bg}) => {

    function getDarkColor() {
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += Math.floor(Math.random() * 10);
        }
        return color;
    }

  return (
    <div style={{backgroundColor:bg?bg:getDarkColor()}} className={styles.avatar}>
        {name}
    </div>
  )
}

export default Avatar