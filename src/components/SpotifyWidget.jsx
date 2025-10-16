import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpotifyAuth from './SpotifyAuth';

function SpotifyWidget() {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    const handleAuthSuccess = (token) => {
        setAccessToken(token);
        setError(null);
    };

    useEffect(() => {
        if (!accessToken) return;

        const fetchCurrentTrack = async () => {
            try {
                const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (response.data) {
                    setCurrentTrack(response.data.item);
                    setIsPlaying(response.data.is_playing);
                    setError(null);
                } else {
                    setCurrentTrack(null);
                    setIsPlaying(false);
                }
            } catch (err) {
                console.error('Error fetching current track:', err);
                if (err.response?.status === 401) {
                    setError('Authentication expired. Please reconnect Spotify.');
                    setAccessToken(null);
                    localStorage.removeItem('spotify_access_token');
                } else {
                    setError('Unable to fetch current track. Make sure Spotify is playing.');
                }
            }
        };

        fetchCurrentTrack();
        const interval = setInterval(fetchCurrentTrack, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, [accessToken]);

    return (
        <div className="s-about__spotify">
            <h4 style={{ marginBottom: 'var(--vspace-0_5)', color: 'var(--color-text-dark)' }}>
                Currently Playing
            </h4>
            <SpotifyAuth onAuthSuccess={handleAuthSuccess} />
            {error ? (
                <div style={{
                    padding: 'var(--vspace-1)',
                    backgroundColor: 'var(--color-error)',
                    borderRadius: 'var(--border-radius)',
                    color: 'var(--color-error-content)'
                }}>
                    {error}
                </div>
            ) : currentTrack ? (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 'var(--vspace-0_5)',
                    backgroundColor: 'var(--color-gray-3)',
                    borderRadius: 'var(--border-radius)'
                }}>
                    <img
                        src={currentTrack.album.images[0]?.url}
                        alt={currentTrack.album.name}
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: 'var(--border-radius)',
                            marginRight: 'var(--vspace-0_5)'
                        }}
                    />
                    <div>
                        <div style={{
                            fontWeight: '600',
                            color: 'var(--color-text-dark)',
                            marginBottom: '2px'
                        }}>
                            {currentTrack.name}
                        </div>
                        <div style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--color-text-light)'
                        }}>
                            {currentTrack.artists.map(artist => artist.name).join(', ')}
                        </div>
                        <div style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-text-light)',
                            marginTop: '2px'
                        }}>
                            {isPlaying ? '▶ Playing' : '⏸ Paused'}
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{
                    padding: 'var(--vspace-1)',
                    backgroundColor: 'var(--color-gray-3)',
                    borderRadius: 'var(--border-radius)',
                    textAlign: 'center',
                    color: 'var(--color-text-light)'
                }}>
                    No track currently playing
                </div>
            )}

            {/* Original playlist embed */}
            <div style={{ marginTop: 'var(--vspace-1)' }}>
                <iframe
                    title="Spotify Embed: Recommendation Playlist"
                    src="https://open.spotify.com/embed/playlist/31YBEwYKaNM1p6uP3u1PKr?utm_source=generator&theme=0"
                    width="100%"
                    height="100%"
                    style={{ minHeight: '360px' }}
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                />
            </div>
        </div>
    );
}

export default SpotifyWidget;
