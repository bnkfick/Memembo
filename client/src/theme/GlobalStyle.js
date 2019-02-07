import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    body {
    /* background-color: rgb(94, 39, 163); */
    background-image: url("https://stmed.net/sites/default/files/violet-wallpapers-25345-2952536.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    color:white;
    margin: 0;
    padding: 0;
    /* font-family: 'Space Mono', monospace; */
    /* font-family: 'Fredericka the Great', cursive; */
    font-family: 'Nunito', sans-serif;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }

    a {
        color:rgb(232, 216, 255);
        text-decoration: none;
    }
    a:hover {
        text-decoration: none;
        color: white;
    }

    i {
    color: rgb(232, 216, 255) !important;
    }
`

export default GlobalStyle;