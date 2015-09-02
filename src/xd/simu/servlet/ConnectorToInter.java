package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import xd.simu.dao.BoardInterfaceDao;
import xd.simu.dao.Cable_ConnectorDao;
import xd.simu.dao.ConnectorInterfaceDao;
import xd.simu.dao.DeviceInterDao;
import xd.simu.dao.InterfaceDao;
import xd.simu.vo.BoardInterfaceVo;
import xd.simu.vo.Cable_connectorVo;
import xd.simu.vo.ConnectorInterfaceVo;
import xd.simu.vo.DeviceInterVo;
import xd.simu.vo.InterfaceVo;

public class ConnectorToInter extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public ConnectorToInter() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		this.doPost(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("application/json;charset=utf-8");
		response.setCharacterEncoding("utf-8");
		int lineId = Integer.parseInt(request.getParameter("lineId"));
		String sourceId = request.getParameter("sourceId");
		String targetId = request.getParameter("targetId");
		String sourborderId = request.getParameter("sourborderId");
		String tarborderId = request.getParameter("tarborderId");
		System.out.println("  lineId:"+lineId+"  sourceId:"+sourceId+"  targetId:"+targetId+"  sourborderId:"+sourborderId+"  tarborderId:"+tarborderId);
		PrintWriter out = response.getWriter();
		String [] tarborders = {};
		String [] sourborders = {};
		if(sourborderId.length()>0){
			sourborderId = sourborderId.substring(0, sourborderId.length()-1);
			sourborders = sourborderId.split(",");
		}
		if(tarborderId.length()>0){
			tarborderId = tarborderId.substring(0, tarborderId.length()-1);
			tarborders = tarborderId.split(",");
		}
		
		//int [] targetInters = {};
		//int [] sourceInters = {};
		DeviceInterDao did = new DeviceInterDao();
		BoardInterfaceDao bid = new BoardInterfaceDao();
		Cable_ConnectorDao ccd = new Cable_ConnectorDao();
		ConnectorInterfaceDao cid = new ConnectorInterfaceDao();
		InterfaceDao ind = new InterfaceDao();
		BoardInterfaceVo biv = null;
		DeviceInterVo div = null;
		InterfaceVo inV = null;
		List<BoardInterfaceVo> sourceBorInterList = new ArrayList();//���п�ѡ��
		List<BoardInterfaceVo> targetBorInterList = new ArrayList();//���п�ѡ��
		List<BoardInterfaceVo> BorInter = null;//�忨�Ľӿ�
		//List<BoardInterfaceVo> targetBorInter = null;//Ŀ��忨�Ľӿ�
		List<DeviceInterVo> sourceDevInterList = did.selectById(sourceId);//����豸�Ľӿ�
		List<DeviceInterVo> targetDevInterList = did.selectById(targetId);//Ŀ���豸�Ľӿ�
		List<Cable_connectorVo> cableInA = ccd.selectByCableIDAndSide(new Object[]{lineId,"A"});
		List<Cable_connectorVo> cableInB = ccd.selectByCableIDAndSide(new Object[]{lineId,"B"});
		Cable_connectorVo ccV = null;
		ArrayList<String> intertypes = new ArrayList(); //������Ľӿ�����
 		//Cable_ConnectorDao ccd = new Cable_ConnectorDao();
		//��õİ忨�ӿ�
		JSONArray sourJson = new JSONArray();
		JSONArray tarJson = new JSONArray();
		ArrayList<String> interSourOption = new ArrayList(); //��ѡ��Ľӿڣ�A��
		ArrayList<String> interTarOption = new ArrayList(); //��ѡ��Ľӿڣ�B��
		ArrayList<String> cableAOption = new ArrayList(); //��ѡ��Ľ�ͷ��A��
		ArrayList<String> cableBOption = new ArrayList(); //��ѡ��Ľ�ͷ��B��
		System.out.println("  sourborders.length"+sourborders.length);
		for(int i=0;i<sourborders.length;i++){
			BorInter = bid.selectById(Integer.parseInt(sourborders[i]));
			for(int j=0;j<BorInter.size();j++){
				biv = BorInter.get(j);
				interSourOption.add(biv.getInterName());
				sourceBorInterList.add(biv);
			}
		}
		for(int i=0;i<tarborders.length;i++){
			BorInter = bid.selectById(Integer.parseInt(tarborders[i]));
			for(int j=0;j<BorInter.size();j++){
				biv = BorInter.get(j);
				interTarOption.add(biv.getInterName());
				targetBorInterList.add(biv);
			}
		}
		for(int i=0;i<sourceDevInterList.size();i++){
			div = sourceDevInterList.get(i);
			interSourOption.add(div.getInterName());
		}
		for(int i=0;i<targetDevInterList.size();i++){
			div = targetDevInterList.get(i);
			interTarOption.add(div.getInterName());
		}
		List<ConnectorInterfaceVo> listC = null; 
		ConnectorInterfaceVo civ = null;
		//�����ͷ��Ӧ�Ľӿڣ�Aͷ
 		for(int i=0;i<cableInA.size();i++){
			ccV = cableInA.get(i);
			cableAOption.add(ccV.getConnectorType());
			String connectorType = ccV.getConnectorType();
			listC = cid.selectByConnectorType(connectorType);
			for(int j = 0;j<listC.size();j++){
				civ = listC.get(j);
				intertypes.add(civ.getInterfaceStyle());
			}
			int num = ccV.getNum();
			int tag = 0;//�����жϴ˴�ƥ���Ƿ��ҵ�
			//�ȴ��豸������
			do{
				
				tag = num;//�����жϴ˴�ƥ���Ƿ��ҵ�
				
				for(int decSouIn = 0 ;i<sourceDevInterList.size();i++){
					div = sourceDevInterList.get(decSouIn);
					inV = (InterfaceVo)ind.selectById(div.getInterfaceID());
					
					if(intertypes.contains(inV.getInterfaceStyle())){
						JSONObject obj = new JSONObject();
						obj.put("interName", div.getInterName());
						obj.put("interType",ccV.getConnectorType());
						sourJson.add(obj);
						sourceDevInterList.remove(decSouIn);
						num--;
						break;
					}else{
						
					}
					
				}
				if(tag==num){
					break;
				}
			}while(num!=0);
			//�ٴӰ忨�ӿ�������
			if(num!=0){
				do{
					
					tag = num;//�����жϴ˴�ƥ���Ƿ��ҵ�
					System.out.println(" sourceBorInterList.size():"+sourceBorInterList.size());
					for(int decSouIn = 0 ;decSouIn<sourceBorInterList.size();decSouIn++){
						biv = sourceBorInterList.get(decSouIn);
						inV = (InterfaceVo)ind.selectById(div.getInterfaceID());
						
						if(intertypes.contains(inV.getInterfaceStyle())){
							JSONObject obj = new JSONObject();
							obj.put("interName", div.getInterName());
							obj.put("interType",ccV.getConnectorType());
							sourJson.add(obj);
							sourceBorInterList.remove(decSouIn);
							num--;
							break;
						}else{
							
						}
						
					}
					if(tag==num){
						break;
					}
				}while(num!=0);
			}
			
			
		}
 		//�����ͷ��Ӧ�Ľӿڣ�Bͷ
 		for(int i=0;i<cableInB.size();i++){
			ccV = cableInB.get(i);
			cableBOption.add(ccV.getConnectorType());
			String connectorType = ccV.getInterfaceStyle();
			listC = cid.selectByConnectorType(connectorType);
			for(int j = 0;j<listC.size();j++){
				civ = listC.get(i);
				intertypes.add(civ.getInterfaceStyle());
			}
			int num = ccV.getNum();
			int tag = 0;//�����жϴ˴�ƥ���Ƿ��ҵ�
			//�ȴ��豸������
			do{
				
				tag = num;//�����жϴ˴�ƥ���Ƿ��ҵ�
				for(int decSouIn = 0 ;decSouIn<targetDevInterList.size();decSouIn++){
					div = targetDevInterList.get(decSouIn);
					inV = (InterfaceVo)ind.selectById(div.getInterfaceID());
					
					if(intertypes.contains(inV.getInterfaceStyle())){
						JSONObject obj = new JSONObject();
						obj.put("interName", div.getInterName());
						obj.put("interType",ccV.getConnectorType());
						tarJson.add(obj);
						targetDevInterList.remove(decSouIn);
						num--;
						break;
					}else{
						
					}
					
				}
				if(tag==num){
					break;
				}
			}while(num!=0);
			//�ٴӰ忨�ӿ�������
			if(num!=0){
				do{
					
					tag = num;//�����жϴ˴�ƥ���Ƿ��ҵ�
					for(int decSouIn = 0 ;decSouIn<targetBorInterList.size();decSouIn++){
						biv = targetBorInterList.get(decSouIn);
						inV = (InterfaceVo)ind.selectById(div.getInterfaceID());
						
						if(intertypes.contains(inV.getInterfaceStyle())){
							JSONObject obj = new JSONObject();
							obj.put("interName", div.getInterName());
							obj.put("interType",ccV.getConnectorType());
							tarJson.add(obj);
							targetBorInterList.remove(decSouIn);
							num--;
							break;
						}else{
							
						}
						
					}
					if(tag==num){
						break;
					}
				}while(num!=0);
			}
			
			
		}
 		JSONObject total = new JSONObject();
 		total.put("inPortJson", sourJson);
 		total.put("outPortJson", tarJson);
 		total.put("interSourOption", interSourOption);
 		total.put("interTarOption", interTarOption);
 		total.put("cableAOption", cableAOption);
 		total.put("cableBOption", cableBOption);
 		System.out.println("  total:"+total);
 		out.print(total);
		out.flush();
		out.close();
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}
