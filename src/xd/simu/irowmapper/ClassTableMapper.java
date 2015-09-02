package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.ClassTableVo;

public class ClassTableMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		ClassTableVo vo=new ClassTableVo();
		
		try {

			vo.setClassName(rs.getString("className"));
			vo.setClassNum(rs.getString("classNum"));
			vo.setMajor(rs.getString("major"));
			vo.setStartTime(rs.getString("startTime"));			
			vo.setRemark(rs.getString("remark"));
			vo.setClasslevel(rs.getString("classlevel"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}
