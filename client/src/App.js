import ReduxToastr from 'react-redux-toastr';
import combineReducers from "./configuration/combineReducer";
import AppRoutes from "./routes";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { configureAxiosDefaults, axiosResponse } from "./api/axios";
import './App.css';

function App() {
  const appStore = createStore(
    combineReducers,
    {},
    applyMiddleware(ReduxThunk)
  );
  configureAxiosDefaults();
  axiosResponse();
  return (
    <Provider store={appStore}>
    <div> 
    <ReduxToastr
    timeOut={5000}
    newestOnTop={false}
    preventDuplicates
    position="top-center"
    transitionIn="bounceIn"
    transitionOut="bounceOut"
    progressBar
  /> 
       <AppRoutes />
        </div>
      </Provider>
  );
}

export default App;
