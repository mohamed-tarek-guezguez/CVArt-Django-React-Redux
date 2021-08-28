import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const FormWrap = styled.div`
    border-radius: 12px;
    background: #fff;
    margin: auto;
    padding-top: 35px;
    padding-bottom: 35px;
    width: 60%;
    height: 80vh;

    @media screen and (max-width: 1024px) {
        width: 90%;
    }

    @media screen and (max-width: 768px) {
        height: 100%;
        width: 90%;
    }
`

export const Form = styled.form`
    margin: auto auto;
    width: 100%;
`

export const Row = styled.div`
    display: grid;
    grid-auto-columns: minmax(auto, 1fr);
    align-items: center;
    grid-template-areas: 'col1 col2';
    height: 100%;

    @media screen and (max-width: 768px) {
        grid-template-areas: 'col2' 'col1';
    }
`

export const Column1 = styled.div`
    padding: 0 15px;
    grid-area: col1;
    height: 100%;
    display: flex;
    justify-content: center;
`

export const Column2 = styled.div`
    padding: 0 15px;
    grid-area: col2;
    height: 100%;

    padding-left: 20px;

    @media screen and (max-width: 768px) {
        margin-left: 0;
    }

    @media screen and (max-width: 480px) {
        margin-left: 0;
    }
`

export const Image = styled.img`
    width: 100%;
    height: 100%;

    @media screen and (max-width: 480px) {
        margin-bottom: 25px;
    }
`

export const Title = styled.h1`
    margin-bottom: 12px;
    font-size: 22px;
    line-height: 1.1;
    font-weight: 600;
    color: '#010606';

    @media screen and (max-width: 480px) {
        display: none;
    }
`

export const SubTitle = styled.p`
    max-width: 440px;
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 24px;
    color: #d0d0d0;
`

export const Input = styled.input`
    width: 100%;
    padding: 11px 13px;
    background: #fff;
    color: #010606;
    margin-bottom: 25px;
    outline: 0;
    border: 1px solid rgba(221, 221, 221, 0.5);
    font-size: 14px;
    transition: all 0.3s ease-out;

    :focus, :hover {
        border: 1px solid rgba(1, 191, 113, 0.3);
    }
`;

export const FormButton = styled.button`
    margin-top: 6px;
    background: #01bf71;
    padding: 15px 25px;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    font-weight: bold;
    display: block;
    margin-bottom: 15px;

    transform: translate(0%);
    transition: 0.3s ease-out;

    &:hover {
        transform: translate(0%, -10%);
        transition: 0.3s ease-out;
    }

    @media screen and (max-width: 480px) {
        padding: 12px 25px;
        margin-top: 0;
    }
`

export const SignUpLbl = styled.label`
    font-size: 14px;
    color: #d0d0d0;
`

export const SignUpLink = styled(Link)`
    font-size: 14px;
    margin-left: 6px;
    text-decoration: none !important;
    color: #010606 !important;
`