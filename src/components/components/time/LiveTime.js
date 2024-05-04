import { useEffect, useState } from 'react';

import { Card, Typography } from '@mui/material';
import { fDateTimeSeconds } from '../../utils/formatTime';

export default function CurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card sx={{ padding: 2 }}>
      <Typography sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
        {fDateTimeSeconds(time)}
      </Typography>
    </Card>
  );
}
