import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import './LoveLetter.css'
import './BookCanvas.css'
import './CelebrationWelcome.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Layout from './layout/Layout'
import Home from './pages/Home'
import LoveLetter from './pages/LoveLetter'
import Test from './pages/Test'
import OpeningAnimation from './components/OpeningAnimation'
import WelcomeScreen from './components/WelcomeScreen'
import celebrationSong from './assets/song.mp3'

const App = () => {

  const MyRoute = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path='love-Letter' element={<LoveLetter />}></Route>
        <Route path='test' element={<Test />}></Route>
      </Route>
    </Route>
  ))


  // ------------------Cake loader 
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [animateOut, setAnimateOut] = useState(false); // New state for animation
  const [started, setStarted] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [muted, setMuted] = useState(false);
  const [audioUnavailable, setAudioUnavailable] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!started) return undefined;

    const handlePageLoad = () => {
      const animateOutTimer = setTimeout(() => setAnimateOut(true), 8400);
      const contentTimer = setTimeout(() => setShowContent(true), 8600);
      const loadingTimer = setTimeout(() => setLoading(false), 9000);

      return () => {
        clearTimeout(animateOutTimer);
        clearTimeout(contentTimer);
        clearTimeout(loadingTimer);
      };
    };

    if (document.readyState === "complete") {
      return handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
    }

    return () => window.removeEventListener("load", handlePageLoad);
  }, [started]);

  const startCelebration = () => {
    setStarted(true);

    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(() => setAudioUnavailable(true));
    }

    setTimeout(() => setWelcomeVisible(false), 900);
  };

  const toggleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    if (audioRef.current) audioRef.current.muted = nextMuted;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={celebrationSong}
        loop
        preload="auto"
        muted={muted}
        onError={() => setAudioUnavailable(true)}
        aria-hidden="true"
      />
      {welcomeVisible && <WelcomeScreen isExiting={started} onStart={startCelebration} />}
      {started && !audioUnavailable && (
        <button
          className="celebration-audio-control"
          type="button"
          onClick={toggleMute}
          aria-label={muted ? 'Unmute celebration music' : 'Mute celebration music'}
          title={muted ? 'Unmute music' : 'Mute music'}
        >
          {muted ? '🔇' : '🔊'}
        </button>
      )}
      {
        started && loading && <OpeningAnimation animateOut={animateOut}/>
      }
      {
        started && showContent && <RouterProvider router={MyRoute} />
      }
    </>
  )
}

export default App