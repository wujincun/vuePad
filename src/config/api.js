/**
 * Created by Administrator on 2017/7/14.
 */
import axios from 'axios';
if(process.env.NODE_ENV === 'production'){
  let urlHost = window.location.host;
  axios.defaults.baseURL = `https://${urlHost}`;
}
export default axios;
