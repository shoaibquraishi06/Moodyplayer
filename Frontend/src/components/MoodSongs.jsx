import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import './MoodSongs.css'

const MoodSongs = ({ Songs = [] }) => {
  if (!Array.isArray(Songs) || Songs.length === 0) {
    return (
      <div className="mood-songs">
        <h1>Recommended songs</h1>
        <p>No songs available yet. Click "Detect Mood" to get recommendations.</p>
      </div>
    )
  }

  // Track which index is currently playing (null = none)
  const [playingIndex, setPlayingIndex] = useState(null)
  const audioRefs = useRef([])

  useEffect(() => {
    // cleanup on unmount: pause any playing audio
    return () => {
      audioRefs.current.forEach((a) => {
        try { if (a && !a.paused) a.pause() } catch (e) {}
      })
    }
  }, [])

  const togglePlay = (index) => {
    const current = audioRefs.current[index]
    if (!current) return

    if (playingIndex === index) {
      // pause
      current.pause()
      setPlayingIndex(null)
    } else {
      // pause previous
      if (playingIndex !== null) {
        const prev = audioRefs.current[playingIndex]
        if (prev && !prev.paused) prev.pause()
      }
      // play current
      current.play().then(() => {
        setPlayingIndex(index)
      }).catch((err) => {
        // play may fail (autoplay policy), handle silently
        console.warn('play failed', err)
      })
    }
  }

  const onEnded = (index) => {
    if (playingIndex === index) setPlayingIndex(null)
  }

  return (
    <div className="mood-songs">
      <h1>Recommended songs</h1>

      

      {Songs.map((song, index) => (
      

        <div key={song.id ?? index} className="song-item">
          {/* <h4>{song._expression}</h4> */}
          <div className="title">
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>
          <div className="play-pause-button">
            <audio
              ref={(el) => (audioRefs.current[index] = el)}
              src={song.audio}
              onEnded={() => onEnded(index)}
              preload="none"
              
            />

            <button
              type="button"
              className="play-toggle"
              onClick={() => togglePlay(index)}
            >
              {playingIndex === index ? 'Pause' : 'Play'}
            </button>

            {/* optional small indicator */}
            {playingIndex === index && <span className="playing-indicator"></span>}
          </div>
        </div>
      ))}
    </div>
  )
}

MoodSongs.propTypes = {
  Songs: PropTypes.array,
}

export default MoodSongs
