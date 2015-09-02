package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.DeviceInterVo;

public class DeviceInterMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		DeviceInterVo vo=new DeviceInterVo();
		
		try {
			
			vo.setDeviceID(rs.getString("deviceID"));
			vo.setInterfaceID(rs.getInt("interfaceID"));
			vo.setCoords(rs.getString("coords"));
						
			vo.setRemark(rs.getString("remark"));
			vo.setInterName(rs.getString("interName"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}
