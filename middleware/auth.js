import {checkAuth} from "../plugins/init";

export default async function (context) {
  // TODO: Prevent route to admin/auth on raspberry build
  if (process.client) {
    await checkAuth(context)
  }
}
