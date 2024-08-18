import type { NextPage } from 'next';
import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';

const Home: NextPage = () => {
  return (
    <Container maxWidth="xl">
      <Stack direction={'row'}>
        <Box height={500} width={1300} display="flex" alignItems="center">
          <img
            src="/img/pexels-printexstar.webp"
            width="100%"
            height="100%"
            style={{ objectFit: 'cover' }}
            alt="pexels-printexstar"
          />
        </Box>
      </Stack>

      <Stack direction={'row'} justifyContent={'center'}>
        <Paper
          elevation={5}
          square={false}
          sx={{
            width: '97%',
            marginTop: '-65px',
            height: 500,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'saturate(200%) blur(30px)',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Grid
            width={'80%'}
            container
            marginTop={'30px'}
            spacing={3}
            justifyContent={'center'}
            marginX={'auto'}
            textAlign={'center'}
          >
            <Grid xs={4}>
              <Typography
                variant="h3"
                component="h3"
                gutterBottom
                color={'rgb(26, 115, 232)'}
              >
                70+
              </Typography>
              <Typography gutterBottom variant="h5" component="h5">
                Coded Elements
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                color={'rgb(123, 128, 154)'}
              >
                From buttons, to inputs, navbars, alerts or cards, you are
                covered
              </Typography>
            </Grid>

            <Grid paddingX={'5px'} xs={4}>
              <Typography
                variant="h3"
                component="h3"
                gutterBottom
                color={'rgb(26, 115, 232)'}
              >
                15+
              </Typography>
              <Typography gutterBottom variant="h5" component="h5">
                Design Blocks
              </Typography>
              <Typography
                color={'rgb(123, 128, 154)'}
                variant="body2"
                gutterBottom
              >
                Mix the sections, change the colors and unleash your creativity
              </Typography>
            </Grid>

            <Grid xs={4}>
              <Typography
                variant="h3"
                component="h3"
                gutterBottom
                color={'rgb(26, 115, 232)'}
              >
                4
              </Typography>
              <Typography gutterBottom variant="h5" component="h5">
                Pages
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                color={'rgb(123, 128, 154)'}
              >
                Save 3-4 weeks of work when you use our pre-made pages for your
                website
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Stack>
    </Container>
  );
};

export default Home;
