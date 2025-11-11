import styled from "styled-components";
import theme from "../theme";
import NavBar from "../components/NavBar.jsx";

const Container = styled.div`
    padding: 2rem;
    text-align: center;
`;

const Title = styled.h1`
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
`;
const Subtitle = styled.h2`
    color: ${theme.colors.secondary};
    margin-bottom: 2rem;
`;

export default function Home() {
    return(
        <>
        <NavBar />
        <Container> 
            <Title>Welcome to the Home Page</Title>
            <Subtitle>This is the main landing page of the application.</Subtitle>
            <a href="/users">Go to Users Home</a>
        </Container>
        </>
    );
}