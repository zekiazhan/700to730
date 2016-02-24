using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class ScreenW5 : MonoBehaviour {

	public enum KeyType
	{
		Q,
		W,
		E,
	}

	public MovieTexture movieTexture;
	[SerializeField] AudioSource audioSource;
	int keyCounter = -1 ;
	[SerializeField] KeyType senseKey; 
	[SerializeField] List<string> filmName;
	int filmIndex = 0 ;
	[SerializeField] int playBackKeyTime = 3;
	[SerializeField] float KeySenseTime = 0.1f;
	float lastKeyTime;
	[SerializeField] ScreenW5E infoScreen;

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
			infoScreen.RecievePress(senseKey);
			if (keyCounter == -1 )
			{
				movieTexture.Play();
				keyCounter = 0;

			}else
			{
				lastKeyTime = Time.time;
				keyCounter ++;
				StartCoroutine(CheckKey());
			}
		}
	}

	void OnGUI()
	{
		if ( senseKey == KeyType.Q )
		{
			GUILayout.Label( keyCounter.ToString() );
		}
	}

	IEnumerator CheckKey () {
		yield return new WaitForSeconds(KeySenseTime);
		if ( (Time.time - lastKeyTime) > KeySenseTime )
		{
			if ( keyCounter > 0 )
			{
				Cut2NextVideo();
				keyCounter = 0;
			}

		}else
		if ( keyCounter >= playBackKeyTime )
		{
			PlaybackTempVideo();
			keyCounter = 0;
		}else if ( keyCounter > 0 ){
			Cut2NextVideo();
			keyCounter = 0;
		}
	}

	MovieTexture GetNextFilm () {
		filmIndex%=filmName.Count;

		return Resources.Load("TemFilms/" + filmName[filmIndex++] ) as MovieTexture;
	}

	void Cut2NextVideo() {
		Renderer r = GetComponent<Renderer>();
		r.material.mainTexture = GetNextFilm();
		movieTexture =  (MovieTexture)r.material.mainTexture;
		movieTexture.loop = true;
		movieTexture.Play();

		infoScreen.ChangeClip(senseKey);
	}

	void PlaybackTempVideo() {
		Debug.Log("Play back");
		movieTexture.Stop();
		audioSource.clip = movieTexture.audioClip;
		audioSource.pitch = 8.0f;
		movieTexture.Play();
		audioSource.Play();
		
		infoScreen.ChangeClip(senseKey);
	}
}
