package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.CableVo;
import xd.simu.vo.Cable_connectorVo;

public class Cable_connectorMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		Cable_connectorVo vo=new Cable_connectorVo();
		
		try {
			vo.setCableID(rs.getInt("cableID"));
			vo.setInterfaceStyle(rs.getString("interfaceStyle"));
			vo.setConnectorType(rs.getString("connectorType"));
			vo.setNum(rs.getInt("num"));
			
			vo.setRemark(rs.getString("remark"));
			vo.setInter_side(rs.getString("inter_side"));
			
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}