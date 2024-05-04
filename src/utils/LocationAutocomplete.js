import React, { useCallback, useEffect, useRef } from 'react';
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

function LOcationAutocomplete() {
  const searchInput = useRef(null);

  // init gmap script
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
    console.log(place?.address_components[0]?.long_name);
  };

  // init autocomplete
  const initAutocomplete = useCallback(() => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
    autocomplete.setFields(['address_component', 'geometry']);
    autocomplete.addListener('place_changed', () => onChangeAddress(autocomplete));
  }, []);

  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
  }, [initAutocomplete]);

  return <TextField inputRef={searchInput} label="Search location...." variant="outlined" />;
}

export default LOcationAutocomplete;
