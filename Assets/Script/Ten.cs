using UnityEngine;
using System.Collections;

public class Ten : MonoBehaviour {

	private MovieTexture movie;
	
	
	// Use this for initialization
	void Start () {
		Renderer r = GetComponent<Renderer>();
		movie =(MovieTexture)r.material.mainTexture;
		
	}
	
	void Update(){
		movie.Play ();
		movie.loop =true;
		

		
	}
}
