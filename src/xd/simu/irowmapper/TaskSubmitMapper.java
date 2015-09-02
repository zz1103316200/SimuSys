package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.TaskSubmitVo;


public class TaskSubmitMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		TaskSubmitVo vo=new TaskSubmitVo();
		
		try {
			
			vo.setTaskId(rs.getInt("taskId"));
			vo.setStuNum(rs.getString("stuNum"));
			vo.setSubmitTime(rs.getString("submitTime"));
			vo.setHumanGrade(rs.getFloat("humanGrade"));
			vo.setGradeState(rs.getString("gradeState"));
			vo.setValution(rs.getString("valution"));
			vo.setXmlStr(rs.getString("xmlStr"));
			vo.setSubmitState(rs.getString("submitState"));
			vo.setCompGrade(rs.getFloat("compGrade"));
			//vo.setTaskState(rs.getString("taskState"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}
