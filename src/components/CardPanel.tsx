'use client'

import { useReducer } from 'react';
import Card from './Card';
import Link from 'next/link';

// Define venue type with vid field
interface Venue {
  vid: string;
  name: string;
  image: string;
}

// Define our state type
interface RatingsState {
  venueRatings: Map<string, number>;
  visibleInList: Set<string>;
}

// Action types
type RatingAction = 
  | { type: 'UPDATE_RATING'; venueName: string; rating: number }
  | { type: 'TOGGLE_VISIBILITY'; venueName: string };

// Mock venue data with vid field
const defaultVenues: Venue[] = [
  { vid: '001', name: 'The Bloom Pavilion', image: '/images/bloom.jpg' },
  { vid: '002', name: 'Spark Space', image: '/images/sparkspace.jpg' },
  { vid: '003', name: 'The Grand Table', image: '/images/grandtable.jpg' }
];

// Initialize state
const createInitialState = (venues: Venue[]): RatingsState => {
  const initialRatings = new Map<string, number>();
  const initialVisibility = new Set<string>();
  
  venues.forEach(venue => {
    initialRatings.set(venue.name, 0);
  });
  
  return { 
    venueRatings: initialRatings,
    visibleInList: initialVisibility
  };
};

// Reducer function
const ratingsReducer = (state: RatingsState, action: RatingAction): RatingsState => {
  switch (action.type) {
    case 'UPDATE_RATING': {
      const newRatings = new Map(state.venueRatings);
      newRatings.set(action.venueName, action.rating);
      
      // When a rating is updated, ensure the venue is visible in the list
      const newVisibility = new Set(state.visibleInList);
      newVisibility.add(action.venueName);
      
      return { 
        venueRatings: newRatings,
        visibleInList: newVisibility
      };
    }
    
    case 'TOGGLE_VISIBILITY': {
      const newVisibility = new Set(state.visibleInList);
      
      if (newVisibility.has(action.venueName)) {
        newVisibility.delete(action.venueName);
      } else {
        newVisibility.add(action.venueName);
      }
      
      return {
        ...state,
        visibleInList: newVisibility
      };
    }
    
    default:
      return state;
  }
};

interface CardPanelProps {
  venues?: Venue[];
}

export default function CardPanel({ venues = defaultVenues }: CardPanelProps) {
  const [state, dispatch] = useReducer(
    ratingsReducer, 
    createInitialState(venues)
  );

  // Handler for rating changes
  const handleRatingChange = (venueName: string, newRating: number | null) => {
    dispatch({
      type: 'UPDATE_RATING',
      venueName,
      rating: newRating || 0
    });
  };

  // Handler for venue list item click
  const handleListItemClick = (venueName: string) => {
    dispatch({
      type: 'TOGGLE_VISIBILITY',
      venueName
    });
  };

  // Find venue by name
  const getVenueByName = (name: string) => {
    return venues.find(venue => venue.name === name);
  };

  return (
    <div className="flex flex-col w-full p-5">
      {/* Venue Cards */}
      <div className="flex flex-row flex-wrap justify-around w-full" style={{margin: "20px"}}>
        {venues.map((venue) => (
          <div key={venue.vid} className="cursor-pointer mb-6">
            <Link href={`/venue/${venue.vid}`}>
              <Card 
                venueName={venue.name} 
                imgSrc={venue.image}
                rating={state.venueRatings.get(venue.name) || 0}
                onRatingChange={(newRating) => handleRatingChange(venue.name, newRating)}
              />
            </Link>
          </div>
        ))}
      </div>
      
      {/* Venue Ratings List */}
      {state.visibleInList.size > 0 && (
        <div className="bg-white rounded-lg p-4 mt-5 shadow text-black">
          <h3 className="text-lg font-semibold mb-2">
            Venue List with Ratings : {state.visibleInList.size}
          </h3>
          <ul>
            {Array.from(state.visibleInList).map(venueName => {
              const venue = getVenueByName(venueName);
              return (
                <li 
                  key={venueName}
                  className="py-1 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <Link href={venue ? `/venue/${venue.vid}` : '#'}>
                    <div onClick={() => handleListItemClick(venueName)}>
                      {venueName} : {state.venueRatings.get(venueName)}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}