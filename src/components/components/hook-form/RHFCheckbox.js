import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Grid,
  Checkbox,
  FormLabel,
  FormGroup,
  FormControl,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';

// ----------------------------------------------------------------------

RHFCheckbox.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};

export function RHFCheckbox({ name, helperText, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControlLabel control={<Checkbox {...field} checked={field.value} />} {...other} />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  );
}

// ----------------------------------------------------------------------

RHFMultiCheckbox.propTypes = {
  row: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  spacing: PropTypes.number,
  helperText: PropTypes.node,
};

export function RHFMultiCheckbox({ row, name, label, options, spacing, helperText, ...other }) {
  const { control } = useFormContext();

  const getSelected = (selectedItems, item) => {
    // Ensure selectedItems is always an array
    const currentItems = selectedItems || [];
    return currentItems.includes(item)
      ? currentItems.filter((value) => value !== item)
      : [...currentItems, item];
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          {label && (
            <FormLabel component="legend" sx={{ typography: 'body2' }}>
              {label}
            </FormLabel>
          )}

          <FormGroup
            sx={{
              ...(row && {
                flexDirection: 'row',
              }),
              '& .MuiFormControlLabel-root': {
                '&:not(:last-of-type)': {
                  mb: spacing || 0,
                },
                ...(row && {
                  mr: 0,
                  '&:not(:last-of-type)': {
                    mr: spacing || 2,
                  },
                }),
              },
            }}
          >
            <Grid container spacing={2}>
              {options.map((option) => (
                <Grid item xs={4} key={option.value}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field?.value?.includes(option.value)}
                        onChange={() => field.onChange(getSelected(field.value, option.value))}
                      />
                    }
                    label={option.label}
                    {...other}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
