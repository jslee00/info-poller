import constant from '../constant';

export default {
  [constant.FETCH_CONTACTS]: (state, payload) => {
    state.contactlist = payload.contactlist;
  },
  [constant.FETCH_CONTACT_ONE]: (state, payload) => {
    state.contact = payload.contact;
  },
  [constant.INITIALIZE_CONTACT_ONE]: (state) => {
    state.contact = {
      no: '',
      name: '',
      tel: '',
      address: '',
      photo: ''
    };
  },
  [constant.CHANGE_ISLOADING]: (state, payload) => {
    state.isLoading = payload.isLoading;
  }
}
