using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class ScreenW5 : MonoBehaviour {

	enum KeyType
	{
		Q,
		W,
		E,
	}

	[SerializeField] MovieTexture movieTexture;
	int keyCounter = -1 ;
	[SerializeField] KeyType senseKey; 
	[SerializeField] float switchTime = 10f;
	[SerializeField] List<string> filmName;
	int filmIndex = 0 ;

	// Use this for initialization
	void Awake () {
		Renderer r = GetComponent<Renderer>();
		r.material.mainTexture = GetNextFilm();
		movieTexture = (MovieTexture)r.material.mainTexture;
		movieTexture.loop =true;
	}

	void Update () {
		if ( Input.GetKeyDown( senseKey.ToString().ToLower() )  )
		{
			if (keyCounter == -1 )
			{
				// initial
				movieTexture.Play();
				keyCounter = 0;
			}else
			{
				Cut2NextVideo();
			}
		}
	}

	IEnumerator AdjustSize () {
		while(true)
		{
			Cut2NextVideo();
			yield return new WaitForSeconds(switchTime);
		}
	}

	MovieTexture GetNextFilm()
	{
		filmIndex%=filmName.Count;

		return Resources.Load("TemFilms/" + filmName[filmIndex++] ) as MovieTexture;
	}

	void Cut2NextVideo() {
		Renderer r = GetComponent<Renderer>();
		r.material.mainTexture = GetNextFilm();
		movieTexture =  (MovieTexture)r.material.mainTexture;
		movieTexture.loop = true;
		movieTexture.Play();
	}
}
