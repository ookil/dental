import { createGlobalStyle, css } from 'styled-components';

export const color = {
  bgPrimary: '#FAFBFC',
  bgSecondary: '#ebecf0',
  bluePrimary: '#337AE3',
  blueSecondary: '#7EBFFB',
  blueTetriary: '#BCCEE8',
  blueLight: '#d6e7ff',
  greenConfirm: '#63b448',
  lightGreen: '#86e986',
  yellowUnknow: '#F0EA56',
  yellowDark: '#c9c504',
  pinkCancel: '#e3339d',
  textPrimary: '#333333',
  textSecondary: '#8D8D97',
};

export const size = {
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

export const StyledScrollbar = css`
  scrollbar-color: transparent transparent;
  scrollbar-width: thin;
`;

export const WebkitScrollbar = css``;

export const WebkitScrollbarTrack = css`
  background: transparent;
  border-radius: 10px;
`;

export const WebkitScrollbarThumb = css`
  border-radius: 10px;
  background-color: #202225;
`;

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Montserrat', sans-serif;
        scrollbar-color: ${color.textSecondary} transparent;
        scrollbar-width: thin;

        &::-webkit-scrollbar {
          width: 3px;
          height: 5px;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: #8db5f2;
        }
    }

    html { 
      height: 100%;
      width: 100%;
    }

    body {
      min-height: 100%;      
    }

`;

export default GlobalStyle;
