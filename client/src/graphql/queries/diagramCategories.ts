import gql from 'graphql-tag';

const FRAGMENT_ACTION_DETAILS = gql`
  fragment actionCategoryFragment on ActionCategory {
    actions {
      id
      name
      type
      fillColor
      crownAction
      rootAction
      icon {
        id
        alt
      }
    }
  }
`;

export const DIAGRAM_CATEGORIES = gql`
  query GetDiagramCategories($clinicId: ID!) {
    diagramCategories(clinicId: $clinicId) {
      diagnostic {
        id
        name
        ...actionCategoryFragment
      }
      procedures {
        id
        name
        ...actionCategoryFragment
      }
    }
  }
  ${FRAGMENT_ACTION_DETAILS}
`;
