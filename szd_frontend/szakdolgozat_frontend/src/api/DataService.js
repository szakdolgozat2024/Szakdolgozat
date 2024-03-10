import axios from "./axios";

export default class DataService {
  constructor() {
    
  };

  get(url, callback) {
    axios.get(url)
    .then(function (response) {
      // handle success
      console.log(response);
      callback(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    })
  }
};