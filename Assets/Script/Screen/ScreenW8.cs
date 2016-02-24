using UnityEngine;
using System.Collections; 
using System.Collections.Generic;

public class ScreenW8 : MonoBehaviour {

	[SerializeField] Screen[] screenList;

	[System.Serializable]
	public struct ScreenGroup
	{
		public string[] movieList;
	};

	[SerializeField] List< ScreenGroup> movieGroupList = new List<ScreenGroup>();

	int tempScreenChoice = 0;
	int tempGroupIndex = 0;

	[SerializeField] List<float> durationList;

	void Awake()
	{
		PlayAll();
		ChooseScreen(tempScreenChoice);
	}

	void PlayAll()
	{
		float duration = 0 ;
		for(int i = 0 ; i < screenList.Length ; ++ i )
		{
			duration = screenList[i].Play(movieGroupList[tempGroupIndex].movieList[i]).duration;
		}
		StartCoroutine(checkEnding(durationList[tempGroupIndex]));
	}

	public void ChooseScreen(int choice)
	{
		tempScreenChoice = choice;
		for( int i = 0 ; i < screenList.Length ; ++ i )
		{
			screenList[i].getRender().material.renderQueue = 3000 + 5 * ((choice == i) ? 1:-1 );
		}
	}


	IEnumerator checkEnding(float duration)
	{
		yield return new WaitForSeconds(duration);
		tempGroupIndex ++;
		PlayAll();
		ChooseScreen(tempScreenChoice);
		yield break;
	}

}
