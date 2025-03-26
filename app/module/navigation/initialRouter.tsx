import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import { MainComponent } from '../main';
import { DetailComponent } from '../detail';
import { OrderComponent } from '../order';
import { LoginComponent } from '../login';

const Stack = createNativeStackNavigator();
export const InitialRouter: FC = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MainComponent} />
      <Stack.Screen name="Detail" component={DetailComponent} />
      <Stack.Screen name="Order" component={OrderComponent} />
      <Stack.Screen name="Login" component={LoginComponent} />
    </Stack.Navigator>
  );
};
