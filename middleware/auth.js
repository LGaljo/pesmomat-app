const auth = async ({ app, store, route, redirect }) => {
  if (route.path.startsWith('/admin') && !process.env.ADMIN) {
    console.log('NOT AN ADMIN');
    redirect('/');
  }

  // Check on route to /songs/_id to have enough coins to make that
}

export default auth
