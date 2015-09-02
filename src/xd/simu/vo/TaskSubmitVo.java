package xd.simu.vo;

public class TaskSubmitVo {
	int taskId;
	String stuNum;
	String submitTime;
	Float humanGrade;
	String gradeState;
	String valution;
	String xmlStr;
	String submitState;
	Float compGrade;
	public int getTaskId() {
		return taskId;
	}
	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}
	public String getStuNum() {
		return stuNum;
	}
	public void setStuNum(String stuNum) {
		this.stuNum = stuNum;
	}
	public String getSubmitTime() {
		return submitTime;
	}
	public void setSubmitTime(String submitTime) {
		this.submitTime = submitTime;
	}
	
	public String getGradeState() {
		return gradeState;
	}
	public void setGradeState(String gradeState) {
		this.gradeState = gradeState;
	}
	public String getValution() {
		return valution;
	}
	public void setValution(String valution) {
		this.valution = valution;
	}
	public String getXmlStr() {
		return xmlStr;
	}
	public void setXmlStr(String xmlStr) {
		this.xmlStr = xmlStr;
	}
	public String getSubmitState() {
		return submitState;
	}
	public void setSubmitState(String submitState) {
		this.submitState = submitState;
	}
	public Float getHumanGrade() {
		return humanGrade;
	}
	public void setHumanGrade(Float humanGrade) {
		this.humanGrade = humanGrade;
	}
	public Float getCompGrade() {
		return compGrade;
	}
	public void setCompGrade(Float compGrade) {
		this.compGrade = compGrade;
	}
}
