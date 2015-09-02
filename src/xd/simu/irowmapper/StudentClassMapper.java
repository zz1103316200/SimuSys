package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.StudentClassVo;

public class StudentClassMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		StudentClassVo vo=new StudentClassVo();
		
		try {

			vo.setClassID(rs.getInt("classID"));
			vo.setStuNum(rs.getString("stuNum"));

			vo.setRemark(rs.getString("remark"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}
