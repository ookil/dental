import { createGlobalStyle } from 'styled-components';

export const color = {
  bgPrimary: '#FAFBFC',
  bgSecondary: '#ebecf0',
  bluePrimary: '#337AE3',
  blueTetriary: '#BCCEE8',
  greenConfirm: '#63b448',
  pinkCancel: '#e3339d',
  textPrimary: '#333333',
  textSecondary: '#8D8D97',
};

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  maxMobile: '940px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  maxMobile: `(max-width: ${size.maxMobile})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
};

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Montserrat', sans-serif;
    }
`;

export default GlobalStyle;
