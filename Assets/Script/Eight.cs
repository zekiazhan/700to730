using UnityEngine;
using System.Collections;

public class Eight : MonoBehaviour {

	private MovieTexture movie;

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
