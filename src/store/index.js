import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import axios from "axios"
import router from "../router/index"


Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    state: {
      auth: "",
      user: "",
    }
  },
  mutations: {
    auth(state, payload) {
      state.auth = payload;
    },
    user(state, payload) {
      state.user = payload;
    },
    logout(state, payload) {
      state.auth = payload;
    },
    changeUserData(state, payload) {
      state.user.profile = payload;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      const responseLogin = await axios.post(
        "mysql://b4930d8a0c2a9a:07cd54f8@us-cdbr-east-03.cleardb.com/heroku_336a7321155ae0c?reconnect=true/api/login",
        {
          email: email,
          password: password,
        }
      );
      const responseUser = await axios.get(
        "mysql://b4930d8a0c2a9a:07cd54f8@us-cdbr-east-03.cleardb.com/heroku_336a7321155ae0c?reconnect=true/api/user",
        {
          params: {
            email: email,
          },
        }
      );
      commit("auth", responseLogin.data.auth);
      commit("user", responseUser.data.data[0]);
      router.replace("/home");
    },
    logout({ commit }) {
      axios
        .post("mysql://b4930d8a0c2a9a:07cd54f8@us-cdbr-east-03.cleardb.com/heroku_336a7321155ae0c?reconnect=true/api/logout", {
          auth: this.state.auth,
      })
        .then((response) => {
          console.log(response);
          commit("logout", response.data.auth);
          router.replace
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeUserData({ commit }, { profile }) {
      commit("changeUserData", profile);
    },
  },
})
