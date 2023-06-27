import * as jwt from 'jsonwebtoken';

const unprotectedPaths = [
  '/auth',
  '/browse',
  '/song',
  '/generate',
  '/suggest',
  '/about',
  '/en/auth',
  '/en/browse',
  '/en/song',
  '/en/generate',
  '/en/suggest',
  '/en/about',
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
    !['/', '/en'].includes(decodeURI(context.route.path))
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
