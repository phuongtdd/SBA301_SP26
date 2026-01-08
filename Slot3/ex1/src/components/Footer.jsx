import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
function Footer({avatar, name , email}) {
    return (
        <footer className="bg-light text-center py-4 mt-auto">
        <Container fluid>
            <Row className="align-items-center">
                <Col xs={2}>
                    <Image src={avatar} alt="Avatar" className="rounded-circle" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                </Col>
                <Col xs={8}>
                    <h5>Author: &copy; {name}</h5>
                    <small>All rights reserved 2026.</small>
                </Col>
                <Col xs={2}>
                    <a href={`mailto:${email}`}>{email}</a>    
                </Col>
            </Row>
        </Container>
        </footer>
    );
}   
export default Footer;