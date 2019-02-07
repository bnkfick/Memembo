import { createGlobalStyle } from 'styled-components'
import { Container } from 'reactstrap';


const GlassContainer = createGlobalStyle`
    Container {
        margin: 2rem auto;
        width: 100%;
        height: auto;
        border: 1px solid white;
        border-radius: 5px;
        padding: 1rem 1rem 0 1rem;
        background-color: rgba(19, 18, 18, 0.671);
        backdrop-filter: blur(5px);   
        -webkit-backdrop-filter: blur(5px); 
    }
    
`

export default GlassContainer;