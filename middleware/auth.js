export default function ({$cookies, store}){
  const user = $cookies.get('user')
  if(user){
    store.commit('user/SET_USER', user)
  }
}