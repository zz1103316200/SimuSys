package xd.simu.vo;

public class BoardCardVo {
	int boardcardID;
	String boardcardName;
	int slotID;
	
	String remark;
	String boardcardUrl;
	String factory;
	public String getBoardcardUrl() {
		return boardcardUrl;
	}
	public void setBoardcardUrl(String boardcardUrl) {
		this.boardcardUrl = boardcardUrl;
	}
	public int getBoardcardID() {
		return boardcardID;
	}
	public void setBoardcardID(int boardcardID) {
		this.boardcardID = boardcardID;
	}
	public String getBoardcardName() {
		return boardcardName;
	}
	public void setBoardcardName(String boardcardName) {
		this.boardcardName = boardcardName;
	}

	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public int getSlotID() {
		return slotID;
	}
	public void setSlotID(int slotID) {
		this.slotID = slotID;
	}
	public String getFactory() {
		return factory;
	}
	public void setFactory(String factory) {
		this.factory = factory;
	}
}
