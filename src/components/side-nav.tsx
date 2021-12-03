import React from "react";
import styled, {css} from "styled-components";
import useAppContext from "../hooks/use-app-context";

const StyledSideNavContainer = styled.div`
  position: absolute;
  transition: left 300ms ease-in-out;
  top: 0;
  bottom: 0;
  display: flex;
  left: -100vw;

  ${({isOpen}: SideNavContainerProps) => isOpen && css`
    right: 0;
    left: 0;
  `}
`;

const StyledSideNavContent = styled.div`
  background: #343434;
  width: 200px;
  box-shadow: 0 0 2px 1px #323232;
`;

const StyledSideNavBackground = styled.div`
  transition: opacity 300ms ease-in-out;
  flex-grow: 1;
  background: #262626;
  opacity: 0;
  
  ${({isOpen}: SideNavContainerProps) => isOpen && css`
    opacity: 0.75;
  `}
`;

const StyledSideNavLi = styled.li`
  cursor: pointer;
`;

export default function SideNav({isOpen, onItemClick}: SideNavProps) {
    const [appState, setAppState] = useAppContext();

    const closeSideNav = () => {
        setAppState({ ...appState, isSideNavOpen: false });
    };

    return (
        <StyledSideNavContainer isOpen={isOpen} >
            <StyledSideNavContent>
                <ul>
                    <StyledSideNavLi onClick={() => onItemClick('favorites')}>
                        Favorites
                    </StyledSideNavLi>
                    <StyledSideNavLi onClick={() => onItemClick('history')}>
                        History
                    </StyledSideNavLi>
                </ul>
            </StyledSideNavContent>
            <StyledSideNavBackground onClick={closeSideNav} isOpen={isOpen} />
        </StyledSideNavContainer>
    );
}