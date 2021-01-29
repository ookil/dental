import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
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
  },
});
