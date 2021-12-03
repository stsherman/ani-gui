import React, {useEffect} from "react";
import styled from "styled-components";
import MaterialIcon from "./material-icon";
import {Params, useParams} from "react-router-dom";
import useAppContext from "../hooks/use-app-context";
import useDetailsContext from "../hooks/use-details-context";

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
    const [appState, setAppState] = useAppContext();
    let {id}: Readonly<Params<"id">> = useParams();

    const [details, setDetails] = useDetailsContext();

    useEffect(() => {
        if (id) {
            console.log('getting details');
            setAppState({
                ...appState,
                isLoaderShowing: true
            });
            window.api.getDetails(id).then(getDetailsResponse => {
                setDetails({
                    description: getDetailsResponse.description,
                    episodes: getDetailsResponse.episodes,
                    genres: getDetailsResponse.genre.split(","),
                    imageSrc: getDetailsResponse.image,
                    isFavorite: getDetailsResponse.isFavorite,
                    status: getDetailsResponse.status,
                    title: getDetailsResponse.title,
                    type: getDetailsResponse.type,
                });
                setAppState({
                    ...appState,
                    title: getDetailsResponse.title,
                    isLoaderShowing: false
                });
            });
        }
        // eslint-disable-next-line
    }, [id]);

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