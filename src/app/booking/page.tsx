'use client'

import React, { useState } from 'react';
import DateReserve from '@/components/DateReserve';
import { 
  Input,
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  Box, 
  Typography, 
  Container 
} from '@mui/material';

export default function Booking() {
  const [venueName, setVenueName] = useState('');
  const [nameLastname, setNameLastname] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [bookingDate, setBookingDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setBookingDate(date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      venueName,
      nameLastname,
      contactNumber,
      bookingDate
    });
    alert('Booking submitted!');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Venue Booking
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <FormControl fullWidth margin="normal" required>
          <InputLabel htmlFor="name-lastname">Name-Lastname</InputLabel>
          <Input
            id="name-lastname"
            aria-label="Name-Lastname"
            value={nameLastname}
            onChange={(e) => setNameLastname(e.target.value)}
          />
        </FormControl>
        
        <FormControl fullWidth margin="normal" required>
          <InputLabel htmlFor="contact-number">Contact-Number</InputLabel>
          <Input
            id="contact-number"
            aria-label="Contact-Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </FormControl>
        
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="venue-select-label">Venue</InputLabel>
          <Select
            labelId="venue-select-label"
            id="venue-select"
            value={venueName}
            label="Venue"
            onChange={(e) => setVenueName(e.target.value)}
            className="MuiSelect-select"
          >
            <MenuItem value="The Bloom Pavilion">The Bloom Pavilion</MenuItem>
            <MenuItem value="Spark Space">Spark Space</MenuItem>
            <MenuItem value="The Grand Table">The Grand Table</MenuItem>
          </Select>
        </FormControl>
        
        <Box sx={{ mt: 2, mb: 2 }}>
          <DateReserve onDateChange={handleDateChange} />
        </Box>
        
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
          sx={{ mt: 2 }}
          aria-label="Book Venue"
        >
          Book Venue
        </Button>
      </Box>
    </Container>
  );
}