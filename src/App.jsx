
import React, { useEffect, useRef, useState } from 'react';

import './App.css';
import './LoveLetter.css';
import './BookCanvas.css';
import './CelebrationWelcome.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router';

import Layout from './layout/Layout';
import Home from './pages/Home';
import LoveLetter from './pages/LoveLetter';
import Test from './pages/Test';

import OpeningAnimation from './components/OpeningAnimation';
import WelcomeScreen from './components/WelcomeScreen';

import celebrationSong from './assets/song.mp3';

// Create router outside App so it isn't recreated on every render
const MyRoute = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="love-letter" element={<LoveLetter />} />
      <Route path="test" element={<Test />} />
    </Route>
  )
);

const App = () => {

  // Restore celebration state after refreshing
  const [started, setStarted] = useState(
    () => sessionStorage.getItem('celebrationStarted') === 'true'
  );

  const [loading, setLoading] = useState(
    () => sessionStorage.getItem('celebrationStarted') !== 'true'
  );

  const [showContent, setShowContent] = useState(
    () => sessionStorage.getItem('celebrationStarted') === 'true'
  );

  const [animateOut, setAnimateOut] = useState(
    () => sessionStorage.getItem('celebrationStarted') === 'true'
  );

  const [welcomeVisible, setWelcomeVisible] = useState(
    () => sessionStorage.getItem('celebrationStarted') !== 'true'
  );

  const [muted, setMuted] = useState(false);
  const [audioUnavailable, setAudioUnavailable] = useState(false);

  const audioRef = useRef(null);

  // Cake loading animation
  useEffect(() => {
    if (!started || !loading) return;

    const animateOutTimer = setTimeout(
      () => setAnimateOut(true), 8400
    );

    const contentTimer = setTimeout(
      () => setShowContent(true), 8600
    );

    const loadingTimer = setTimeout(
      () => setLoading(false), 9000
    );

    return () => {
      clearTimeout(animateOutTimer);
      clearTimeout(contentTimer);
      clearTimeout(loadingTimer);
    };

  }, [started, loading]);

  // Start celebration
  const startCelebration = () => {

    sessionStorage.setItem('celebrationStarted', 'true');

    setStarted(true);

    const audio = audioRef.current;

    if (audio) {
      audio.play().catch(() => setAudioUnavailable(true));
    }

    setTimeout(() => {
      setWelcomeVisible(false);
    }, 900);
  };

  // Music mute/unmute
  const toggleMute = () => {

    const nextMuted = !muted;

    setMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
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

      {welcomeVisible && (
        <WelcomeScreen
          isExiting={started}
          onStart={startCelebration}
        />
      )}

      {started && !audioUnavailable && (
        <button
          className="celebration-audio-control"
          type="button"
          onClick={toggleMute}
          aria-label={
            muted ? 'Unmute celebration music' : 'Mute celebration music'
          }
          title={muted ? 'Unmute music' : 'Mute music'}
        >
          {muted ? '🔇' : '🔊'}
        </button>
      )}

      {started && loading && (
        <OpeningAnimation animateOut={animateOut} />
      )}

      {started && showContent && (
        <RouterProvider router={MyRoute} />
      )}
    </>
  );
};

export default App;
