'use client'

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './banner.module.css';

export default function Banner() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of banner images
  const bannerImages = [
    '/img/cover.jpg',
    '/img/cover2.jpg',
    '/img/cover3.jpg',
    '/img/cover4.jpg'
  ];
  
  // Function to cycle to the next image
  const cycleImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };
  
  // Navigate to venue listing
  const navigateToVenues = () => {
    router.push('/venue');
  };
  
  return (
    <div className={styles.banner} onClick={cycleImage}>
      <Image 
        src={bannerImages[currentImageIndex]}
        alt='cover'
        fill={true}
        priority
        style={{ objectFit: 'cover' }}
      />
      
      <div className={styles.bannerText}>
        <h1 className='text-4xl font-bold font-sans'>where every event finds its venue</h1>
        <h3 className='text-xl font-light mt-2'>Finding the perfect venue has never been easier. Whether it's a wedding, corporate event, or private party, we're connecting people to the perfect place.</h3>
        
        {/* Select Venue Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent banner click from triggering
            navigateToVenues();
          }}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
        >
          Select Venue
        </button>
      </div>
    </div>
  );
}