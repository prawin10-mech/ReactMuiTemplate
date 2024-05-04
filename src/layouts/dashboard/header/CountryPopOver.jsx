import { useState } from "react";
import { MenuItem, Stack } from "@mui/material";
import Image from "../../../components/image";
import MenuPopover from "../../../components/menu-popover";
import { IconButtonAnimate } from "../../../components/animate";
import { countries } from "../../../utils/CountriesData";
import { useDispatch } from "../../../redux/store";
import { setCity } from "../../../redux/slices/notification";

export default function CountryPopover() {
  const [openPopover, setOpenPopover] = useState(null);
  const [country, setCountry] = useState(countries[0]);
  const dispatch = useDispatch();

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  // const handleSubMenuClick = (city) => {
  //   setSelectedCity(city);
  //   handleClosePopover();
  // };

  const handleCountryClick = (c) => {
    setCountry(c);
    dispatch(setCity(c.country));
    setOpenPopover(null);

    // setOpenSubMenu(true);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          width: 40,
          height: 40,
          ...(openPopover && {
            bgcolor: "action.selected",
          }),
        }}
      >
        <Image disabledEffect src={country.icon} alt={country.symbol} />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 230 }}
      >
        <Stack spacing={0.75}>
          {countries.map((option) => (
            <MenuItem
              key={option.symbol}
              onClick={() => handleCountryClick(option)}
            >
              <Image
                disabledEffect
                alt={option.symbol}
                src={option.icon}
                sx={{ width: 28, mr: 2 }}
              />
              {option.country}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>

      {/* <Popper
        open={openSubMenu && Boolean(openPopover)}
        anchorEl={openPopover}
        placement="right-start"
      >
        <Paper>
          <MenuList>
            <Stack spacing={1} paddingY={2} ml={1}>
              {country.cities.map((city) => (
                <MenuItem
                  key={city}
                  onClick={() => handleSubMenuClick(city)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'white',
                    },
                  }}
                >
                  {city}
                </MenuItem>
              ))}
            </Stack>
          </MenuList>
        </Paper>
      </Popper> */}
    </>
  );
}
