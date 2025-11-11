import {useState} from 'react';
import styled from 'styled-components';
import theme from '../theme';
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: ${theme.colors.background};
`;
const FormContainer = styled.div`
    background-color: ${theme.colors.white};
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
`;
const Title = styled.h2`
    margin-bottom: 1.5rem;
    color: ${theme.colors.primary};
`;
const ToggleText = styled.p`
    margin-top: 1.5rem;
    color: ${theme.colors.secondary};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;
export default function SignLayout({mode, children}) {
    const [isLoginMode, setIsLoginMode] = useState(mode === 'login');  
    return (
        <Container>
            <FormContainer>
                <Title>{isLoginMode ? 'Welcome Back!' : 'Create an Account'}</Title>
                {children}
                <ToggleText onClick={() => setIsLoginMode(!isLoginMode)}>
                    {isLoginMode ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                </ToggleText>
            </FormContainer>
        </Container>
    );
}