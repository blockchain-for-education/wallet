import { Box, Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React from "react";
import Container from "../shared/Container";
import Header from "../shared/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(3),
    },
  },
  mnemonic: {
    marginTop: theme.spacing(3),
  },
}));

export default function Mnemonic() {
  const cls = useStyles();
  return (
    <div>
      <Container>
        <Header></Header>
        <Box p={2} className={cls.root}>
          <Typography variant="h4">Mã mnemonic bí mật</Typography>
          <Typography>Mã mnemonic giúp bạn dễ dàng sao lưu vào khôi phục lại các tài khoản trong ví. Hãy lưu trữ mã này một cách an toàn và bảo mật.</Typography>
          <Typography>CẢNH BÁO: Không bao giờ tiết lộ mã này. Bất kì ai có mã này sẽ có quyền sử dụng các tài khoản của bạn.</Typography>
          <TextField className={cls.mnemonic} variant="outlined" multiline rows={5} fullWidth label="Mã mnemonic" defaultValue="ádfád" InputLabelProps={{ shrink: true }}></TextField>
          <Button variant="contained" color="primary" fullWidth>
            ok
          </Button>
        </Box>
      </Container>
    </div>
  );
}