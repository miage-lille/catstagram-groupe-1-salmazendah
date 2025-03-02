import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getSelectedPicture, picturesSelector } from '../reducer';
import { closeModal, selectPicture } from '../actions';
import ModalPortal from './modal';
import { fold } from 'fp-ts/Option';
import { Picture } from '../types/picture.type';

const Container = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  margin: 10px;
  object-fit: contain;
  transition: transform 1s;
  max-width: fit-content;
  &:hover {
    transform: scale(1.2);
  }
`;
const Pictures = () => {
  const pictures = useSelector(picturesSelector);
  const pictureSelected = useSelector(getSelectedPicture);
  const dispatch = useDispatch();

  return (
    <Container>
      {pictures.kind === 'LOADING' && <p>Chargement en cours...</p>}
      {pictures.kind === 'FAILURE' && <p>Erreur : {pictures.error}</p>}
      {pictures.kind === 'SUCCESS' &&
        pictures.pictures.map((picture, index) => (
        <Image
          key={index}
          src={picture.previewFormat}
          alt={`Cat ${index}`}
          onClick={() => dispatch(selectPicture(picture))} // Ouvre la modal
        />
      ))}
      {fold(
        () => null, // Si selectedPicture est None, ne rien afficher
        (picture: Picture) => (
          <ModalPortal
            largeFormat={picture.largeFormat}
            close={() => dispatch(closeModal())}
          />
        )
      )(pictureSelected)}
    </Container>
  );
};

export default Pictures;
