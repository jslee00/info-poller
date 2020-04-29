import pollerAPI from "../api/pollerAPI";
import router from "../router";
import CONSTANT from "../constant";

export default {
  [CONSTANT.LOGIN]: (store, payload) => {
    pollerAPI.login(payload).then(response => {
      if (response.data.status == "success") {
        store.commit(CONSTANT.LOAD_AUTH, response.data.user);
        router.push({
          name: "home"
        });
      } else {
        store.dispatch(CONSTANT.CHANGE_FLASH, {
          name: "login",
          message: response.data.flash
        });
      }
    });
  },
  [CONSTANT.SIGNUP]: (store, payload) => {
    pollerAPI.signUp(payload).then(response => {
      if (response.data.status == "success") {
        store.commit(CONSTANT.LOAD_AUTH, response.data.user);
        router.push({
          name: "home"
        });
      } else {
        if (payload.rank == "admin") {
          store.dispatch(CONSTANT.CHANGE_FLASH, {
            name: "adminSignUp",
            message: response.data.flash
          });
        } else {
          store.dispatch(CONSTANT.CHANGE_FLASH, {
            name: "userSignUp",
            message: response.data.flash
          });
        }
      }
    });
  },
  [CONSTANT.LOGOUT]: store => {
    pollerAPI.logout().then(response => {
      if (response.data.status == "success") {
        store.commit(CONSTANT.LOGOUT);
        router.push({
          name: "home"
        });
      }
    });
  },
  [CONSTANT.LOAD_AUTH]: store => {
    pollerAPI.loadAuth().then(response => {
      if (response.data.status == "success") {
        store.commit(CONSTANT.LOAD_AUTH, response.data.user);
      }
    });
  },
  [CONSTANT.EDIT_USER_INFO]: (store, payload) => {
    pollerAPI.editUserInfo(payload).then(response => {
      if (response.data.status == "success") {
        store.dispatch(CONSTANT.LOAD_USER_INFO, payload._id);
        alert("정보 수정이 완료되었습니다.");
      } else {
        store.dispatch(CONSTANT.CHANGE_FLASH, {
          name: "editUserInfo",
          message: response.data.flash
        });
      }
    });
  },
  [CONSTANT.LOAD_USER_INFO]: (store, payload) => {
    pollerAPI.loadUserInfo(payload).then(response => {
      if (response.data.status == "success") {
        store.commit(CONSTANT.LOAD_USER_INFO, response.data.user);
      }
    });
  },
  [CONSTANT.LOAD_POLL_LIST]: (store, payload) => {
    pollerAPI.loadPollList(payload).then(response => {
      if (response.data.status == "success") {
        store.commit(CONSTANT.LOAD_POLL_LIST, response.data.pollList);
      }
    });
  },
  [CONSTANT.LOAD_POLL_DETAIL]: (store, payload) => {
    pollerAPI.loadPollDetail(payload).then(response => {
      if (response.data.status == "success") {
        store.commit(CONSTANT.LOAD_POLL_DETAIL, response.data.poll);
      }
    });
  },
  [CONSTANT.OPEN_POLL]: (store, payload) => {
    pollerAPI
      .openPoll({
        startDateTime: payload.startDate + " " + payload.startTime,
        endDateTime: payload.endDate + " " + payload.endTime,
        title: payload.title,
        intro: payload.intro,
        target: payload.target
      })
      .then(response => {
        if (response.data.status == "success") {
          router.push({
            name: "pollDetail",
            params: {
              poll_id: response.data.id
            }
          });
        }
      });
  },
  [CONSTANT.LOAD_ITEM_LIST]: (store, payload) => {
    pollerAPI.loadItemList(payload).then(response => {
      if (response.data.status == "success") {
        store.commit(CONSTANT.LOAD_ITEM_LIST, response.data.itemList);
      }
    });
  },
  [CONSTANT.LOAD_ITEM_DETAIL]: (store, payload) => {
    pollerAPI.loadItemDetail(payload).then(response => {
      if (response.data.status == "success") {
        store.commit(CONSTANT.LOAD_ITEM_DETAIL, response.data.item);
      }
    });
  },
  [CONSTANT.OPEN_ITEM]: (store, payload) => {
    pollerAPI.openItem(payload).then(response => {
      if (response.data.status == "success") {
        router.push({
          name: "itemDetail",
          params: {
            poll_id: payload.poll,
            item_id: response.data.id
          }
        });
      }
    });
  },
  [CONSTANT.APPLY_ITEM]: (store, payload) => {
    pollerAPI.applyItem(payload).then(response => {
      if (response.data.status == "success") {
        $("#card-alert").append(`
          <div id="alert-apply" class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>신청 완료!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        `);
        store.dispatch(CONSTANT.LOAD_ITEM_DETAIL, payload);
      } else if (response.data.status == "already") {
        alert("이미 신청한 항목입니다.");
      } else if (response.data.status == "duplicated") {
        alert("동일한 태그를 가진 항목이 이미 신청되었습니다.");
      } else if (response.data.status == "max") {
        alert("신청 인원이 가득 찼습니다.");
      }
    });
  },
  [CONSTANT.CANCEL_ITEM]: (store, payload) => {
    pollerAPI.cancelItem(payload).then(response => {
      if (response.data.status == "success") {
        store.dispatch(CONSTANT.LOAD_ITEM_DETAIL, payload);
        alert("정상적으로 취소되었습니다.");
      }
    });
  },
  [CONSTANT.CHANGE_FLASH]: (store, payload) => {
    store.commit(CONSTANT.CHANGE_FLASH, payload);
  },
  [CONSTANT.CHANGE_ISLOADING]: (store, payload) => {
    store.commit(CONSTANT.CHANGE_ISLOADING, payload);
  }
};
