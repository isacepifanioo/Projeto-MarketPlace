import styled from "styled-components";

export const StyledHeaderProfile = styled.header`

    max-width: 1200px;
    margin: 0 auto;
    padding: .5em;
    border-bottom: 1px solid #333;
    display: flex;
    align-items: center;
    justify-content: space-around;
   
   & svg {
    font-size: 2em;
   }

   & a {
    margin-left: 1em;
    text-decoration: none;
    font-size: 1.2em;
    color: #333;
   }
`