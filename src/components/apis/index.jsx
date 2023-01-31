import axios from "axios";

const APIData = async () => {
  try {
    return await axios
      .get(
        "https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple"
      )
      .then((result) => result.data.results);
  } catch (err) {
    console.error(`You have the following error ${err}`);
  }
};
export default APIData;
