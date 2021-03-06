import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemIcon,
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import { Add } from "@material-ui/icons";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createAccount, importAccount, lockWallet, toggleHidingAccountsVisible, turnOnDevmode } from "../redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "#f1f2f6",
    position: "relative",
    textAlign: "center",
  },
  leftBtn: {
    position: "absolute",
    left: "0.25rem",
    top: "50%",
    transform: "translateY(-50%)",
  },
  rightBtn: {
    position: "absolute",
    right: "0",
    top: "50%",
    transform: "translateY(-50%)",
  },
  overideMinWidth: {
    minWidth: "40px",
  },
}));

function AskPrivateKeyDialog(props) {
  const [privateKey, setPrivateKey] = useState("");
  const error = privateKey !== "" && !Boolean(privateKey.match(/[0-9A-Fa-f]{64}/g));

  return (
    <Dialog open={props.openDialog} onClose={props.hdCloseDialog}>
      <DialogTitle>Import tài khoản bằng Private Key</DialogTitle>
      <DialogContent>
        <TextField
          label="Nhập private key"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          error={error}
          helperText="Private key gồm 64 kí tự hex"
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.hdCancel}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            if (!error) {
              props.hdOk(privateKey);
            }
          }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function CustomHeader() {
  const cls = useStyles();
  const hiddingAccountMode = useSelector((state) => state.showHidingAccount);

  const [state, setState] = useState({
    anchorEl: null,
    redirect: null,
    openDialog: false,
  });
  const dp = useDispatch();

  function hdLockWallet() {
    dp(lockWallet());
    window.close();
  }

  function hdShowMenu(e) {
    setState({ ...state, anchorEl: e.currentTarget });
  }

  function hdCloseMenu() {
    setState({ ...state, anchorEl: null });
  }

  function hdAddAccount() {
    dp(createAccount());
    setState({ ...state, anchorEl: null });
  }

  function hdShowMnemonic() {
    setState({ ...state, redirect: <Redirect to="/mnemonic"></Redirect> });
  }

  function hdImportAccount() {
    setState({ ...state, openDialog: true });
  }

  function hdCloseDialog(e) {
    e.stopPropagation();
    setState({ anchorEl: null, openDialog: false });
  }

  function hdOk(privateKey) {
    dp(importAccount(privateKey));
    setState({ anchorEl: null, openDialog: false });
  }

  function hdToggleVisibel() {
    dp(toggleHidingAccountsVisible());
    setState({ anchorEl: null, openDialog: false });
  }

  function hdTurnOnDevMode() {
    dp(turnOnDevmode());
    setState({ anchorEl: null, openDialog: false });
  }

  return (
    <div className={cls.root}>
      {state.redirect}
      <Tooltip title="Khóa ví" enterDelay={500}>
        <IconButton onClick={hdLockWallet} className={cls.leftBtn}>
          <LockOutlinedIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Typography className={cls.title} variant="h5">
        B4E Wallet
      </Typography>
      <Tooltip title="Mở rộng" enterDelay={500}>
        <IconButton onClick={hdShowMenu} className={cls.rightBtn}>
          <MoreVertIcon fontSize="large"></MoreVertIcon>
        </IconButton>
      </Tooltip>
      <Paper>
        <Menu
          open={Boolean(state.anchorEl)}
          anchorEl={state.anchorEl}
          keepMounted
          onClose={hdCloseMenu}
          TransitionComponent={Fade}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={hdAddAccount}>
            <ListItemIcon classes={{ root: cls.overideMinWidth }}>
              <Add />
            </ListItemIcon>
            <Typography variant="inherit">Tạo thêm tài khoản</Typography>
          </MenuItem>
          <MenuItem onClick={hdImportAccount}>
            <ListItemIcon classes={{ root: cls.overideMinWidth }}>
              <VerticalAlignBottomIcon></VerticalAlignBottomIcon>
            </ListItemIcon>
            <Typography variant="inherit">Import tài khoản</Typography>
          </MenuItem>
          <MenuItem onClick={hdShowMnemonic}>
            <ListItemIcon classes={{ root: cls.overideMinWidth }}>
              <VpnKeyIcon />
            </ListItemIcon>
            <Typography variant="inherit">Xem mã Mnemonic</Typography>
          </MenuItem>
          {hiddingAccountMode ? (
            <MenuItem onClick={hdToggleVisibel}>
              <ListItemIcon classes={{ root: cls.overideMinWidth }}>
                <VisibilityOffIcon />
              </ListItemIcon>
              <Typography variant="inherit">Tắt tài khoản đã ẩn</Typography>
            </MenuItem>
          ) : (
            <MenuItem onClick={hdToggleVisibel}>
              <ListItemIcon classes={{ root: cls.overideMinWidth }}>
                <VisibilityIcon />
              </ListItemIcon>
              <Typography variant="inherit">Hiển thị tài khoản đã ẩn</Typography>
            </MenuItem>
          )}
          {/* TODO: remove dev mode */}
          <MenuItem onClick={hdTurnOnDevMode}>
            <ListItemIcon classes={{ root: cls.overideMinWidth }}>
              <VpnKeyIcon />
            </ListItemIcon>
            <Typography variant="inherit">Bật DevMode</Typography>
          </MenuItem>
        </Menu>
      </Paper>
      <AskPrivateKeyDialog
        openDialog={state.openDialog}
        hdCloseDialog={hdCloseDialog}
        hdCancel={hdCloseDialog}
        hdOk={hdOk}
      ></AskPrivateKeyDialog>
    </div>
  );
}
