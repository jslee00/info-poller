import contactAPI from '../api/contactsAPI';
import constant from '../constant';

export default {
  [constant.FETCH_CONTACTS]: (store, payload) => {
    var pageno;
    if (typeof payload === "undefined" || typeof payload.pageno === "undefined") {
      pageno = 1;
    } else {
      pageno = payload.pageno;
    }
    var pagesize = store.state.contactlist.pagesize;

    store.dispatch(constant.CHANGE_ISLOADING, {
      isLoading: true
    });

    contactAPI.fetchContacts(pageno, pagesize).then((response) => {
      store.commit(constant.FETCH_CONTACTS, {
        contactlist: response.data
      });
      store.dispatch(constant.CHANGE_ISLOADING, {
        isLoading: false
      });
    })
  },
  [constant.ADD_CONTACT]: (store) => {
    store.dispatch(constant.CHANGE_ISLOADING, {
      isLoading: true
    });
    contactAPI.addContact(store.state.contact).then((response) => {
      if (response.data.status == "success") {
        store.dispatch(constant.FETCH_CONTACTS, {
          pageno: 1
        });
      } else {
        console.log("연락처 추가 실패 : " + response.data);
      }
    })
  },
  [constant.UPDATE_CONTACT]: (store) => {
    store.dispatch(constant.CHANGE_ISLOADING, {
      isLoading: true
    });
    var currentPageNo = store.state.contactlist.pageno;
    contactAPI.updateContact(store.state.contact).then((response) => {
      if (response.data.status == "success") {
        store.dispatch(constant.FETCH_CONTACTS, {
          pageno: currentPageNo
        });
      } else {
        console.log("연락처 변경 실패 : " + response.data);
      }
    })
  },
  [constant.UPDATE_PHOTO]: (store, payload) => {
    store.dispatch(constant.CHANGE_ISLOADING, {
      isLoading: true
    });
    var currentPageNo = store.state.contactlist.pageno;
    contactAPI.updatePhoto(payload.no, payload.file).then((response) => {
      store.dispatch(constant.FETCH_CONTACTS, {
        pageno: currentPageNo
      });
    });
  },
  [constant.DELETE_CONTACT]: (store, payload) => {
    store.dispatch(constant.CHANGE_ISLOADING, {
      isLoading: true
    });
    var currentPageNo = store.state.contactlist.pageno;
    contactAPI.deleteContact(payload.no).then((response) => {
      store.dispatch(constant.FETCH_CONTACTS, {
        pageno: currentPageNo
      });
    });
  },
  [constant.FETCH_CONTACT_ONE]: (store, payload) => {
    store.dispatch(constant.CHANGE_ISLOADING, {
      isLoading: true
    });
    contactAPI.fetchContactOne(payload.no).then((response) => {
      store.commit(constant.FETCH_CONTACT_ONE, {
        contact: response.data
      });
      store.dispatch(constant.CHANGE_ISLOADING, {
        isLoading: false
      });
    })
  },
  [constant.INITIALIZE_CONTACT_ONE]: (store) => {
    store.commit(constant.INITIALIZE_CONTACT_ONE);
  },
  [constant.CHANGE_ISLOADING]: (store, payload) => {
    store.commit(constant.CHANGE_ISLOADING, payload);
  }
}
