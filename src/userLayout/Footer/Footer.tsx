import { Container, Grid, List, ListItem, ScopedCssBaseline, Typography } from "@mui/material";
// import styles from './Footer.module.scss';


const Footer = () => {
  const footerSections = [
    {
      title: "Staycation.",
      links: [
        { text: "We kaboom your beauty holiday instantly and memorable." },
        { text: "" },
        { text: "" },
      ],
    },
    {
      title: "For Beginners",
      links: [
        { text: "New Account" },
        { text: "Start Booking a Room" },
        { text: "Use Payments" },
      ],
    },
    {
      title: "Explore Us",
      links: [
        { text: "Our Careers" },
        { text: "Privacy" },
        { text: "Terms & Conditions" },
      ],
    },
    {
      title: "Connect Us",
      contactInfo: [
        { text: "support@staycation.id" },
        { text: "021 - 2208 - 1996" },
        { text: "Staycation, Jakarta" },
      ],
    },
  ];


  return (
    <ScopedCssBaseline sx={{ py: 5, backgroundColor: "#fff", marginTop: 'auto' }} >

      <Container component="footer" >
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
          sx={{
            pl: 8,
          }}
        >
   
          {footerSections.map((section, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <Typography
                variant="h5"
                component="p"
                sx={{
                  fontWeight: index === 0 ? "bold" : "normal",
                  color: index === 0 ? "#007BFF" : "text.primary",
                  fontSize: index === 0 ? "2.3rem" : "1.5rem",
                }}
                gutterBottom
              >
                {index === 0 ? (
                  <>
                    <span style={{ color: "#007BFF" }}>Stay</span>
                    <span style={{ color: "black" }}>cation.</span>
                  </>
                ) : (
                  section.title
                )}
              </Typography>
              {section.links && (
                <List>
                  {section.links.map((link, linkIndex) => (
                    <ListItem
                       className={'css-18olizl-MuiListItem-root'}
                      key={linkIndex}
                      sx={{ fontWeight: "bold", color: "text.secondary" }}
                    >
                      {link.text}

                    </ListItem>
                  ))}
                </List>
              )}
              {section.contactInfo && (
                <List>
                  {section.contactInfo.map((info, infoIndex) => (
                    <ListItem
                       className={'css-18olizl-MuiListItem-root'}
                      key={infoIndex}
                      sx={{ fontWeight: "bold", color: "text.secondary" }}
                    >
                      {info.text}
                    </ListItem>
                  ))}
                </List>
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
    </ScopedCssBaseline>
  );
};

export default Footer;
