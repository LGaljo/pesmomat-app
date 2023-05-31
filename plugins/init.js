import * as jwt from 'jsonwebtoken';

const unprotectedPaths = [
  '/auth/login',
  '/auth/registration',
  '/auth/registration/complete',
  '/auth/registration/verify',
  '/auth/forgotten-password',
  '/auth/change-password',
  '/browse',
  '/en/song/',
  '/en/auth/login',
  '/en/auth/registration',
  '/en/auth/registration/complete',
  '/en/auth/registration/verify',
  '/en/auth/forgotten-password',
  '/en/auth/change-password',
  '/en/browse',
  '/en/song/'
]


export default function (context) {
  window.onNuxtReady(async () => {
    await checkAuth(context);
  })
}

export async function checkAuth(context) {
  console.log(decodeURI(context.route.path))
  if (
    !unprotectedPaths.find(path => decodeURI(context.route.path).startsWith(path)) &&
    decodeURI(context.route.path) !== '/'
  ) {
    console.log('protected')
    if (localStorage.getItem('jwt')) {
      console.log('storage has jwt')
      const decoded = jwt.decode(localStorage.getItem('jwt'), {complete: false})
      if (!!decoded && decoded?.role !== 'USER') {
        await window.$nuxt.$router.push('/')
      }
    } else {
      console.log('storage missing jwt')
      await window.$nuxt.$router.push('/auth/login')
    }
  } else {
    console.log('unprotected')
  }
}
