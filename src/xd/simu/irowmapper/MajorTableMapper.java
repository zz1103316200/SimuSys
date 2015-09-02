package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.MajorTableVo;

public class MajorTableMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		MajorTableVo vo=new MajorTableVo();
		
		try {
			
			vo.setMajorName(rs.getString("majorName"));
			vo.setMajorID(rs.getInt("majorID"));
			
			vo.setRemark(rs.getString("remark"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}
