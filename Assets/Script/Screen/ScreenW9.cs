using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;

public class ScreenW9 : MonoBehaviour {

	[SerializeField] GameObject screenPrefab;
	List<Screen> screenList = new List<Screen>();
	[SerializeField] KeyCode Key;



	[System.Serializable]
	public struct Movies
	{
		public List<string> movieNames;
	}

	[SerializeField] List<Movies> moviesPartList;

	[SerializeField] List<float> durationList;

	int timeIndex =  0 ;
	int partIndex = 0 ;

	void Awake()
	{
		Play();
	}

	public void Play()
	{
		SetScreen(moviesPartList[timeIndex].movieNames.Count);
		for( int i = 0 ; i < moviesPartList[timeIndex].movieNames.Count ; ++ i )
		{
			screenList[i].Play( moviesPartList[timeIndex].movieNames[i] );
		}
		StartCoroutine(checkEnding(durationList[timeIndex]));

	}

	public void OnClick()
	{
		partIndex ++;
		for(int i = 0 ; i < screenList.Count ; ++ i )
			screenList[i].getRender().material.renderQueue = 3000 + 5 * ((i==partIndex%screenList.Count)? 1:-1);
		BEventManager.Instance.PostEvent( EventDefine.W9_PRESS_BUTTON , gameObject);
	}

	
	void OnEnable() {
		BEventManager.Instance.RegisterEvent (EventDefine.W9_PRESS_BUTTON, OnButtonPress);
		
	}
	
	void OnDisable() {
		BEventManager.Instance.UnregisterEvent (EventDefine.W9_PRESS_BUTTON, OnButtonPress);
	}
	
	public void OnButtonPress(EventDefine eventName, object sender, EventArgs args)
	{
		if ( sender != gameObject )
		{
			foreach(Screen screen in screenList )
				screen.getRender().material.renderQueue = 3000 - 5;
		}
	}

	void SetScreen(int totalNumber)
	{

		if ( screenList.Count < totalNumber )
		{
			for( int i = screenList.Count ; i < totalNumber ; ++ i )
			{
				GameObject screenObj = Instantiate(screenPrefab) as GameObject;
				screenObj.transform.parent = this.transform;
				screenList.Add( screenObj.GetComponent<Screen>());
			}
		}
		for( int i = 0 ; i < screenList.Count ; ++ i )
		{
			if ( i < totalNumber )
				screenList[i].gameObject.SetActive(true);
			else
				screenList[i].gameObject.SetActive(false);
		}
	}

	
	
	IEnumerator checkEnding(float duration)
	{
		yield return new WaitForSeconds(duration);
		timeIndex ++;
		Play();
		yield break;
	}


	void Update()
	{
		if ( Input.GetKeyDown( Key ))
			OnClick();
	}
}
