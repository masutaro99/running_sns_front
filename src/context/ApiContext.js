import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Auth } from "aws-amplify";
export const ApiContext = createContext();

const ApiContextProvider = (props) => {
  const [practices, setPractices] = useState([]);
  const [username, setUsername] = useState([]);
  const [userId, setUserId] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEditTarget, setSelectedEditTarget] = useState(0);
  const [editedtitle, setEditedTitle] = useState("");
  const [editeddescription, setEditedDescription] = useState("");
  const [editeddistance, setEditedDistance] = useState("");
  const [cover, setCover] = useState([]);
  useEffect(() => {
    const getPractice = async () => {
      try {
        console.log(process.env.REACT_APP_API_URL + "practices");
        const res = await axios.get(
          //process.env.REACT_APP_API_URL + "practices"
          "http://running-sns.masutaro99.com/practices"
        );
        setPractices(res.data);
      } catch {
        console.log("error");
      }
    };
    getPractice();
    Auth.currentAuthenticatedUser().then((data) => {
      setUsername(data.username);
      setUserId(data.attributes.sub);
    });
  }, [showModal]);
  const editPracticePatch = (title, description, distance) => {
    const data = {
      title: title,
      description: description,
      distance: distance,
    };
    axios.patch(
      process.env.REACT_APP_API_URL + "practices/" + String(selectedEditTarget),
      data
    );
  };
  const createProfile = async () => {
    const presignedObject = await axios
      .get(
        `${process.env.REACT_APP_API_URL}presignedurl?filename=${cover.name}&username=${username}`
      )
      .then((response) => response.data)
      .catch((e) => console.log(e.message));

    const options = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    await axios.put(presignedObject.post_url, cover, options);
    await axios.post(
      `${process.env.REACT_APP_API_URL}imgs?imagepath=${presignedObject.get_url}&username=${username}`
    );
  };

  const deleteProfile = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}imgs/1?username=${username}`
      );
    } catch {
      console.log("error");
    }
  };
  const editProfile = async () => {
    const presignedObject = await axios
      .get(
        `${process.env.REACT_APP_API_URL}presignedurl?filename=${cover.name}&username=${username}`
      )
      .then((response) => response.data)
      .catch((e) => console.log(e.message));

    const options = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    await axios.put(presignedObject.post_url, cover, options);
    await axios.patch(
      `${process.env.REACT_APP_API_URL}imgs/1?imagepath=${presignedObject.get_url}&username=${username}`
    );
  };

  return (
    <ApiContext.Provider
      value={{
        practices,
        setPractices,
        username,
        userId,
        showModal,
        setShowModal,
        selectedEditTarget,
        setSelectedEditTarget,
        editPracticePatch,
        editedtitle,
        setEditedTitle,
        editeddescription,
        setEditedDescription,
        editeddistance,
        setEditedDistance,
        cover,
        setCover,
        createProfile,
        deleteProfile,
        editProfile,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
