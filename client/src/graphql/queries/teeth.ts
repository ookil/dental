import { gql } from '@apollo/client';

const SURFACE_FILL_FRAGMENT = gql`
  fragment surfaceFillFragment on SurfaceFill {
    action {
      id
      name
      fillColor
      icon {
        id
        alt
      }
    }
  }
`;

export const GET_PATIENT_TEETH = gql`
  query GetPatientTeeth($patientId: ID!) {
    patientTeeth(patientId: $patientId) {
      id
      position
      primary
      quadrant
      toothNumber
      crown {
        buccal {
          ...surfaceFillFragment
        }
        distal {
          ...surfaceFillFragment
        }
        lingual {
          ...surfaceFillFragment
        }
        mesial {
          ...surfaceFillFragment
        }
        occlusial {
          ...surfaceFillFragment
        }
      }
      root {
        rootOne {
          ...surfaceFillFragment
        }
        rootTwo {
          ...surfaceFillFragment
        }
        rootThree {
          ...surfaceFillFragment
        }
      }
    }
  }
  ${SURFACE_FILL_FRAGMENT}
`;
