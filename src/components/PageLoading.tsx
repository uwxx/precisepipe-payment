/**
 * 加载页面
 * Created at 2022-08-31
 *
 * @author Wheeler https://github.com/WheelerLee
 * @copyright 2022
 *
 */
import { Space, Spin } from 'antd';

const PageLoading = () => (
  <div>
    {' '}
    <Space size="middle">
      <Spin size="large" />
    </Space>
  </div>
);

export default PageLoading;
