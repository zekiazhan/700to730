using UnityEngine;
using System.Collections;

public class ScreenController : MonoBehaviour {
		public GameObject cameraAA;
		public GameObject cameraBB; 
		public GameObject cameraCC; 

		Camera camAA;
		Camera camBB;
		Camera camCC;

		
		
		void Start(){
			camAA = cameraAA.GetComponent<Camera>();
			camBB = cameraBB.GetComponent <Camera>();
			camCC = cameraCC.GetComponent<Camera>();

			
			
		}
		
		void Update () {
			if(Input.GetKey("a")){
				Debug.Log("Using Camera A");
				camAA.enabled =true;
				camBB.enabled=false; 
				camCC.enabled =false;
			}
			
			if(Input.GetKey("s")){
				Debug.Log("Using Camera B");
				camAA.enabled =false;
				camBB.enabled=true; 
				camCC.enabled =false;

			}
			
			if (Input.GetKey ("d")) {
						Debug.Log ("Using Camera C");
						camAA.enabled = false;
						camBB.enabled = false; 
						camCC.enabled = true;
				}
		}
}
			