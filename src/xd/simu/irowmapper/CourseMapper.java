package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.CourseVo;

public class CourseMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		CourseVo vo=new CourseVo();
		
		try {
			
			vo.setPeriods(rs.getInt("periods"));
			vo.setCourseName(rs.getString("courseName"));
			vo.setCourseNum(rs.getString("courseNum"));
			vo.setClassTime(rs.getString("classTime"));
						
			vo.setRemark(rs.getString("remark"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}
