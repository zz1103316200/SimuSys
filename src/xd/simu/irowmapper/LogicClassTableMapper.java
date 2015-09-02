package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.LogicClassTableVo;

public class LogicClassTableMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		LogicClassTableVo vo=new LogicClassTableVo();
		
		try {
			
			vo.setClassID(rs.getInt("classID"));
			vo.setCourseNum(rs.getString("courseNum"));
			vo.setTeachNum(rs.getString("teachNum"));
			vo.setStartTime(rs.getString("startTime"));
			vo.setClassNum(rs.getString("classNum"));
			vo.setClassName(rs.getString("className"));
						
			vo.setRemark(rs.getString("remark"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}
