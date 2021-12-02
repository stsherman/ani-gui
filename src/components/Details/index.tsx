import React, {useEffect, useState} from "react";
import styled from "styled-components";
import MaterialIcon from "../MaterialIcon";
import {Params, useParams} from "react-router-dom";

const StyledDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInfoColumn = styled(StyledColumn)`
  padding-left: 16px;
`;

const StyledDetailsImage = styled.img`
  width: 350px;
  height: 460px;
  object-fit: cover;
`;

const StyledPill = styled.span`
  box-shadow: -2px 2px 2px 0 #282828;
  background: #0342bb;
  padding: 4px 16px;
  border-radius: 20px;
  margin-right: 8px;
  cursor: pointer;
  white-space: nowrap;
`;

const StyledGenrePill = styled(StyledPill)`
  margin-bottom: 8px;
`;

const StyledSpacer = styled.span`
  flex-grow: 1;
`;

const StyledCenteredMaterialIcon = styled(MaterialIcon)`
  display: flex;
  align-items: center;
`;

const StyledWrappingRow = styled(StyledRow)`
  flex-wrap: wrap;
`;

export default function Details(props: Partial<DetailsProps>) {
    let {id}: Readonly<Params<"id">> = useParams();

    const [
        {image, type, isFavorite, summary, status, genre, episodes},
        setDetails
    ] = useState(props || {});

    async function getDetails() {
        if (id) {
            const f = await window.api.getDetails(id);
            console.log('f', f);
            setDetails(f);
        }
    }

    useEffect(() => {
        if (!props) {
            console.log('getting details');
            getDetails();
        }
    }, []);

    return (
        <StyledDetailsContainer>
            <StyledRow>
                <StyledDetailsImage src={image} />
                <StyledInfoColumn>
                    <StyledRow>
                        <StyledPill id="status">{status}</StyledPill>
                        <StyledPill id="type">{type}</StyledPill>
                        <StyledSpacer />
                        <StyledCenteredMaterialIcon style={{color: isFavorite ? '#ffd500' : '#FFFFFF'}}>
                            star
                        </StyledCenteredMaterialIcon>
                    </StyledRow>
                    <p id="description">{summary}</p>
                    <StyledWrappingRow id="genres">
                        {(genre || '').split(',').map((g: string) => (
                            <StyledGenrePill>{g}</StyledGenrePill>
                        ))}
                    </StyledWrappingRow>
                </StyledInfoColumn>
            </StyledRow>
            <StyledRow>
                <label>Episodes:</label>
                <span>{JSON.stringify(episodes)}</span>
            </StyledRow>
        </StyledDetailsContainer>
    );
}