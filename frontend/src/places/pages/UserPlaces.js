import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const UserPlaces =  () => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const userId = useParams().userId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const reponseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setLoadedPlaces(reponseData.places);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchPlaces();
  }, [sendRequest, userId]);
  const deletePlaceHandler = (deletedPlaceId) => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId))
  }
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      {error && <ErrorModal error={error} onClear ={clearError}/>}
      <PlaceList items={loadedPlaces} onDelete = {deletePlaceHandler} />
    </React.Fragment>
  );
};

export default UserPlaces;
