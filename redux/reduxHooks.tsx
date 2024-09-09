import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from './store';

export const AppUseSelector: TypedUseSelectorHook<RootState> = useSelector;
export const AppUseDispatch = () => useDispatch<AppDispatch>();
