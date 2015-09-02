package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.InterfaceRelevantVo;
import xd.simu.vo.InterfaceVo;

public class InterfaceRelevantMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		InterfaceRelevantVo vo=new InterfaceRelevantVo();
		
		try {
			
			vo.setInterfaceName(rs.getString("interfaceName"));
			vo.setInterfaceID(rs.getString("interfaceID"));
			vo.setInterfaceStyle(rs.getString("interfaceStyle"));
			vo.setParameters(rs.getString("parameters"));
			vo.setInterfaceNum(rs.getInt("interfaceNum"));
			vo.setRemark(rs.getString("remark"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}