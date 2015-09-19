using UnityEngine;
using System.Collections;






//[RequireComponent (typeof(AudioSource))]


public class One : MonoBehaviour {

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

		/*if(Input.GetKey("3")){
		movie.Play ();

	}
		if(Input.GetKey("4")){
			movie.Pause ();
			
		}*/

	}

		
		
	}


