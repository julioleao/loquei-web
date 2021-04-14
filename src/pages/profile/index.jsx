import React from 'react';
import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Cards from '../../components/cards';
import Loader from '../../components/loader';
import { postsByUser } from '../../store/actions/userActions';

const Profile = () => {
  const profile = useSelector((state) => state.profile);
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postsByUser());
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Container fluid='md'>
        <Row className='justify-content-md-center'>
          {profile.map((post, index) => (
            <Cards key={index} card={post} edit={true} />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
