import PropTypes from 'prop-types';

import { Card } from '@mui/material';
//
import Image from '../../image';

// ----------------------------------------------------------------------

SingleImagePreview.propTypes = {
  imageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default function SingleImagePreview({ imageUrl }) {
  if (!imageUrl) {
    return null;
  }

  return (
    <Card sx={{ p: 1.5 }}>
      <Image sx={{ borderRadius: 1.5 }} alt="file preview" src={imageUrl} ratio="21/9" />
    </Card>
  );
}
