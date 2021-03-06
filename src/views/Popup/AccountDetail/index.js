import React, { useState } from "react";
import { Avatar, Box, Button, IconButton, InputAdornment, makeStyles, TextField } from "@material-ui/core";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import { renameAccount, hideAccount, unHideAccount } from "../redux";
import { useDispatch } from "react-redux";
import Jazzicon from "react-jazzicon/lib/Jazzicon";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(3),
      // "&:last-child": {
      //   marginBottom: "0",
      // },
    },
    width: "320px",
    overflow: "auto",
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: theme.spacing(3, "auto"),
  },
}));

export default function AccountDetail(props) {
  const cls = useStyles();
  const { id, avatarSeed, name, publicKey, privateKey, isHide, closeDiaglog } = props;
  const [state, setState] = useState({ accountName: name, showPassword: false });

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dp = useDispatch();
  return (
    <Box className={cls.root} px={2}>
      <Avatar className={cls.avatar}>
        <Jazzicon diameter={100} seed={avatarSeed}></Jazzicon>
      </Avatar>
      <TextField
        variant="outlined"
        label="Tên tài khoản"
        fullWidth
        InputLabelProps={{ shrink: true }}
        value={state.accountName}
        onChange={(e) => setState({ ...state, accountName: e.target.value })}
      ></TextField>
      <TextField variant="outlined" label="Khóa công khai" multiline rows={3} fullWidth InputLabelProps={{ shrink: true }} value={publicKey}></TextField>
      <TextField
        variant="outlined"
        label="Khóa bí mật"
        // multiline
        // rows={4}
        fullWidth
        InputLabelProps={{ shrink: true }}
        InputProps={{
          type: state.showPassword ? "text" : "password",
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                {state.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        value={privateKey}
      ></TextField>

      <Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={(e) => {
            dp(renameAccount({ id: id, name: state.accountName }));
            closeDiaglog();
          }}
        >
          Ok
        </Button>
        <Box mt={1}></Box>
        {!isHide && (
          <Button
            variant="outlined"
            // color="primary"
            fullWidth
            onClick={(e) => {
              dp(hideAccount({ id: id }));
              closeDiaglog();
            }}
          >
            Ẩn tài khoản
          </Button>
        )}
        {isHide && (
          <Button
            variant="outlined"
            // color="primary"
            fullWidth
            onClick={(e) => {
              dp(unHideAccount({ id: id }));
              closeDiaglog();
            }}
          >
            Tắt ẩn tài khoản
          </Button>
        )}
      </Box>
    </Box>
  );
}
