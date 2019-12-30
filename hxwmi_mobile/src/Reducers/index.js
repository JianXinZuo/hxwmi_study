import { combineReducers } from 'redux';

//导入reducers
import IndexConent from './IndexConent';
import Major from './MajorModel';

//合并state后导出
export default combineReducers({
    IndexConent,
    Major
});