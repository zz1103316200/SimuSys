package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.DeviceVo;

public class DeviceMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		DeviceVo vo=new DeviceVo();
		
		try {
			
			vo.setDeviceID(rs.getString("deviceID"));
			vo.setDeviceName(rs.getString("deviceName"));
			vo.setPractoryName(rs.getString("practoryName"));
			vo.setDeviceStyle(rs.getString("deviceStyle"));
						
			vo.setDescription(rs.getString("description"));
			vo.setDeviceUrl(rs.getString("deviceUrl"));
			vo.setRealUrl(rs.getString("realUrl"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}
