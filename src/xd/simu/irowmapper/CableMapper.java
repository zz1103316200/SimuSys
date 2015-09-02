package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.CableVo;

public class CableMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		CableVo vo=new CableVo();
		
		try {
			vo.setCableID(rs.getInt("cableID"));
			vo.setCableName(rs.getString("cableName"));
			vo.setCableStyle(rs.getString("cableStyle"));
			vo.setConnectors(rs.getString("connectors"));
			
			vo.setRemark(rs.getString("remark"));
			vo.setCableUrl(rs.getString("CableUrl"));
			vo.setType(rs.getString("type"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}
