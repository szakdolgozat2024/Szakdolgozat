import axios from "./axios";

export default class DataService {
  constructor() {
    
  };

  async get(url, callback) {
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

  async testget(url) {
    try {
        const response = await axios.get(url);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


  post(url, data) {
    axios.post(url, data)
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error.response.data);
    })
  }

  put(url, data) {
    axios.put(url, data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error.response.data);
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

  