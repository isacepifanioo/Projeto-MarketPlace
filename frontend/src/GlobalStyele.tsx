import styled, { createGlobalStyle } from 'styled-components'


export const GlobalStyled = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
        /* font-family: "Open Sans", serif; */
    }

    html {
        scroll-behavior: smooth;
        background-color: #fafafa;
    }
`

export const StyledInnerGlobal = styled.main`

    max-width: 1200px;
    margin: 1em auto;
    padding: 1em;

`
// 