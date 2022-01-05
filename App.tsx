import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import AppNavigation from './src/navigation';
import TestSocket from './src/Screens/TestSocket';
import { store } from './src/store';
export default function App() {
	return (
		<Provider store={store}>
			<View style={styles.container}>
				{/* <Counter /> */}
				{/* <Users /> */}
				{/* <View style={styles.center}>
					<Text>App</Text>
					<TestSocket />
				</View> */}
				<AppNavigation />
				<StatusBar style='auto' />
			</View>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	center: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
