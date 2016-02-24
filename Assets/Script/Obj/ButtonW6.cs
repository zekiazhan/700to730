using UnityEngine;
using System.Collections;

public class ButtonW6 : MonoBehaviour {

	[SerializeField] string clipName;
	[SerializeField] ScreenW6 screen;

	public void StartClip () {
		Debug.Log("StartClip");
		screen.AddToList(clipName);
	}
}
