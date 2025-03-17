import styles from './topmenu.module.css'
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';

export default function TopMenu(){
    return(
        <div className={styles.menucontainer}>
            <TopMenuItem title = 'Venues' pageRef='/venue'/>
            <TopMenuItem title = 'Booking' pageRef='/booking'/>
            <Image src = {'/images/logo.png'} className = {styles.logoimg} alt = 'logo' width = {0} height = {0} sizes = '100vh'/>
        </div>
    );
}