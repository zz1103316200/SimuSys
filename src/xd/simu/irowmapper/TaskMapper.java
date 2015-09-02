package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.TaskVo;



public class TaskMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		TaskVo vo=new TaskVo();
		
		try {
			
			vo.setTaskId(rs.getInt("taskId"));
			vo.setTaskName(rs.getString("taskName"));
			vo.setTaskTarget(rs.getString("taskTarget"));
			vo.setDeadline(rs.getString("deadline"));
			vo.setDescription(rs.getString("description"));
			vo.setTeacherId(rs.getString("teacherId"));
			vo.setTaskState(rs.getString("taskState"));
			vo.setMakeTime(rs.getString("makeTime"));
			vo.setResoures(rs.getString("resoures"));
			vo.setTaskDoc(rs.getString("taskDoc"));
			vo.setClassId(rs.getInt("classId"));
			vo.setWeight(rs.getFloat("weight"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}
