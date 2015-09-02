package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.InterfaceRelevantNumVo;


public class InterfaceRelevantNumMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		InterfaceRelevantNumVo vo=new InterfaceRelevantNumVo();	
		try {
			vo.setInterfaceID(rs.getInt("interfaceID"));
			vo.setInterfaceStyle(rs.getString("interfaceStyle"));	
			vo.setInterfaceNum(rs.getInt("interfaceNum"));		
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}