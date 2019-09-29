import { initial } from 'react-beep';
import storage from 'providers/storage';

initial([
  {
    name: 'token',
    defaultValue: storage.get('token'),
    didUpdate: value => {
      if (value === null) {
        storage.remove('token');
        return;
      }
      storage.set('token', value);
    }
  },
  {
    name: 'user',
    defaultValue: storage.get('user'),
    didUpdate: value => {
      if (value === null) {
        storage.remove('user');
        return;
      }
      storage.set('user', value);
    }
  },
  {
    name: 'base',
    defaultValue: storage.get('base'),
    didUpdate: value => {
      if (value === null) {
        storage.remove('base');
        return;
      }
      storage.set('base', value);
    }
  },
]);
