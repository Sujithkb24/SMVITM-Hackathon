// App.js
import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  useScrollTrigger
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SpeedIcon from '@mui/icons-material/Speed';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SecurityIcon from '@mui/icons-material/Security';
import Spline from '@splinetool/react-spline';

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d946ef', // Purple/magenta accent color
    },
    secondary: {
      main: '#8b5cf6',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
  },
});

function AdminHomepage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(darkTheme.breakpoints.down('md'));
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = ['Home', 'Company', 'Features', 'About'];

  // Navbar component
  const Navbar = () => (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1300, // ensure AppBar sits above content
        backgroundColor: trigger ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
        backdropFilter: trigger ? 'blur(10px)' : 'none',
        boxShadow: trigger ? 3 : 0,
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 700,
            letterSpacing: '0.05em',
            background: 'linear-gradient(45deg, #d946ef 30%, #8b5cf6 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Karmic Canteen
        </Typography>

        {isMobile ? (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', gap: 3 }}>
            {menuItems.map((item) => (
              <Button
                key={item}
                color="inherit"
                sx={{
                  textTransform: 'capitalize',
                  fontSize: '1rem',
                  '&:hover': { color: '#d946ef' },
                }}
              >
                {item}
              </Button>
            ))}
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#d946ef',
                textTransform: 'capitalize',
                borderRadius: '8px',
                px: 3,
                '&:hover': { backgroundColor: '#c026d3' },
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );

  // Sidebar Drawer
  const SideDrawer = () => (
    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          width: 250,
          backgroundColor: '#1a1a1a',
          height: '100%',
          pt: 2,
        }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
          <ListItem>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#d946ef',
                '&:hover': { backgroundColor: '#c026d3' },
              }}
            >
              Sign Up
            </Button>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );

  // Hero Section (Tailwind-based, responsive: text left, spline right)
  const HeroSection = () => (
    <section
      className="pt-[64px] md:pt-0 bg-[radial-gradient(circle_at_20%_50%,rgba(217,70,239,0.08)_0%,transparent_50%)]"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-12 min-h-[calc(100vh-64px)]">
          {/* left: text (always left on md+, centered on xs) */}
          <div className="w-full md:w-1/2 text-center md:text-left md:pr-8 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Let's Explore Three-Dimensional visual
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6">
              With virtual technology you can see the digital world feel more real and you can play the game with a new style.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-3 rounded-md font-medium transition">
                Get It Now
              </button>
              <button className="border border-white/30 hover:border-pink-500 text-white px-6 py-3 rounded-md font-medium transition bg-transparent">
                Explore Device
              </button>
            </div>

            <div className="flex items-center gap-4 mt-6 justify-center md:justify-start">
              <div className="flex -ml-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-pink-600 -ml-2 border-2 border-black"
                  />
                ))}
              </div>
              <span className="text-gray-400">400k people online</span>
            </div>
          </div>

          {/* right: spline on md+, decorative box on small */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            {/* desktop spline (renders only on md+) */}
            <div className="hidden md:block w-full max-w-[920px] h-[640px] rounded-lg overflow-hidden self-center">
              <Spline
                scene="https://prod.spline.design/lFMyrwAVYZ0QCMpR/scene.splinecode"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* mobile fallback decorative box */}
            <div className="md:hidden w-full h-[320px] rounded-lg overflow-hidden border-2 border-purple-600/30 bg-gradient-to-b from-purple-900/10 to-black p-4 flex items-end">
              <div className="w-full bg-purple-700/30 rounded-t-lg p-4 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Cinematic Virtual Reality</h3>
                <div className="w-3/4 h-[2px] bg-white/20 mx-auto mb-2" />
                <p className="text-sm text-gray-300">
                  Let's be the best for more real and effective results and ready to explore and learn the content we have prepared for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // About Section
  const AboutSection = () => (
    <Box sx={{ py: 10, backgroundColor: '#0a0a0a' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: '100%',
                height: { xs: '300px', md: '400px' },
                borderRadius: '12px',
                overflow: 'hidden',
                border: '2px solid rgba(139, 92, 246, 0.3)',
                background: 'linear-gradient(135deg, rgba(217, 70, 239, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                VR Experience Image
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
              New Experience In Playing Game
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                mb: 4,
                lineHeight: 1.8,
              }}
            >
              You can try playing the game with a new style and of course a more real feel, like you are the main character in your game and can feel a more real experience in the new digital world.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#d946ef',
                textTransform: 'capitalize',
                px: 4,
                py: 1.5,
                borderRadius: '8px',
                '&:hover': { backgroundColor: '#c026d3' },
              }}
            >
              Get It Now
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  // Features Section
  const FeaturesSection = () => {
    const features = [
      {
        icon: <RestaurantMenuIcon sx={{ fontSize: 40 }} />,
        title: 'Diverse Menu',
        description: 'Explore a wide variety of cuisines and dishes tailored to your taste and dietary preferences.',
      },
      {
        icon: <SpeedIcon sx={{ fontSize: 40 }} />,
        title: 'Quick Service',
        description: 'Fast ordering and delivery system ensuring you get your meals when you need them.',
      },
      {
        icon: <LocalOfferIcon sx={{ fontSize: 40 }} />,
        title: 'Best Prices',
        description: 'Affordable pricing with exclusive deals and offers for students and staff members.',
      },
      {
        icon: <SecurityIcon sx={{ fontSize: 40 }} />,
        title: 'Secure Payment',
        description: 'Multiple secure payment options including digital wallets and cards for convenient transactions.',
      },
    ];

    return (
      <Box sx={{ py: 10, backgroundColor: '#0f0f0f' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Features
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Everything you need for a perfect dining experience
            </Typography>
          </Box>

          {/* single horizontal row on md+; stacked on xs/sm */}
          <Grid
            container
            spacing={4}
            sx={{
              flexWrap: { xs: 'wrap', md: 'nowrap' },
              alignItems: 'stretch',
            }}
          >
            {features.map((feature, index) => (
              <Grid
                item
                key={index}
                sx={{
                  display: 'flex',
                  // 100% on xs, 50% on sm, 25% on md+ to force single row
                  width: { xs: '100%', sm: '50%', md: '25%' },
                  maxWidth: { xs: '100%', sm: '50%', md: '25%' },
                }}
              >
                <Card
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: 220,
                    backgroundColor: '#1a1a1a',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: '#d946ef',
                      boxShadow: '0 8px 24px rgba(217, 70, 239, 0.3)',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4, flexGrow: 1 }}>
                    <Box sx={{ color: '#d946ef', mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  };

  // Footer
  const Footer = () => (
    <Box
      sx={{
        py: 6,
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #d946ef 30%, #8b5cf6 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Karmic Canteen
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Your ultimate destination for delicious meals and seamless ordering experience.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['About Us', 'Careers', 'Contact'].map((item) => (
                <Typography
                  key={item}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    cursor: 'pointer',
                    '&:hover': { color: '#d946ef' },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Help Center', 'Safety', 'Terms'].map((item) => (
                <Typography
                  key={item}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    cursor: 'pointer',
                    '&:hover': { color: '#d946ef' },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Newsletter
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 2 }}>
              Subscribe to get special offers and updates.
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#d946ef',
                '&:hover': { backgroundColor: '#c026d3' },
              }}
            >
              Subscribe
            </Button>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 6,
            pt: 4,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
          }}
        >
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            © 2025 Karmic Canteen. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
        <Navbar />
        <Toolbar /> {/* spacer to offset fixed AppBar */}
        <SideDrawer />
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default AdminHomepage;
