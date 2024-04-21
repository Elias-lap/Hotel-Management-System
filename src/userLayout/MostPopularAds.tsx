
import { Box, Grid } from "@mui/material";
import defaultImage from '../Img/defaultImage.jpg'
interface MostPopularAdsProps {
  ADSList: ADS[];
}

interface ADS {
  _id: string;
  room: {
    price: number;
    roomNumber: string;
    capacity: number;
    discount: number;
    images: string[]
  };
}

const MostPopularAds: React.FC<MostPopularAdsProps> = ({ ADSList }) => {
    console.log(ADSList)
  return (
    <Grid container spacing={5} sx={{ mt: 20, height: "100vh" }}>
     {ADSList.map(ad => (
        <Grid item lg={3} key={ad._id}>
          <Box>
          <img
          style={{
            width: '100%', // Example width
            height:'470px'
          }}
          src={ad?.room?.images[0] ? ad?.room?.images[0] : defaultImage}
          alt="RoomPicture"
        />
          
            
              
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default MostPopularAds;
