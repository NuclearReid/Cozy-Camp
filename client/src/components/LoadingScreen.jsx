import { useProgress, Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from 'react-bootstrap';
// import './custom.css'; // Import your custom CSS

export default function LoadingScreen() {
    const { progress } = useProgress();
    const [loadingProgress, setLoadingProgress] = useState(0);

    useEffect(() => {
        setLoadingProgress(progress);
    }, [progress]);

    return (
        <Html center>
            <div className="fullscreen-bg"/>
            <Container className="centered-content">
                <Row>
                    <Col>
                        <Spinner animation="border" role="status" className="mb-3">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <h3>Loading, please wait...</h3>
                        <p>{loadingProgress} % loaded</p>
                    </Col>
                </Row>
            </Container>
        </Html>
    );
}
