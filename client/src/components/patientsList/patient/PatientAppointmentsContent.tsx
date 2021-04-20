import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { GET_PATIENT_APPOINTMENTS } from '../../../graphql/queries/patient';
import {
  GetPatientAppointments,
  GetPatientAppointmentsVariables,
} from '../../../graphql/queries/__generated__/GetPatientAppointments';

const PatientAppointmentsContent = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useQuery<
    GetPatientAppointments,
    GetPatientAppointmentsVariables
  >(GET_PATIENT_APPOINTMENTS, {
    variables: {
      patientId: id,
    },
  });

  if (loading || data === undefined) {
    return <h1>Error</h1>;
  }

  const appointments = data.patient?.appointments || [];

  return (
    <div>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <div>
              <p>{appointment.status}</p>
              <p>{appointment.dentist.name}</p>

              <p>{appointment.treatment}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientAppointmentsContent;
