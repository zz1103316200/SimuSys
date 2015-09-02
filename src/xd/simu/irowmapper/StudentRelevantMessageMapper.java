package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.StudentRelevantMessageVo;
import xd.simu.vo.StudentVo;

public class StudentRelevantMessageMapper implements IrowMapper {

	@Override
	public Object mapper(ResultSet rs) {

		StudentRelevantMessageVo vo=new StudentRelevantMessageVo();
		
		try {
			//String stuName;
			//String stuNum;
			//String className;
			//int stuAge;
			//String stuGender;
			//String courseName;
			//String major;
			//String remark;
			vo.setStuName(rs.getString("stuName"));
			vo.setStuNum(rs.getString("stuNum"));
			vo.setClassName(rs.getString("className"));
			vo.setStuGender(rs.getString("stuGender"));
		
			vo.setMajor(rs.getString("majorname"));
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
