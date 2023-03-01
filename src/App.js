import styled from 'styled-components';
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import Web3Provider from './components/Web3Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/style/theme';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback, useEffect } from 'react';
import posthog from 'posthog-js'

function App() {
    const particlesInit = useCallback(async engine => {
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
    }, []);
    useEffect(() => {
        posthog.init(process.env.REACT_APP_POSTHOG_PUBLIC_KEY, { api_host: 'https://app.posthog.com' })
        posthog.capture('enter site', { property: 'value' })
        // eslint-disable-next-line
    }, [])

    return (
        <Main>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#2d2d71",
                        },
                        links: {
                            color: "#2d2d71",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            directions: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 3,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 10,
                        },
                        opacity: {
                            value: 1,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 7 },
                        },
                    },
                    detectRetina: true,
                }}
            />
            <Web3Provider>
                <ThemeProvider theme={theme}>
                    <Header />
                    <BodyWrapper>
                        <Body />
                    </BodyWrapper>
                    <ToastContainer position="top-center" />
                </ThemeProvider>
            </Web3Provider>
            <Footer />
        </Main>
    );
}

const Main = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  // background: linear-gradient(280deg, rgba(255, 164, 63, 0.45) , rgba(255, 164, 63, 0.1) 70.71%),
  //           linear-gradient(355deg, rgba(113, 95, 255, 0.6), rgba(113, 95, 255, 0.1) 70.71%),
  //           linear-gradient(120deg, rgba(255, 164, 63, 1) , rgba(255, 164, 63, 0.1) 100.71%);
`


const BodyWrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

export default App;
