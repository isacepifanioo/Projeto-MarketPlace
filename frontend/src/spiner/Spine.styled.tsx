import styled , { keyframes } from "styled-components";

const spineAnimation = keyframes`

    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`

export const StyledSpiner = styled.div`

    width: 30px;
    height: 30px;
    margin: 0 auto;
    border: 4px solid black;
    border-bottom-color: transparent;
    border-radius: 50%;
    
    animation-name: ${spineAnimation};
    animation-duration: .8s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;

` 
