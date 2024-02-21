// import svg as a image
import SpotifyLogo from '../../public/images/spotifylogo.svg';
// import svg as a react component
// import SpotifyLogoSvg from '../../public/images/spotifylogo.svg?react'

const clientId = import.meta.env.VITE_REACT_APP_CLIENT_ID;
const redirect_uri = "https://thunderous-dusk-33bf56.netlify.app" || import.meta.env.VITE_REACT_APP_REDIRECT_URI
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirect_uri}/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-playback-position`;

const SignIn = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            height: "50vh"
        }}>
            <p>Sign in to Spotify to use it on this website.</p>
            <img src={SpotifyLogo} width="800px" alt="spotify-logo"/>
            <a className="btn btn-primary" href={AUTH_URL}>Sign in with Spotify</a>
        </div>
    )
}

export default SignIn;