package xd.simu.vo;

public class TaskVo {
	int taskId;
	String taskName;
	String taskTarget;
	String deadline;
	String description;
	String teacherId;
	String taskState;
	String makeTime;
	String resoures;
	String taskDoc;
	Float weight;
	int classId;
	public String getResoures() {
		return resoures;
	}
	public void setResoures(String resoures) {
		this.resoures = resoures;
	}
	public int getTaskId() {
		return taskId;
	}
	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public String getTaskTarget() {
		return taskTarget;
	}
	public void setTaskTarget(String taskTarget) {
		this.taskTarget = taskTarget;
	}
	public String getDeadline() {
		return deadline;
	}
	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTeacherId() {
		return teacherId;
	}
	public void setTeacherId(String teacherId) {
		this.teacherId = teacherId;
	}
	public String getTaskState() {
		return taskState;
	}
	public void setTaskState(String taskState) {
		this.taskState = taskState;
	}
	public String getMakeTime() {
		return makeTime;
	}
	public void setMakeTime(String makeTime) {
		this.makeTime = makeTime;
	}
	public int getClassId() {
		return classId;
	}
	public void setClassId(int classId) {
		this.classId = classId;
	}
	public String getTaskDoc() {
		return taskDoc;
	}
	public void setTaskDoc(String taskDoc) {
		this.taskDoc = taskDoc;
	}
	public Float getWeight() {
		return weight;
	}
	public void setWeight(Float weight) {
		this.weight = weight;
	}
}
