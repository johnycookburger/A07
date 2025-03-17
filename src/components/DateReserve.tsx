'use client'

import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';

export default function DateReserve({ onDateChange }: { onDateChange?: (date: Date | null) => void }) {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date ? date.toDate() : null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
        label="Booking Date"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}