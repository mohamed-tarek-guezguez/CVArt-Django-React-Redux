import styled from 'styled-components'

export const Form = styled.form`
margin: 15px;
position: relative;
display: flex;
align-items: center;
justify-content: center;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
background-color: #F5F6FB;
width: ${props => (props.barOpened ? "60%" : "1rem")};
cursor: ${props => (props.barOpened ? "auto" : "pointer")};
padding: 1rem;
height: 1rem;
border-radius: 10rem;
transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

margin-top: -12px;

@media screen and (max-width: 768px) {
    width: ${props => (props.barOpened ? "60%" : "1rem")};
}

@media screen and (max-width: 480px) {
    width: ${props => (props.barOpened ? "80%" : "1rem")};
}
`;

export const Input = styled.input`
font-size: 14px;
line-height: 1;
background-color: transparent;
width: 100%;
margin-left: ${props => (props.barOpened ? "1rem" : "0rem")};
border: none;
color: #010606;
transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

&:focus,
&:active {
    outline: none;
}
&::placeholder {
    color: #d0d0d0;
}
`;

export const Button = styled.button`
line-height: 1;
pointer-events: ${props => (props.barOpened ? "auto" : "none")};
cursor: ${props => (props.barOpened ? "pointer" : "none")};
background-color: transparent;
border: none;
outline: none;
color: #010606;
`;