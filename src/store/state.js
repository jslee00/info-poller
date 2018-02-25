import CONFIG from "../config";

export default {
  isLoading: false,
  username: "neiwiso",
  contact: {
    no: 0,
    name: "",
    tel: "",
    address: "",
    photo: ""
  },
  contactlist: {
    pageno: 1,
    pagesize: CONFIG.PAGESIZE,
    totalcount: 0,
    contacts: []
  }
};
