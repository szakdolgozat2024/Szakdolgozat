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

  post(url, data) {
    axios.post(url, data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  put(url, data) {
    axios.put(url, data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error.response);
    })
  }

  delete(url) {
    axios.delete(url)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

};

  