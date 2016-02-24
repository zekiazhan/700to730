using UnityEngine;
using System.Collections;

public class ScreenW5E : MonoBehaviour {

	[SerializeField] ScreenW5[] screenList;
	int[] hotKeyRecord={0,0,0};
	int tempHot = -1 ;
	MovieTexture movieTexture;

	void Awake () {
	}

	public void RecievePress( ScreenW5.KeyType type )
	{
		hotKeyRecord[(int)type]++;
	}

	public void ChangeClip( ScreenW5.KeyType type )
	{
		if ( (int)type == tempHot )
		{
			movieTexture = screenList[tempHot].movieTexture;
			Renderer r = GetComponent<Renderer>();
			r.material.mainTexture = movieTexture;
		}
	}

	void Update () {
		CheckHotScreen();
	}

	void CheckHotScreen()
	{
		if ( GetHotest() != tempHot )
		{
			int hi = GetHotest();
			Debug.Log( "TemFilms/" + screenList[hi].movieTexture.name );
//			movieTexture = Resources.Load( "TemFilms/" + screenList[hi].movieTexture.name) as MovieTexture;
			movieTexture = screenList[hi].movieTexture;
			Renderer r = GetComponent<Renderer>();
			r.material.mainTexture = movieTexture;
			tempHot = hi;
		}
	}

	int GetHotest()
	{
		int tem = 0;
		for( int i = 0 ; i < hotKeyRecord.Length ; ++ i )
		{
			if ( hotKeyRecord[i] > hotKeyRecord[tem] )
				tem = i;
		}
		return tem;
	}
}
