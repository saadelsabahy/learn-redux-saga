import { createAction } from 'redux-act';
import { IChat, ISendMessage } from '../types';

export const login = createAction<string>('login');
export const logout = createAction<string>('logout');

export const addUser = createAction<string>('add user');
export const removeUser = createAction<string>('remove user');

export const newMessage = createAction<IChat>('new message');
export const sendMessage = createAction<ISendMessage>('send message');
