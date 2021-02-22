import { useQuery } from '@apollo/client';
import React from 'react';
import { clinicIdVar } from '../cache';
import { AppointmentsScheduler } from '../components';
import { Gif, GifWrapper } from '../components/elements/Elements';
import { DENTIST_GROUPING } from '../graphql/queries/dentist';
import {
  GetDentistsGrouping,
  GetDentistsGroupingVariables,
} from '../graphql/queries/__generated__/GetDentistsGrouping';
import loadingGif from './../images/loading.gif';

const Calendar: React.FC = () => {
  const clinicId = clinicIdVar();

  const { data: dentistsGrouping, loading } = useQuery<
    GetDentistsGrouping,
    GetDentistsGroupingVariables
  >(DENTIST_GROUPING, { variables: { clinicId } });

  if (loading)
    return (
      <GifWrapper>
        <Gif src={loadingGif} />;
      </GifWrapper>
    );

  const dentists = dentistsGrouping?.clinicDentists || [];

  return <AppointmentsScheduler dentists={dentists} />;
};

export default Calendar;
