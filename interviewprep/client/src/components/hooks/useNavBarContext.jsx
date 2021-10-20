import React, { createContext, useContext } from 'react'
import useNavBarContextProvider from './useNavBarContextProvider';


const context = createContext({
	open: false, handleOpen: () => console.log("handleOpen"),handleClose: console.log("handleClose")});

const { Provider } = context;

export const NavBarContextProvider = (props) => {
	const navBarContext = useNavBarContextProvider();

	return <Provider value={navBarContext}>{props.children}</Provider>
}

export const useNavBarContext = () => {
	return useContext(context);
}

