package xd.simu.vo;

public class BoardInterfaceVo {
	int boardID;
	int interfaceID;
	String coords;
	String remark;
	String interName;
	public int getBoardID() {
		return boardID;
	}
	public void setBoardID(int boardID) {
		this.boardID = boardID;
	}
	public int getInterfaceID() {
		return interfaceID;
	}
	public void setInterfaceID(int interfaceID) {
		this.interfaceID = interfaceID;
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
	public String getInterName() {
		return interName;
	}
	public void setInterName(String interName) {
		this.interName = interName;
	}
	
}
