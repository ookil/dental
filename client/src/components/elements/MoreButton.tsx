import styled from 'styled-components';

const Wrapper = styled.div`
  cursor: pointer;
`;

const MoreButton = () => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    alert('more info')
  };

  return (
    <Wrapper onClick={handleClick}>
      <svg
        width='28'
        height='6'
        viewBox='0 0 28 6'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <ellipse cx='3.18702' cy='3' rx='3.18702' ry='3' fill='#8D8D97' />
        <ellipse cx='13.8104' cy='3' rx='3.18702' ry='3' fill='#8D8D97' />
        <ellipse cx='24.4338' cy='3' rx='3.18702' ry='3' fill='#8D8D97' />
      </svg>
    </Wrapper>
  );
};

export default MoreButton;
