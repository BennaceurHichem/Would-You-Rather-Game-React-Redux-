import thunk from 'redux-thunk';
import {applyMiddleware} from "redux";
import logger from './logger';
import { loadingBarMiddleware } from 'react-redux-loading-bar'

export default applyMiddleware(thunk, logger,loadingBarMiddleware())