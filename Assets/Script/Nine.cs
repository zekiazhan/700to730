using UnityEngine;
using System.Collections;

public class Nine : MonoBehaviour {

	private MovieTexture movie;
	
	
	// Use this for initialization
	void Start () {
		Renderer r = GetComponent<Renderer>();
		movie =(MovieTexture)r.material.mainTexture;
		//movie.Play ();
	}
	
	void Update(){
		movie.Play ();
		movie.loop =true;
		

	}
}
