'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Rating } from '@mui/material'
import Link from 'next/link'

// Mock venue data with detailed information
const venueData = new Map([
  ['001', {
    vid: '001',
    name: 'The Bloom Pavilion',
    image: '/images/bloom.jpg',
    description: 'A beautiful pavilion surrounded by gardens, perfect for weddings and outdoor events.',
    capacity: 200,
    amenities: ['Garden', 'Pavilion', 'Outdoor Space', 'Catering'],
    rating: 4.7
  }],
  ['002', {
    vid: '002',
    name: 'Spark Space',
    image: '/images/sparkspace.jpg',
    description: 'Modern event space with state-of-the-art technology for corporate events and conferences.',
    capacity: 150,
    amenities: ['Wi-Fi', 'Projector', 'Sound System', 'Catering'],
    rating: 4.5
  }],
  ['003', {
    vid: '003',
    name: 'The Grand Table',
    image: '/images/grandtable.jpg',
    description: 'Elegant dining venue ideal for banquets, formal dinners, and celebration events.',
    capacity: 120,
    amenities: ['Dining Area', 'Bar', 'Kitchen', 'Staff'],
    rating: 4.8
  }]
]);

export default function VenueDetailPage({ params }: { params: { vid: string } }) {
  const [venue, setVenue] = useState<any>(null);
  const { vid } = params;

  useEffect(() => {
    // Get venue data from the Map using vid
    const venueInfo = venueData.get(vid);
    if (venueInfo) {
      setVenue(venueInfo);
    }
  }, [vid]);

  if (!venue) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading venue information...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/venue" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Venues
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-64 relative">
          <Image 
            src={venue.image} 
            alt={venue.name} 
            fill={true}
            className="object-cover"
            data-testid="venue-image" // Add a test ID for targeting in tests
          />
        </div>
        
        <div className="p-6 text-black">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">{venue.name}</h1>
            <div className="flex items-center">
              {/* Use aria-hidden to hide this from accessibility tree */}
              <div aria-hidden="true">
                <Rating 
                  value={venue.rating} 
                  readOnly 
                />
              </div>
              <span className="ml-2">{venue.rating}</span>
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">{venue.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Venue Details</h2>
              <p className="mb-1"><span className="font-medium">Venue ID:</span> {venue.vid}</p>
              <p className="mb-1"><span className="font-medium">Capacity:</span> {venue.capacity} people</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Amenities</h2>
              <ul className="list-disc list-inside">
                {venue.amenities.map((amenity: string, index: number) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Book This Venue</h2>
            <Link 
              href="/booking" 
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Reserve Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}