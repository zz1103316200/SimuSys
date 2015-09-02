package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.InterfaceVo;

public class InterfaceMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		InterfaceVo vo=new InterfaceVo();
		
		try {
			
			vo.setInterfaceName(rs.getString("interfaceName"));
			vo.setInterfaceID(rs.getInt("interfaceID"));
			vo.setInterfaceStyle(rs.getString("interfaceStyle"));
			vo.setParameters(rs.getString("parameters"));
						
			vo.setRemark(rs.getString("remark"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}
