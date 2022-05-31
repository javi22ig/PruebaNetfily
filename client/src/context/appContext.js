import React, { useContext, useReducer, useEffect } from "react";
import {
  DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR, REGISTER_USER_SUCCESS,
  LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR,
  SETUP_USER_BEGIN, SETUP_USER_SUCCESS, SETUP_USER_ERROR,
  TOGGLE_SIDEBAR, LOGOUT_USER, HANDLE_CHANGE, CLEAR_VALUES,
  CREATE_POST_BEGIN, CREATE_POST_ERROR, CREATE_POST_SUCCESS,
  GET_POSTS_BEGIN, GET_POSTS_SUCCESS, SET_EDIT_POST,
  EDIT_POST_BEGIN, EDIT_POST_SUCCESS, EDIT_POST_ERROR,
  DELETE_POST_BEGIN

} from "./actions";

import reducer from "./reducer";

import axios from 'axios'

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  showSidebar: false,
  isEditing: false,
  editPostId: '',
  nameProduct: '',
  locationPost: userLocation || '',
  descriptionPost: '',
  imgPost: '',
  changeBy: '',
  posts: [],
  totalPosts: 0,
  numOfPages: 1,
  page: 1,
}

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  // axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  })
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )



  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000);
  }

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('location')
  }

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN })
    try {
      const response = await axios.post('/api/v1/auth/register', currentUser)
      const { user, token, location } = response.data
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      })

      addUserToLocalStorage({ user, token, location })

    } catch (error) {
      console.log(error.response)
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN })
    try {
      const { data } = await axios.post('/api/v1/auth/login', currentUser)
      const { user, token, location } = data

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      })

      addUserToLocalStorage({ user, token, location })
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)

      const { user, token, location } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      })
      addUserToLocalStorage({ user, token, location })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  const updateUser = async (currentUser) => {
    try {
      const { data } = await axios.patch('/api/v1/auth/updateUser', currentUser, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
    } catch (error) {
      console.log(error.response)
    }
  }
  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    })
  }
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }

  const createPost = async () => {
    dispatch({ type: CREATE_POST_BEGIN })
    try {
      const { nameProduct, locationPost, descriptionPost, imgPost, changeBy } = state

      await authFetch.post('/posts', {
        nameProduct, locationPost, descriptionPost, imgPost, changeBy
      })
      dispatch({
        type: CREATE_POST_SUCCESS,
      })
      // call function instead clearValues()
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response === 401) return
      dispatch({
        type: CREATE_POST_ERROR,
        payload: { msg: error.response.msg.data },
      })
    }
    clearAlert()
  }

  const getPosts = async () => {
    let url = '/posts'

    dispatch({ type: GET_POSTS_BEGIN })
    try {
      const { data } = await authFetch(url)
      const { posts, totalPosts, numOfPages } = data
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: {
          posts,
          totalPosts,
          numOfPages,
        },
      })
    } catch (error) {
      console.log(error.response)
      logoutUser()
    }
    clearAlert()
  }
  const getMyPosts = async () => {
    let url = '/posts/AllMyPosts'

    dispatch({ type: GET_POSTS_BEGIN })
    try {
      const { data } = await authFetch(url)
      const { posts, totalPosts, numOfPages } = data
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: {
          posts,
          totalPosts,
          numOfPages,
        },
      })
    } catch (error) {
      console.log(error.response)
      logoutUser()
    }
    clearAlert()
  }
  
  useEffect(() => {
    getPosts()
  }, [])

  const setEditPost = (id) => {
    dispatch({ type: SET_EDIT_POST, payload: { id } })
  }
  const deletePost =  async (id) => {
    dispatch({ type: DELETE_POST_BEGIN })
    try {
      await authFetch.delete(`/posts/${id}`)
      getPosts()
    } catch (error) {
      logoutUser()
    }
  }

  const editPost =  async () => {
    dispatch({ type: EDIT_POST_BEGIN })
    try {
      const { nameProduct, locationPost, descriptionPost, imgPost, changeBy } = state
      await authFetch.patch(`/posts/${state.editPostId}`, {
        nameProduct, locationPost, descriptionPost, imgPost, changeBy
      })
      dispatch({
        type: EDIT_POST_SUCCESS,
      })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: EDIT_POST_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }




  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser, loginUser, setupUser, toggleSidebar, logoutUser, updateUser, handleChange, clearValues, createPost, getPosts, setEditPost, deletePost, editPost, getMyPosts}}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}


export { AppProvider, initialState, useAppContext }