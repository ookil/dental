import React, { useState } from 'react';
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
import loadingGif from '../images/loading.gif';
import { GET_PATIENT_INFO } from '../graphql/queries/patient';
import {
  GetPatientInfo,
  GetPatientInfoVariables,
} from '../graphql/queries/__generated__/GetPatientInfo';
import PatientAppointmentsContent from '../components/patientsList/patient/tabs/PatientAppointmentsContent';
import PatientInfoContent from '../components/patientsList/patient/tabs/PatientInfoContent';
import PatientDiagramContent from '../components/patientsList/patient/tabs/PatientDiagramContent';

const Patient = () => {
  const [currentTab, setCurrentTab] = useState('tab1');

  const { patientId } = useParams<{ patientId: string }>();

  const { data, loading } = useQuery<GetPatientInfo, GetPatientInfoVariables>(
    GET_PATIENT_INFO,
    {
      variables: {
        patientId,
      },
    }
  );

  if (loading) {
    return (
      <GifWrapper>
        <Gif src={loadingGif} />
      </GifWrapper>
    );
  }

  if (data === undefined) return <h1>Error</h1>;

  const patient = data.patient;

  if (patient === null) return <h1>Error</h1>;

  const tabList = [
    {
      tabName: 'tab1',
      label: 'Info',
      content: <PatientInfoContent patient={patient} />,
    },
    {
      tabName: 'tab2',
      label: 'Appointments',
      content: <PatientAppointmentsContent />,
    },
    {
      tabName: 'tab3',
      label: 'Diagram',
      content: <PatientDiagramContent patientId={patientId} />,
    },
    {
      tabName: 'tab5',
      label: 'Chart',
      content: <div>Chart</div>,
    },
    {
      tabName: 'tab4',
      label: 'Files',
      content: <div>Files</div>,
    },
  ];

  return (
    <div style={{ height: '100%' }}>
      <Header>
        <TitlePatient to={`/patient/${patientId}`}>
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
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default Patient;
