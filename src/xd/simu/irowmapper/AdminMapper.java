package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.AdminVo;

public class AdminMapper implements IrowMapper{

	@Override
	public Object mapper(ResultSet rs) {
		AdminVo vo=new AdminVo();
		
		try {
			
			vo.setAdminName(rs.getString("adminName"));
			vo.setAdminPword(rs.getString("adminPword"));
		
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}


}
