import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateInput({label , defaultDate , setDate}) {
  const [value, setValue] = React.useState(defaultDate ?? null);

  const disableWeekends = (date) => {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        disablePast={true}
        shouldDisableDate={disableWeekends}
        label={label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setDate(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
