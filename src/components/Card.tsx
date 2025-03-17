'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';

interface CardProps {
  venueName: string;
  imgSrc: string;
  rating?: number;
  onRatingChange?: (newRating: number | null) => void;
}

export default function Card({ 
  venueName, 
  imgSrc, 
  rating = 0, 
  onRatingChange
}: CardProps) {
  // Local state for rating
  const [value, setValue] = useState<number | null>(rating);
  
  // Update local state when prop changes
  useEffect(() => {
    setValue(rating);
  }, [rating]);

  // Handle rating change
  const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
    // Prevent the event from bubbling up
    event.stopPropagation();
    
    setValue(newValue);
    
    // Notify parent component
    if (onRatingChange) {
      onRatingChange(newValue);
    }
  };

  return(
    <InteractiveCard>
      <div className='w-full h-[70%] relative rounded-t-lg'>
        <Image src={imgSrc}
          alt={venueName}
          fill={true}
          className='object-cover rounded-t-lg'
        />
      </div>  
      <div className='w-full h-[30%] p-[10px] flex flex-col items-center'>
        <div className='mb-2 text-black font-semibold'>{venueName}</div>
        <Rating 
          value={value}
          onChange={handleRatingChange}
          onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking rating
          id={venueName}
          name={venueName}
          data-testid={`${venueName} Rating`}
        />
      </div> 
    </InteractiveCard>
  );
}