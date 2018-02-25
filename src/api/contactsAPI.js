import CONFIG from '../config';
import axios from 'axios';

export default {
  fetchContacts: function (pageno, pagesize) {
    return axios.get(CONFIG.FETCH, {
      params: {
        pageno: pageno,
        pagesize: pagesize
      }
    });
  },
  fetchContactOne: function (no) {
    return axios.get(CONFIG.FETCH_ONE.replace("${no}", no));
  },
  addContact: function (contact) {
    return axios.post(CONFIG.ADD, contact);
  },
  updateContact: function (contact) {
    return axios.put(CONFIG.UPDATE.replace("${no}", contact.no), contact);
  },
  deleteContact: function (no) {
    return axios.delete(CONFIG.DELETE.replace("${no}", no));
  },
  updatePhoto: function (no, file) {
    var data = new FormData();
    data.append('photo', file);

    return axios.post(CONFIG.UPDATE_PHOTO.replace("${no}", no), data);
  }
}
