package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;


import xd.simu.vo.LogicClassVo;

public class LogicClassMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		LogicClassVo vo=new LogicClassVo();
		
		try {
			
			vo.setClassName(rs.getString("className"));
			vo.setCourseNum(rs.getString("courseNum"));
			vo.setClassNum(rs.getString("classNum"));
			vo.setCourseProPerty(rs.getString("courseProperty"));
			vo.setTeachName(rs.getString("teachName"));
			vo.setStartTime(rs.getString("startTime"));
			vo.setCourseName(rs.getString("courseName"));
			vo.setRemark(rs.getString("remark"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}