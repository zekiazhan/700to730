using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class ScreenW6 : MonoBehaviour {

	MovieTexture movieTexture;
	List<string> movieList = new List<string>();
	[SerializeField] string defaultMovieName;

	// Use this for initialization
	void Awake () {
		PlayNext();
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void AddToList( string name )
	{

		movieList.Add( name );
		Debug.Log( "Add to list " + name );

	}

	IEnumerator moviePlayTimer()
	{
//		float timer = Time.deltaTime;
		while( movieTexture.isPlaying )
		{
//			timer += Time.deltaTime;
//			Debug.Log( timer.ToString() + " " + movieTexture.duration.ToString());
//			if ( timer > movieTexture.duration )
			{
//				PlayNext();
//				yield break;
			}
			yield return null;
		}
		PlayNext();
		yield break;
	}

	void PlayNext()
	{
		string movieName = defaultMovieName;
		if ( movieList.Count > 0 ) 
		{
			movieName = movieList[0];
			movieList.RemoveAt(0);
		}
		movieTexture = Resources.Load("TemFilms/"+movieName) as MovieTexture;
		Renderer r = this.GetComponent<Renderer>();
		r.material.mainTexture = movieTexture;

		movieTexture.Play();

		StartCoroutine(moviePlayTimer());

	}
}
