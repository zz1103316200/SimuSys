package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.StudentVo;

public class StudentMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		StudentVo vo=new StudentVo();
		
		try {

			vo.setStuName(rs.getString("stuName"));
			vo.setStuPword(rs.getString("stuPword"));
			vo.setStuNum(rs.getString("stuNum"));
			vo.setStuGender(rs.getString("stuGender"));
			vo.setMajor(rs.getString("major"));
			
			vo.setClassNum(rs.getString("classNum"));
			vo.setStuAge(rs.getInt("stuAge"));
			vo.setRemark(rs.getString("remark"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}
