import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Chat from '../Screens/Chat/Chat';
import Join from '../Screens/Chat/Join';
const Stack = createStackNavigator();

const AppNavigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name='Login' component={Join} />
				<Stack.Screen name='Chat' component={Chat} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigation;
