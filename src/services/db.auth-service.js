export default function DbAuthHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
      //return { Authorization: 'Bearer ' + user.accessToken };
      return { 'cache-control': 'no-cache',
               'Content-Type' : 'application/json',
               'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }