import { InMemoryCache, makeVar, ReactiveVar } from '@apollo/client';
import { GetAppointmentsList_appointmentsList } from './graphql/queries/__generated__/GetAppointmentsList';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clinicAppointments: {
          //keyArgs: ['clinicId'],
          merge(_, incoming) {
            return incoming;
          },
        },
        appointmentsList: {
          read(existing) {
            if (existing) {
              const dateMap = existing
                .slice()
                .map((appointment: GetAppointmentsList_appointmentsList) => {
                  return {
                    ...appointment,
                    startAt: new Date(appointment.startAt),
                    endAt: new Date(appointment.endAt),
                  };
                });
              return dateMap;
            }
            return existing;
          },
        },
        getScrollPatients: {
          keyArgs: ['clinicId'],
          merge(existing, incoming, { args }) {
            if (existing === undefined) {
              //for initial messages
              return incoming;
            }

            if (
              args &&
              args.patientsVar.firstLetter !== '' &&
              args.patientsVar.after
            ) {
              return Object.assign({}, incoming, {
                patients: [...existing.patients, ...incoming.patients],
              });
            } else if (
              (args && args.patientsVar.firstLetter !== '') ||
              args?.patientsVar.firstLetter === null
            ) {
              return Object.assign({}, incoming);
            } else {
              return Object.assign({}, incoming, {
                patients: [...existing.patients, ...incoming.patients],
              });
            }
          },
        },
      },
    },
    Dentist: {
      fields: {
        nameWithSurname: {
          read: (_, { readField }) => {
            const name = readField('name');
            const surname = readField('surname');

            return `${name} ${surname}`;
          },
        },
      },
    },
    Patient: {
      fields: {
        nameWithSurname: {
          read: (_, { readField }) => {
            const name = readField('name');
            const surname = readField('surname');

            return `${name} ${surname}`;
          },
        },
      },
    },
    // servers returns info about appointment type as a date string, which creates some probles witch schedulers since it always expects to receive Date
    // so after the appointment was fetched Apollo Client will handle creating Date object, that will be available across app
    Appointment: {
      fields: {
        startAt: {
          read: (startAt: string) => {
            return new Date(startAt);
          },
        },
        endAt: {
          read: (endAt: string) => {
            return new Date(endAt);
          },
        },
      },
    },
  },
});

export const clinicIdVar: ReactiveVar<string> = makeVar<string>('');
