import styled from "styled-components";

export const BottomBlack = styled.div`

    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #33333367;
    z-index: 1;

`
export const ConteineWhite = styled.div`

    position: absolute;
    width: 40%;
    height: 400px;
    padding: 1em;
    background-color: #fafafa;
    z-index: 1;

    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    border-radius: 5px;
    
`
export const ConteineForm = styled.form`

    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 70%;
    margin: 0 auto;

    & .conteineBoxSubmit {
        width: 100%;
        text-align: end;
    }

    & .inputSubmit {
        width: 25%;
    }
`
export const ConteineBoxInputs = styled.div`

    display: flex;
    flex-direction: column;

`

export const ConteineBox = styled.div`

    display: flex;
    gap: 1em;
    
    & .street {
        width: 70%;
    }
    & .number {
        width: 30%;
    }
`

export const ConteineInput = styled.input`

    font-size: .9em;
    padding: .4em;

`

export const ConteineBoxIforAddress = styled.div`

    width: 100%;
    background-color: #f88888;
    padding: 1em;
    border-radius: 5px;
    margin-top: 1em;

`
export const ConteineBoxIcone = styled.div`

    width: 100%;
    padding: 1em;
    display: flex;
    justify-content: space-around;
    cursor: pointer;
    font-weight: bold;
    

    & p  {
        transition: .3s;
        color: #f88888;
    }
    & p:hover {
        color: #f55454;
        text-decoration: underline;
    }

`