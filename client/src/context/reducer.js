import {
    CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS, REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR,
    SETUP_USER_BEGIN, SETUP_USER_SUCCESS, SETUP_USER_ERROR,
    TOGGLE_SIDEBAR, LOGOUT_USER, CLEAR_VALUES, HANDLE_CHANGE,
    CREATE_POST_BEGIN, CREATE_POST_ERROR, CREATE_POST_SUCCESS,
    GET_POSTS_BEGIN, GET_POSTS_SUCCESS, SET_EDIT_POST,
    EDIT_POST_BEGIN, EDIT_POST_SUCCESS, EDIT_POST_ERROR,
    DELETE_POST_BEGIN
} from "./actions";

import { initialState } from './appContext';


const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Please provide all values!'
        }
    }

    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: '',
        }
    }
    if (action.type === REGISTER_USER_BEGIN) {
        return {
            ...state, isLoading: true
        }
    }

    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Created! Redirecting...'

        }
    }
    if (action.type === REGISTER_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }

    if (action.type === LOGIN_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }
    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            token: action.payload.token,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'Login Successful! Redirecting...',
        }
    }
    if (action.type === LOGIN_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }

    if (action.type === SETUP_USER_BEGIN) {
        return { ...state, isLoading: true }
    }
    if (action.type === SETUP_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: action.payload.alertText,
        }
    }
    if (action.type === SETUP_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null,
            userLocation: '',
            jobLocation: '',
        }
    }

    if (action.type === TOGGLE_SIDEBAR) {
        return { ...state, showSidebar: !state.showSidebar }
    }

    if (action.type === HANDLE_CHANGE) {
        return { ...state, [action.payload.name]: action.payload.value }
    }

    if (action.type === CLEAR_VALUES) {
        const initialState = {
            isEditing: false,
            editPostId: '',
            position: '',
            descriptionPost: '',
            locationPost: state.userLocation,
            imgPost: '',
            changeBy: '',
        }
        return { ...state, ...initialState }
    }

    if (action.type === CREATE_POST_BEGIN) {
        return { ...state, isLoading: true }
    }
    if (action.type === CREATE_POST_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New Post Created!',
        }
    }
    if (action.type === CREATE_POST_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if (action.type === GET_POSTS_BEGIN) {
        return { ...state, isLoading: true, showAlert: false }
    }
    if (action.type === GET_POSTS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            posts: action.payload.posts,
            totalPosts: action.payload.totalPosts,
            numOfPages: action.payload.numOfPages,
        }
    }

    if (action.type === SET_EDIT_POST) {
        const post = state.posts.find((post) => post._id === action.payload.id)
        const { _id, nameProduct,
            locationPost,
            descriptionPost,
            imgPost,
            changeBy, } = post
        return {
            ...state,
            isEditing: true,
            editPostId: _id,
            nameProduct,
            descriptionPost,
            locationPost,
            imgPost,
            changeBy,
        }
    }

    if (action.type === EDIT_POST_BEGIN) {
        return { ...state, isLoading: true }
      }
      if (action.type === EDIT_POST_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'success',
          alertText: 'Post Updated!',
        }
      }
      if (action.type === EDIT_POST_ERROR) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        }
      }
      if (action.type === DELETE_POST_BEGIN) {
        return { ...state, isLoading: true }
      }

    throw new Error(`no such action:${action.type}`)
}

export default reducer;

