import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import React from 'react';
import { useParams } from 'react-router-dom';
import { GET_PATIENT_APPOINTMENTS } from '../../../../graphql/queries/patient';
import {
  GetPatientAppointments,
  GetPatientAppointmentsVariables,
} from '../../../../graphql/queries/__generated__/GetPatientAppointments';

const PatientAppointmentsContent = () => {
  const { patientId } = useParams<{ patientId: string }>();

  const { data, loading } = useQuery<
    GetPatientAppointments,
    GetPatientAppointmentsVariables
  >(GET_PATIENT_APPOINTMENTS, {
    variables: {
      patientId: patientId,
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
              <p>{format(appointment.startAt, 'dd mm yyy, hh:mm')}</p>
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
