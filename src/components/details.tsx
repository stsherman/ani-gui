import React from "react";
import styled from "styled-components";
import MaterialIcon from "./material-icon";
import {Params, useParams} from "react-router-dom";
import {toDetailsState} from "../mappers/details";
import usePromise from "../hooks/use-promise";
import useShowLoader from "../hooks/use-show-loader";

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

export default function Details() {
    let {id}: Readonly<Params<"id">> = useParams();
    const details = usePromise(() => window.api.getDetails(id).then(toDetailsState));
    useShowLoader(details, () => ({ title: details?.title }));

    return (
        <>
            {details && <StyledDetailsContainer>
                <StyledRow>
                    <StyledDetailsImage src={details.imageSrc} />
                    <StyledInfoColumn>
                        <StyledRow>
                            <StyledPill id="status">{details.status}</StyledPill>
                            <StyledPill id="type">{details.type}</StyledPill>
                            <StyledSpacer />
                            <StyledCenteredMaterialIcon style={{color: details.isFavorite ? '#ffd500' : '#FFFFFF'}}>
                                star
                            </StyledCenteredMaterialIcon>
                        </StyledRow>
                        <p id="description">{details.description}</p>
                        <StyledWrappingRow id="genres">
                            {details.genres.map((g: string, index: number) => (
                                <StyledGenrePill key={index}>{g}</StyledGenrePill>
                            ))}
                        </StyledWrappingRow>
                    </StyledInfoColumn>
                </StyledRow>
                <StyledRow>
                    <label>Episodes:</label>
                    <span>{JSON.stringify(details.episodes)}</span>
                </StyledRow>
            </StyledDetailsContainer>}
        </>
    );
}