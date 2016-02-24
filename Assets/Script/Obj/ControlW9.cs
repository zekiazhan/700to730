using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class ControlW9 : MonoBehaviour {

	[SerializeField] GameObject screenPrefab;
	List<ScreenW9> screenList = new List<ScreenW9>();

	[System.Serializable]
	public struct ScreenInnerGroup
	{
		public string[] movieInnerList;
	}

	[System.Serializable]
	public struct ScreenGroup
	{
		public List< ScreenInnerGroup > movieList;
	};
	
	[SerializeField] List< ScreenGroup> movieGroupList = new List<ScreenGroup>();

	int getTotalScreen(List< ScreenGroup> list , int index )
	{
		int sum = 0;
		foreach( ScreenGroup group in list )
		{
			sum += group.movieList[0].movieInnerList.Length;
		}
		return sum;
	}

	// Use this for initialization
	void Awake () {
		
	}	
	
	// Update is called once per frame
	void Update () {
	
	}

	void PlayScreen( )
	{

	}

	void SetScreen( int totalNumber )
	{
		if ( screenList.Count < totalNumber )
		{
			for( int i = screenList.Count ; i < totalNumber ; ++ i )
			{
				GameObject screenObj = Instantiate(screenPrefab) as GameObject;
				screenList.Add( screenObj.GetComponent<ScreenW9>());
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
}
