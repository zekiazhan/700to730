
using UnityEngine;
using System.Collections;

public class camControl : MonoBehaviour {
	public GameObject cameraA;
	public GameObject cameraB; 
	public GameObject cameraC; 
	public GameObject cameraD;
	public GameObject cameraE; 
	public GameObject cameraF; 
	public GameObject cameraG;
	public GameObject cameraH; 
	public GameObject cameraI;
	public GameObject cameraJ;

	Camera camA;
	Camera camB;
	Camera camC;
	Camera camD;
	Camera camE;
	Camera camF;
	Camera camG;
	Camera camH;
	Camera camI;
	Camera camJ;


	void Start(){
		camA = cameraA.GetComponent<Camera>();
		camB = cameraB.GetComponent <Camera>();
		camC = cameraC.GetComponent<Camera>();
		camD = cameraD.GetComponent <Camera>();
		camE = cameraE.GetComponent<Camera>();
		camF = cameraF.GetComponent <Camera>();
		camG = cameraG.GetComponent<Camera>();
		camH = cameraH.GetComponent<Camera>();
		camI = cameraI.GetComponent <Camera>();
		camJ = cameraJ.GetComponent<Camera>();


	}

	void Update () {
		if(Input.GetKey("q")){
			Debug.Log("Using Camera A");
			camA.enabled =true;
			camB.enabled=false; 
			camC.enabled =false;
			camD.enabled =false;
			camE.enabled =false;
			camF.enabled =false;
			camG.enabled =false;
			camH.enabled =false;
			camI.enabled =false;
			camJ.enabled =false;
			//Camera.main = cameraOne;

			//camOne.isActiveAndEnabled = true;
			//camTwo.isActiveAndEnabled =false;
			//Camera.main = camOne;
		}

		if(Input.GetKey("w")){
			Debug.Log("Using Camera B");
			camA.enabled =false;
			camB.enabled=true; 
			camC.enabled =false;
			camD.enabled =false;
			camE.enabled =false;
			camF.enabled =false;
			camG.enabled =false;
			camH.enabled =false;
			camI.enabled =false;
			camJ.enabled =false;

		}

		if(Input.GetKey("e")){
			Debug.Log("Using Camera C");
			camA.enabled =false;
			camB.enabled=false; 
			camC.enabled =true;
			camD.enabled =false;
			camE.enabled =false;
			camF.enabled =false;
			camG.enabled =false;
			camH.enabled =false;
			camI.enabled =false;
			camJ.enabled =false;

		}

		if(Input.GetKey("r")){
			Debug.Log("Using Camera D");
			camA.enabled =false;
			camB.enabled=false; 
			camC.enabled =false;
			camD.enabled =true;
			camE.enabled =false;
			camF.enabled =false;
			camG.enabled =false;
			camH.enabled =false;
			camI.enabled =false;
			camJ.enabled =false;
			
		}

		if(Input.GetKey("t")){
			Debug.Log("Using Camera E");
			camA.enabled =false;
			camB.enabled=false; 
			camC.enabled =false;
			camD.enabled =false;
			camE.enabled =true;
			camF.enabled =false;
			camG.enabled =false;
			camH.enabled =false;
			camI.enabled =false;
			camJ.enabled =false;
		}

		if(Input.GetKey("y")){
			Debug.Log("Using Camera F");
			camA.enabled =false;
			camB.enabled=false; 
			camC.enabled =false;
			camD.enabled =false;
			camE.enabled =false;
			camF.enabled =true;
			camG.enabled =false;
			camH.enabled =false;
			camI.enabled =false;
			camJ.enabled =false;
			
		}

		if(Input.GetKey("u")){
			Debug.Log("Using Camera G");
			camA.enabled =false;
			camB.enabled=false; 
			camC.enabled =false;
			camD.enabled =false;
			camE.enabled =false;
			camF.enabled =false;
			camG.enabled =true;
			camH.enabled =false;
			camI.enabled =false;
			camJ.enabled =false;
			
		}

		if(Input.GetKey("i")){
			Debug.Log("Using Camera H");
			camA.enabled =false;
			camB.enabled=false; 
			camC.enabled =false;
			camD.enabled =false;
			camE.enabled =false;
			camF.enabled =false;
			camG.enabled =false;
			camH.enabled =true;
			camI.enabled =false;
			camJ.enabled =false;
			
		}

		if(Input.GetKey("o")){
			Debug.Log("Using Camera I");
			camA.enabled =false;
			camB.enabled =false; 
			camC.enabled =false;
			camD.enabled =false;
			camE.enabled =false;
			camF.enabled =false;
			camG.enabled =false;
			camH.enabled =false;
			camI.enabled =true;
			camJ.enabled =false;
			
		}

		if(Input.GetKey("p")){
			Debug.Log("Using Camera J");
			camA.enabled =false;
			camB.enabled =false; 
			camC.enabled =false;
			camD.enabled =false;
			camE.enabled =false;
			camF.enabled =false;
			camG.enabled =false;
			camH.enabled =false;
			camI.enabled =false;
			camJ.enabled =true;
			
		}



	}
	

}