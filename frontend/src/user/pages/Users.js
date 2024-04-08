import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

// let USERS = [];
const Users = () => {
  const [loadedData, setLoadedData] = useState([]);
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest("http://localhost:5000/api/users");
        setLoadedData(response.users);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest]);


  return (
    <React.Fragment>
      {<ErrorModal error={error} onClear={clearError} />}
      {isLoading && (
        <div className="center">
          {" "}
          <LoadingSpinner asOverlay />{" "}
        </div>
      )}
      {!isLoading && loadedData && <UsersList items={loadedData} />}
    </React.Fragment>
  );
};

export default Users;
