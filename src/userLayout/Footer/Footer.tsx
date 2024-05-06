
import {
  Container,
  Grid,
  List,
  ScopedCssBaseline,
  Typography
} from "@mui/material";
import { useTranslation } from "react-i18next";
// import styles from './Footer.module.scss';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const directionStyle=i18n.resolvedLanguage;
    // console.log(direction);
 
  return (
    <ScopedCssBaseline
      sx={{  direction: directionStyle === 'ar' ? 'rtl' : 'ltr', py: 5, backgroundColor: "#fff", marginTop: "auto"  }}
    >
      <Container component="footer">
        <Grid
          container
          spacing={10}
          justifyContent="space-between"
          alignItems="center"
          sx={{
            pl: 1,
          }}
        >
          <Grid sx={{ mb: "40px" }} item xs={12} sm={6} md={3}>
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                fontSize: "1.5rem",
              }}
              gutterBottom
            >
              <>
                <span style={{ color: "#007BFF" }}>Stay</span>
                <span style={{ color: "black" }}>cation</span>
              </>
            </Typography>

            <List sx={{ fontWeight: "bold", color: "text.secondary" }}>
              <h6> {t("main.text")}</h6>
              <h6></h6>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                fontSize: "1.5rem",
              }}
              gutterBottom
            >
              <>
                <h5 style={{ color: "black" }}> {t("main.textT1")}</h5>
              </>
            </Typography>

            <List sx={{ fontWeight: "bold", color: "text.secondary" }}>
            <h6> {t("main.text1")}</h6>
            <h6> {t("main.text2")}</h6>
            <h6> {t("main.text3")}</h6>

            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                fontSize: "1.5rem",
              }}
              gutterBottom
            >
              <>
                <h5 style={{ color: "black" }}> {t("main.textT2")}</h5>
              </>
            </Typography>

            <List sx={{ fontWeight: "bold", color: "text.secondary" }}>
            <h6> {t("main.text4")}</h6>
            <h6> {t("main.text5")}</h6>
            <h6> {t("main.text6")}</h6>

            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                fontSize: "1.5rem",
              }}
              gutterBottom
            >
              <>
                <h5 style={{ color: "black" }}><h6> {t("main.textT3")}</h6></h5>
              </>
            </Typography>

            <List sx={{ fontWeight: "bold", color: "text.secondary" }}>
            <h6> {t("main.text7")}</h6>
            <h6> {t("main.text8")}</h6>
            <h6> {t("main.text9")}</h6>

            </List>
          </Grid>
        </Grid>
      </Container>
    </ScopedCssBaseline>
  );
};

export default Footer;
