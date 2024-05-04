import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import { alpha } from "@mui/material/styles";
import { Box, Divider, Typography, Stack, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// auth
import { useAuthContext } from "../../../auth/useAuthContext";
// components
import { CustomAvatar } from "../../../components/custom-avatar";
import { useSnackbar } from "../../../components/snackbar";
import MenuPopover from "../../../components/menu-popover";
import { IconButtonAnimate } from "../../../components/animate";
import ConfirmDialog from "../../../components/confirm-dialog";

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: "Home",
    linkTo: "/",
  },
  {
    label: "Profile",
    linkTo: "/",
  },
  {
    label: "Settings",
    linkTo: "/",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();

  const { user, logout, isLoggingOut } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      logout(user.email);
      setLoggingOut(false);
    } catch (error) {
      console.error(error);
      setLoggingOut(false);
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };

  const handleClickItem = (path) => {
    handleClosePopover();
    navigate(path);
  };

  useEffect(() => {
    if (!loggingOut) {
      setOpenConfirm(false);
    }
  }, [loggingOut]);

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <CustomAvatar
          src={user?.photoURL}
          alt={user?.displayName}
          name={user?.displayName}
        />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.displayName}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleClickItem(option.linkTo)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={() => setOpenConfirm(true)} sx={{ m: 1 }}>
          {loggingOut ? "Logging out" : "Logout"}
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        title="Delete"
        content={
          <>
            Are you sure want to <strong> Logout </strong>?
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={isLoggingOut}
            disabled={isLoggingOut}
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </LoadingButton>
        }
      />
    </>
  );
}
