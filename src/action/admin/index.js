import {combineReducers} from 'redux';
import {adminAction} from './AdminAction';
import {editorAction} from './EditorAction';

const admin = combineReducers({admin:adminAction, editor:editorAction});

export * from './AdminAction';
export * from './EditorAction';

export default admin;
