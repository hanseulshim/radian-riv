export default [
  {
    id: 1,
    name: 'Home',
    path: '/',
    parentId: null,
    group: 'root'
  },
  {
    id: 2,
    name: 'Trending',
    path: '/trending',
    parentId: null,
    group: 'root'
  },
  {
    id: 3,
    name: 'Radian Interactive Value',
    path: '/radian-interactive-value',
    parentId: null,
    group: 'root'
  },
  {
    id: 4,
    name: 'Profile',
    path: '/profile',
    parentId: 1,
    group: 'Account'
  },
  {
    id: 5,
    name: 'Change Password',
    path: '/profile/password',
    parentId: 1,
    group: 'Account'
  },
  {
    id: 6,
    name: 'Change Security Questions',
    path: '/profile/security-questions',
    parentId: 1,
    group: 'Account'
  },
  {
    id: 7,
    name: 'Change Filter Defaults',
    path: '/profile/filter-defaults',
    parentId: 1,
    group: 'Account'
  }
]
