import { ErrorListener, Exception, SagaGenerator } from '@wonder/core-native';
export class ErrorHandler implements ErrorListener {
  *onError(e: Exception): SagaGenerator {
    console.log('error=====', e);
  }
}
