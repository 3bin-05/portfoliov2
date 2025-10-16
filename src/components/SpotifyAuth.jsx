import React, { useState, useEffect } from 'react';

const SpotifyAuth = ({ onAuthSuccess }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        // Check if we have tokens in URL hash (after redirect)
        const hash = window.location.hash;
        if (hash) {
            const params = new URLSearchParams(hash.substring(1));
            const token = params.get('access_token');
            if (token) {
                setAccessToken(token);
                setIsAuthenticated(true);
                localStorage.setItem('spotify_access_token', token);
                onAuthSuccess(token);
                // Clean up URL
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        } else {
            // Check localStorage for existing token
            const storedToken = localStorage.getItem('spotify_access_token');
            if (storedToken) {
                setAccessToken(storedToken);
                setIsAuthenticated(true);
                onAuthSuccess(storedToken);
            }
        }
    }, [onAuthSuccess]);

    const handleLogin = () => {
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
        const scope = 'user-read-currently-playing user-read-playback-state';

        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

        window.location.href = authUrl;
    };

    const handleLogout = () => {
        localStorage.removeItem('spotify_access_token');
        setAccessToken(null);
        setIsAuthenticated(false);
    };

    if (!isAuthenticated) {
        return (
            <div style={{
                padding: 'var(--vspace-1)',
                backgroundColor: 'var(--color-gray-3)',
                borderRadius: 'var(--border-radius)',
                textAlign: 'center'
            }}>
                <p style={{ marginBottom: 'var(--vspace-0_5)', color: 'var(--color-text-light)' }}>
                    Connect your Spotify account to show your currently playing track
                </p>
                <button
                    onClick={handleLogin}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#1DB954',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--border-radius)',
                        cursor: 'pointer',
                        fontSize: 'var(--text-sm)'
                    }}
                >
                    Connect Spotify
                </button>
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--vspace-0_5)',
            backgroundColor: 'var(--color-gray-3)',
            borderRadius: 'var(--border-radius)',
            marginBottom: 'var(--vspace-0_5)'
        }}>
            <span style={{ color: 'var(--color-text-light)', fontSize: 'var(--text-sm)' }}>
                ✓ Spotify Connected
            </span>
            <button
                onClick={handleLogout}
                style={{
                    padding: '4px 8px',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text-light)',
                    border: '1px solid var(--color-text-light)',
                    borderRadius: 'var(--border-radius)',
                    cursor: 'pointer',
                    fontSize: 'var(--text-xs)'
                }}
            >
                Disconnect
            </button>
        </div>
    );
};

export default SpotifyAuth;
