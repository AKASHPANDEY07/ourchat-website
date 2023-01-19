import React, { useEffect } from 'react';

import './style.scss';

const TextToSpeech = (props) => {
  const { user, loader } = props;

  useEffect(() => {
    const synth = window.speechSynthesis;
    let utterance = new SpeechSynthesisUtterance(
      `Welcome ${user} to ourchat App.`
    );
    let speaktimeout = setTimeout(() => {
      const voicesArray = window.speechSynthesis.getVoices();

      let voiceIndex = -1;
      voicesArray.some((value, index) => {
        if (value.lang === 'en-IN') {
          voiceIndex = index;
          return true;
        }
        return false;
      });

      if (voiceIndex >= 0) {
        utterance.voice = voicesArray[voiceIndex];
      }

      synth.speak(utterance);
      utterance.rate = 0.7;
    }, 1000);

    if (!loader) window.speechSynthesis.cancel();

    return () => {
      clearTimeout(speaktimeout);
    };
  }, []);
};

export default TextToSpeech;
