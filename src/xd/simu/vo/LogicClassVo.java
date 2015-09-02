package xd.simu.vo;

public class LogicClassVo {
	String className;
	String courseNum;
	String classNum;
	String teachName;
	String courseProPerty;
	String courseName;
	String startTime;
	String remark;
	
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public String getClassNum() {
		return classNum;
	}
	public void setClassNum(String classNum) {
		this.classNum = classNum;
	}
	public String getTeachName() {
		return teachName;
	}
	public void setTeachName(String teachName) {
		this.teachName = teachName;
	}
	public String getCourseProPerty() {
		return courseProPerty;
	}
	public void setCourseProPerty(String courseProPerty) {
		this.courseProPerty = courseProPerty;
	}
	public String getCourseName() {
		return courseName;
	}
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getCourseNum() {
		return courseNum;
	}
	public void setCourseNum(String courseNum) {
		this.courseNum = courseNum;
	}
	@Override
	public String toString() {
		return "LogicClassVo [className=" + className + ", classNum="
				+ classNum + ", teachName=" + teachName + ", courseProPerty="
				+ courseProPerty + ", courseName=" + courseName
				+ ", startTime=" + startTime + ", remark=" + remark
				+ ", classlevel=" + "]";
	}
	
	
}
