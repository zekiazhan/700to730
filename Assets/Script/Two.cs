
using UnityEngine;
using System.Collections;

//[RequireComponent (typeof(AudioSource))]


public class Two : MonoBehaviour {
	


	private MovieTexture movie;

	void Start () {
		Renderer r = GetComponent<Renderer>();
	
		movie =(MovieTexture)r.material.mainTexture;

	//GetComponent<Renderer>().material.mainTexture = movie as MovieTexture;
		//movie.Play ();

	}
	void Update(){

		/*if(Input.GetKey("3")){
			movie.Play ();
			
		}
		if(Input.GetKey("4")){
			movie.Pause ();
			
		}*/

		movie.Play ();
		movie.loop =true;
	}


	
	
}