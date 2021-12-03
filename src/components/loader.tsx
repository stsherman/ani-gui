import ReactLoading from 'react-loading';
import React from "react";
import styled from "styled-components";

const StyledLoaderContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #3A3A3A;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Loader({ isShown, ...props}: Partial<LoaderProps>) {
    const defaultType: LoadingType = 'cylon';
    const defaultColor = '#fff';
    return (
        <>
            {isShown && <StyledLoaderContainer>
                <ReactLoading
                    type={defaultType}
                    color={defaultColor}
                    height={150}
                    width={150}
                    delay={100}
                    {...props}
                />
            </StyledLoaderContainer>}
        </>
    );
}