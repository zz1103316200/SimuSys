package xd.simu.vo;

public class BoardSlotVo {
	int boardID;
	int slotID;
	String coords;
	String remark;
	String slotName;
	public int getBoardID() {
		return boardID;
	}
	public void setBoardID(int boardID) {
		this.boardID = boardID;
	}
	public int getSlotID() {
		return slotID;
	}
	public void setSlotID(int slotID) {
		this.slotID = slotID;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getCoords() {
		return coords;
	}
	public void setCoords(String coords) {
		this.coords = coords;
	}
	public String getSlotName() {
		return slotName;
	}
	public void setSlotName(String slotName) {
		this.slotName = slotName;
	}
}
