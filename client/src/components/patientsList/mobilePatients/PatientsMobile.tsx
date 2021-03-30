import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { clinicIdVar } from '../../../cache';
import { GET_SCROLL_PATIENTS } from '../../../graphql/queries/patient';
import {
  GetScrollPatients,
  GetScrollPatientsVariables,
} from '../../../graphql/queries/__generated__/GetScrollPatients';
import AlphabetList from './AlphabetList';
import { AddPatientButton, Letter, NoDataText, ResetButton } from './elements';
import PatientsList from './PatientsList';

const Container = styled.div`
  position: relative;
  height: calc(100% - 55px);

  @media (min-width: 426px) {
    display: none;
  }
`;

const pageSize = 20;

const PatientsMobile = () => {
  const clinicId = clinicIdVar();

  const [searchLetter, setLetter] = useState<string | null>('');

  const { data, loading, fetchMore, refetch } = useQuery<
    GetScrollPatients,
    GetScrollPatientsVariables
  >(GET_SCROLL_PATIENTS, {
    variables: {
      patientsVar: {
        clinicId,
        pageSize,
      },
    },
  });

  const patients = data?.getScrollPatients.patients || [];

  const handleScroll = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const {
      currentTarget: { clientHeight, scrollTop, scrollHeight },
    } = e;

    if (
      data?.getScrollPatients.hasMore &&
      clientHeight + scrollTop >= scrollHeight
    ) {
      console.log('scroll');

      fetchMore({
        variables: {
          patientsVar: {
            clinicId,
            pageSize,
            after: data?.getScrollPatients.cursor,
            firstLetter: searchLetter,
          },
        },
      });
    }
  };

  const handleRefetch = (letter: string | null) => {
    setLetter(letter);
    refetch({
      patientsVar: {
        clinicId,
        pageSize,
        firstLetter: letter,
      },
    });
  };


  return (
    <Container>
      {loading === false && patients.length === 0 ? (
        <>
          {searchLetter && <Letter>{searchLetter.toUpperCase()}</Letter>}
          <NoDataText>No patients found</NoDataText>
        </>
      ) : (
        <PatientsList
          loading={loading}
          patients={patients}
          handleScroll={handleScroll}
        />
      )}

      <AlphabetList handleRefetch={handleRefetch} />
      {searchLetter && <ResetButton handleClick={() => handleRefetch(null)} />}
      <AddPatientButton />
    </Container>
  );
};

export default PatientsMobile;
