import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { Gif, GifWrapper } from '../components/elements/Elements';
import {
  Header,
  TitlePatient,
  BookmarkButton,
  ButtonsWrapper,
  Separator,
  TabWrapper,
} from '../components/patientsList/Patients.elements';
import { GET_FULL_PATIENT } from '../graphql/queries/patient';
import {
  GetFullPatient,
  GetFullPatientVariables,
} from '../graphql/queries/__generated__/GetFullPatient';
import completedGif from '../images/completed.gif';
import React, { useState } from 'react';
import PatientInfoContent from '../components/patientsList/patient/PatientInfoContent';

const Patient = () => {
  const [currentTab, setCurrentTab] = useState('tab1');

  const { id } = useParams<{ id: string }>();

  const { data, loading } = useQuery<GetFullPatient, GetFullPatientVariables>(
    GET_FULL_PATIENT,
    {
      variables: {
        patientId: id,
      },
    }
  );

  if (loading) {
    return (
      <GifWrapper>
        <Gif src={completedGif} />
      </GifWrapper>
    );
  }

  if (data === undefined) return <h1>Error</h1>;

  const patient = data.patient;

  const tabList = [
    {
      tabName: 'tab1',
      label: 'Info',
      content: <PatientInfoContent patient={patient} />,
    },
    {
      tabName: 'tab2',
      label: 'Treatment',
      content: <div>Treatment</div>,
    },
    {
      tabName: 'tab3',
      label: 'Files',
      content: <div>Files</div>,
    },
  ];

  return (
    <div>
      <Header>
        <TitlePatient to={`/patient/${id}`}>
          {patient?.name + ' ' + patient?.surname}
        </TitlePatient>
        <Separator />
        <ButtonsWrapper>
          {tabList.map((tab) => (
            <BookmarkButton
              onClick={() => setCurrentTab(tab.tabName)}
              isActive={tab.tabName === currentTab}
              key={tab.tabName}
            >
              {tab.label}
            </BookmarkButton>
          ))}
        </ButtonsWrapper>
      </Header>

      {tabList.map((tab) => {
        if (tab.tabName === currentTab) {
          return <TabWrapper key={tab.tabName}>{tab.content}</TabWrapper>;
        }
      })}
    </div>
  );
};

export default Patient;
