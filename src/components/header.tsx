import React, {createRef} from 'react';
import styled from 'styled-components';
import MaterialIcon from "./material-icon";

const StyledHeaderContainer = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
`;

const StyledHeaderMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const StyledHeaderTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
  flex-grow: 1;
`;

const StyledHeaderSearchContainer = styled.span`
  height: 36px;
  border-radius: 4px;
  background: #545454;
  display: flex;
  padding: 0 8px;
  align-items: center;
  cursor: pointer;
`;

const StyledHeaderSearchInput = styled.input`
  background: transparent;
  outline: none;
  border: 0;
  color: inherit;
  padding: 8px 0;
`;

const StyledMaterialIcon = styled(MaterialIcon)`
  cursor: pointer;
`;

export default function Header({title, onSearchClick, onMenuClick}: Partial<HeaderProps>) {
    const inputRef = createRef<HTMLInputElement>();
    const triggerSearch = () => {
        if (inputRef.current) {
            const query = inputRef.current.value;
            if (query) onSearchClick?.(query);
            inputRef.current.value = '';
        }
    }
    const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case "Enter":
                triggerSearch();
                break;
        }
    }
    return (
        <StyledHeaderContainer>
            <StyledHeaderMenu>
                <StyledMaterialIcon onClick={onMenuClick}>menu</StyledMaterialIcon>
            </StyledHeaderMenu>
            <StyledHeaderTitle>{title}</StyledHeaderTitle>
            <StyledHeaderSearchContainer>
                <StyledHeaderSearchInput type="text" placeholder="Search anime" ref={inputRef} onKeyDown={onKeyPress}/>
                <StyledMaterialIcon onClick={triggerSearch}>search</StyledMaterialIcon>
            </StyledHeaderSearchContainer>
        </StyledHeaderContainer>
    );
}