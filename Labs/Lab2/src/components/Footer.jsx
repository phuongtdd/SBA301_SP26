import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
function Footer({avatar, name , email}) {
    return (
        <footer className="bg-light text-center py-3 py-sm-4 mt-auto">
        <Container fluid className="px-2 px-sm-3 px-md-4">
            <Row className="align-items-center g-2 g-sm-3">
                <Col xs={12} sm={3} md={2} lg={2} className="d-flex justify-content-center justify-content-sm-start">
                    <Image src={avatar} alt="Avatar" className="rounded-circle" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                </Col>
                <Col xs={12} sm={6} md={8} lg={8}>
                    <h6 className="mb-1">Author: &copy; {name}</h6>
                    <small className="d-block">All rights reserved 2026.</small>
                </Col>
                <Col xs={12} sm={3} md={2} lg={2} className="d-flex justify-content-center justify-content-sm-end">
                    <a href={`mailto:${email}`} className="text-decoration-none text-break" style={{fontSize: '0.875rem'}}>{email}</a>    
                </Col>
            </Row>
        </Container>
        </footer>
    );
}   
export default Footer;