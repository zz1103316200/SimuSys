package xd.simu.vo;

public class LogicClassTableVo {
	int classID;
	String courseNum;
	String teachNum;
	String startTime;
	String classNum;
	String className;
	String remark;
	public int getClassID() {
		return classID;
	}
	public void setClassID(int classID) {
		this.classID = classID;
	}
	public String getCourseNum() {
		//System.out.println("hello!!!!");
		return courseNum;
	}
	public void setCourseNum(String courseNum) {
		this.courseNum = courseNum;
	}
	public String getTeachNum() {
		return teachNum;
	}
	public void setTeachNum(String teachNum) {
		this.teachNum = teachNum;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getClassNum() {
		return classNum;
	}
	public void setClassNum(String classNum) {
		this.classNum = classNum;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}
