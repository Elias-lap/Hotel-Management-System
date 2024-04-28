import React from 'react'

export default function Test() {
  return (
    <div>
        <Container sx={{marginTop:"2rem"}}>

<Grid item xs={6} md={10}>
  <Typography variant="body2" sx={{ }}>
    Welcome to our elegant and comfortable rooms designed to provide you with a
    memorable stay. Each room is thoughtfully furnished to ensure a perfect blend of style and functionality. The spacious interiors are adorned with modern décor,
    creating a welcoming atmosphere for both leisure and business travelers.
  </Typography>
  <Typography variant='body2' sx={{ }}>
    Each room boasts a stunning view and is meticulously designed to create a soothing ambiance. The combination of tasteful furnishings and modern conveniences ensures that your time with us is both enjoyable and rejuvenating.

    Indulge in the ultimate comfort with plush bedding, and unwind in the well-appointed
    sitting area. The en-suite bathroom features a spa-like atmosphere,
    allowing you to pamper yourself after a day of exploration or business meetings.
  </Typography>
  <Typography sx={{ }}>
    Whether you're here for business or leisure, our rooms are your sanctuary away from home. Experience unmatched hospitality and exceptional service throughout your stay.
    Book now to secure your reservation and embark on a delightful journey of relaxation and luxury.
  </Typography>
  {/* <Typography variant="h5" color="secondary" sx={{  color: '#1a237e',my:'2' }}>Key Features:</Typography> */}

  {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
    <MonetizationOnIcon style={{ marginRight: '5px', color: '#7B1FA2' }} />
    <Typography variant="body1">Price: {roomDetails.price}</Typography>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', paddingLeft: '30px' }}>
    <PeopleIcon style={{ marginRight: '5px', color: '#7B1FA2' }} />
    <Typography variant="body1">Capacity: {roomDetails.capacity}</Typography>
  </div>
  <div style={{ marginBottom: '10px', paddingLeft: '30px' }}>
    <Typography variant="h5" sx={{  color: '#1a237e',my:'2' }}>Facilities:</Typography>
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {roomDetails.facilities?.map((facility) => (
        <li key={facility?._id}>
          <EmojiObjectsIcon style={{ marginRight: '5px', color: '#7B1FA2' }} />
          {facility?.name}
        </li>
      ))}
    </ul>
  </div> */}

  

  
</Grid>




</Container>


<Grid item xs={6} md={4} sx={{border:"1px solid #E5E5E5" , padding:"8rem" }}>
                            <Typography variant="h5" color="secondary" sx={{  color: '#1a237e',my:'2' }}>Start Booking</Typography>
                            <Typography variant="body1" sx={{color:"#1ABC9C"}}>
                              
                              </Typography>

<Container

sx={{background: "#F5F6F8" , display:"flex" , justifyContent:"center"}}>

  <CalendarMonthIcon/>
  
{new Date(roomDetails.updatedAt).toLocaleDateString()}
  </Container>
             
            </Grid>
    </div>
  )
}


      {/* <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Ratings roomId={roomId} />
            </Grid>
            <Divider orientation="vertical" flexItem sx={{ textAlign: 'center' }} />
            <Grid item xs={12} lg={5}>
              <Comments roomId={roomId} />
  
            </Grid>
          </Grid>
        </Container>
   */}