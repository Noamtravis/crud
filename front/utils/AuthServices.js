import axios from "axios";

axios.defaults.withCredentials = true;

export const create = async (information) => {
  try {
    console.log(information);
    return await axios.post(`http://localhost:3000/users/create`, information);
  } catch (error) {
    console.error("Error");
  }
};

export const getusers = async () => {
  try {
    return await axios.get("http://localhost:3000/users/getusers");
  } catch (error) {
    console.error("Error");
  }
};

export const finduser = async (information) => {
  try {
    console.log(information);
    return await axios.post(
      `http://localhost:3000/users/finduser`,
      information
    );
  } catch (error) {
    console.error("Error");
  }
};

export const updateUsername = async (information) => {
  try {
    return await axios.post(
      `http://localhost:3000/users/updateuser`,
      information
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUsername = async (username) => {
  try {
    console.log(username);
    await axios.delete(`http://localhost:3000/users/delete/${username}`);
  } catch (error) {
    console.error("Error");
  }
};
