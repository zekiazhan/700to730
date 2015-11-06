susing UnityEngine;
using System.Collections;

public class ScreenW10 : Screen {

	[SerializeField] KeyCode key;
	[SerializeField] bool isHold = false;
	[SerializeField] string filmName;

	void Update()
	{
		if ( Input.GetKeyDown(key) )
		{
			if (! isHold )
				Play(filmName , true);
			else
			{
				Play(filmName);
				SetRenderQueue(10);
			}

		}

		if ( Input.GetKeyUp(key) && isHold )
		{
			SetRenderQueue(-10);
		}
	}
}
