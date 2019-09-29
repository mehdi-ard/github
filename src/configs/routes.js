import React, { lazy } from 'react';
import { SHOULD_NOT_AUTH, SHOULD_AUTH, NO_DIFFERENT } from './enums';

const routes = [
  {
    title: 'login',
    path: '/login',
    exact: true,
    icon: '',
    component: () => lazy(() => import('pages/login')),
    include: [''],
    appBar: false,
    guard: SHOULD_NOT_AUTH
  },
  {
    title: 'خروج از حساب کاربری',
    path: '/logout',
    exact: true,
    icon: '',
    component: () => lazy(() => import('pages/logout')),
    include: [''],
    appBar: false,
    guard: SHOULD_AUTH
  },
  {
    title: 'GitHub',
    path: '/',
    exact: true,
    icon: '',
    component: () => lazy(() => import('pages/home')),
    include: [''],
    appBar: true,
    guard: SHOULD_AUTH,
  },
  {
    title: 'Your Repositories',
    path: '/repositories',
    exact: true,
    icon: '',
    component: () => lazy(() => import('pages/repositories')),
    include: [''],
    appBar: true,
    guard: SHOULD_AUTH,
  },
  {
    title: 'Your Stars',
    path: `/stars`,
    exact: true,
    icon: '',
    component: () => lazy(() => import('pages/stars')),
    include: [''],
    appBar: true,
    guard: SHOULD_AUTH,
  },
  {
    title: 'gists',
    path: `/gists`,
    exact: true,
    icon: '',
    component: () => lazy(() => import('pages/gists')),
    include: [''],
    appBar: true,
    guard: SHOULD_AUTH,
  },
  {
    title: 'Your Repositories',
    path: `/:owner/:repo`,
    exact: true,
    icon: '',
    component: () => lazy(() => import('pages/repo')),
    include: [''],
    appBar: true,
    guard: SHOULD_AUTH,
  },

  {
    title: 'Your Repositories',
    path: `/:owner/:repo/issues`,
    exact: true,
    icon: '',
    component: () => lazy(() => import('pages/issues')),
    include: [''],
    appBar: true,
    guard: SHOULD_AUTH,
  },
  {
    title: '404',
    path: '*',
    exact: true,
    icon: '',
    component: () => lazy(() => import('pages/404')),
    include: [''],
    appBar: false,
    guard: NO_DIFFERENT
  }
];

export default routes;

export const visibleRoute = which => {
  return routes
    .filter(route => route.include.indexOf(which) !== -1)
    .reduce((a, b) => {
      return {
        ...a,
        [b.path]: b
      };
    }, {});
};
