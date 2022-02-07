import {createStore} from "vuex";
import axiosClient from "../axios";

const store = createStore({
  state:{
    user:{
      data:{},
      token:sessionStorage.getItem('TOKEN')
    }
  },
  getters:{},
  //dispatch
  actions:
  {
    register({commit},user){
      return axiosClient.post('register',user)
        .then(({data})=>{
          commit('setUser',data);
          return data;
        })
    },
    login({commit},user){
    return axiosClient.post('login',user)
      .then(({data})=>{
        commit('setUser',data);
        return data;
      })
    }
 },
  //commit
  mutations:{
    logout:state =>{
      state.user.data = {};
      state.user.token = null;
    },
    setUser:(state,userData)=>{
      state.user.token = userData.token;
      state.user.data = userData.user;
      //if we reload the page the token still it would be available and the user would be in dashboard
      sessionStorage.setItem('TOKEN',userData.token);
    }
  },
  modules:{}
})

export default store
