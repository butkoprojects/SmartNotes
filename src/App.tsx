import * as React from "react"
import {
  ChakraProvider,
  Grid,
  GridItem, Box, Divider, VStack, Link, Code, Text
} from "@chakra-ui/react"
import { NotesTabs } from "./scenes/NotesTabs";
import {SideBar} from "./scenes/SideBar";
import {ColorModeSwitcher} from "./components/ColorModeSwitcher";
import {Logo} from "./Logo";
import { Header } from "./scenes/Header";
import { NavigationBar } from "./scenes/NavigationBar";
import theme from "./theme";
import { NoteJob } from "./components/NoteJob";
import { QueryClient, QueryClientProvider } from 'react-query'
import { HealthClient } from "./api/HealthClient";
import { useEffect } from "react";
import { Footer } from "./scenes/Footer";

const queryClient = new QueryClient()
const healthClient = new HealthClient()

export const App = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("check server")
        const response = await healthClient.getStatus();
        
        if (response.status === 200) {
          console.log("server is up"); 
          setIsLoaded(true);
        } else {
          // If response status is not 200, wait for 2 seconds and try again
          setTimeout(() => {
            fetchData();
          }, 2000);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setTimeout(() => {
          fetchData();
        }, 2000);
      }
    };

    fetchData(); // Initial data fetch
  }, []);

    return <div>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
            {
              isLoaded
                ? <ServerUp />
                : <ServerDown />
            }
        </ChakraProvider>
      </QueryClientProvider>
    </div>
}

const ServerUp = () => {
  return <Box
    h='100vh'
    maxH='100vh'
    display="flex"
    flexFlow="column"
    bg="white"
  >
    <Header/>
    <Box 
      display="flex"
      flexFlow="row"
      width="100%"
      height='91vh'
    >
      <NavigationBar/>
      <SideBar/>
      <NotesTabs/>
    </Box>
    <Footer />
  </Box>
}

const ServerDown = () => {
  return <Box textAlign="center" fontSize="xl">
    <Grid minH="100vh" p={3}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <VStack spacing={8}>
        <Logo h="40vmin" pointerEvents="none" />
        <Text>
          Loading ...
        </Text>
      </VStack>
    </Grid>
  </Box>
}