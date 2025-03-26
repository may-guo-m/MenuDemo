import { Module, register, SagaGenerator } from '@wonder/core-native';
import { RootState } from '../../type/state';
import { ComponentType } from 'react';
import Login from './Login';
import { Alert } from 'react-native';
import { Navigation } from '../Navigation';

class LoginMoudle extends Module<RootState, 'login'> {
  *login(username: string, password: string): SagaGenerator {
    // 简单的表单验证
    if (username === '' || password === '') {
      Alert.alert('错误', '用户名和密码不能为空');
      return;
    }

    // 模拟登录请求
    if (username === 'Admin' && password === '123456') {
      Alert.alert('成功', '登录成功');
      this.setState({ isLogin: true, userName: username });
      Navigation.rootNavigator?.goBack();
    } else {
      Alert.alert('错误', '用户名或密码错误');
    }
  }
}

const moudle = register(
  new LoginMoudle('login', { isLogin: false, userName: '' })
);
export const loginActions = moudle.getActions();
export const LoginComponent: ComponentType = moudle.attachLifecycle(Login);
