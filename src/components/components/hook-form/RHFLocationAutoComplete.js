import React, { useCallback, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
const mapsApi = 'AIzaSyCUgm7mFnQFhDht4qvxP3h-ImEIVr1kCzo';

// load google map api js

function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    Object.assign(script, {
      type: 'text/javascript',
      async: true,
      src,
    });
    script.addEventListener('load', () => resolve(script));
    document.head.appendChild(script);
  });
}

RHFLocationAutoComplete.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
  type: PropTypes.string,
  city: PropTypes.string,
};

export default function RHFLocationAutoComplete({
  name,
  helperText,
  type = 'text',
  city,
  ...other
}) {
  const searchInput = useRef(null);
  const { control, setValue } = useFormContext();

  // init gMap script
  const initMapScript = () => {
    // if script already loaded
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${mapsApi}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    setValue(name, place.name); // Update form field value
  };

  // init autocomplete
  const initAutocomplete = useCallback(() => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current, {
      componentRestrictions: { country: [] },
      types: ['geocode'],
    });
    if (city) {
      autocomplete.setComponentRestrictions({ country: [], locality: city });
    }
    autocomplete.addListener('place_changed', () => onChangeAddress(autocomplete));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
  }, [initAutocomplete]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          type={type}
          fullWidth
          inputRef={searchInput}
          value={field.value || ''}
          placeholder="Search location...."
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}
