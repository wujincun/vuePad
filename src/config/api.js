/**
 * Created by Administrator on 2017/7/14.
 */
import axios from 'axios';
if(process.env.NODE_ENV === 'production'){
  axios.defaults.baseURL = 'https://vz.lashou.com';
}
export default axios;
