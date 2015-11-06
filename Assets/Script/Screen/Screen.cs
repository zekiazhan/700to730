using UnityEngine;
using System.Collections;
using System;

public class Screen : MonoBehaviour {

	protected MovieTexture movieTexture;

	protected string tempMovie
	{
		get{
			return _tempMovie;
		}
	}
	string _tempMovie;


	protected virtual void OnMovieEnd()
	{
		//do nothing
	}

	IEnumerator moviePlayTimer()
	{
		//		float timer = Time.deltaTime;
		while( movieTexture.isPlaying )
		{
			yield return null;
		}
		OnMovieEnd();
		yield break;
	}

	
	
	void OnEnable() {
		BEventManager.Instance.RegisterEvent (EventDefine.CLOSE_OTHER_SCREEN, CloseOtherScreen);
		
	}
	
	void OnDisable() {
		BEventManager.Instance.UnregisterEvent (EventDefine.W9_PRESS_BUTTON, CloseOtherScreen);
	}

	
	public void CloseOtherScreen(EventDefine eventName, object sender, EventArgs args)
	{
		if ( sender != this )
		{
			SetRenderQueue(-5);
		}
	}

	public MovieTexture Play(string movieName , bool ifCloseOther = false , bool isPlay = true , bool isLoop = false )
	{
		_tempMovie = movieName;
		movieTexture = Resources.Load("TemFilms/"+movieName) as MovieTexture;
		Renderer r = this.GetComponent<Renderer>();
		r.material.mainTexture = movieTexture;
		
		movieTexture.loop = isLoop;
		if ( isPlay )
			movieTexture.Play();

		StartCoroutine(moviePlayTimer());   

		
		if ( ifCloseOther )
		{
			ShowThisHideOther();
		}

		return movieTexture;
	}

	public void ShowThisHideOther()
	{
		SetRenderQueue(5);
		BEventManager.Instance.PostEvent(EventDefine.CLOSE_OTHER_SCREEN , this );

	}

	public Renderer getRender()
	{
		return this.GetComponent<Renderer>();
	 }

	public void SetRenderQueue( int diff )
	{
		getRender().material.renderQueue = 3000 + diff; 
	}
}
