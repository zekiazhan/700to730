using UnityEngine;
using System.Collections;

public class Three : MonoBehaviour {
	
	private MovieTexture movie;
	
	
	// Use this for initialization
	void Start () {
		Renderer r = GetComponent<Renderer>();
		movie =(MovieTexture)r.material.mainTexture;

	}
	
	void Update(){
		movie.Play ();
		movie.loop =true;
		
		/*if(Input.GetKey("3")){
		movie.Play ();

	}
		if(Input.GetKey("4")){
			movie.Pause ();
			
		}*/
		
	}
	
	
	
}


