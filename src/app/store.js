
import  userReducer  from '../features/auth/userSlice';
import counterReducer from '../features/counter/counterSlide';



const { configureStore} = require ('@reduxjs/toolkit');

const rootReducer = {
    counter: counterReducer, // couter = count torng video
    user: userReducer,
}

const store = configureStore({

    reducer: rootReducer,
});


export default store;