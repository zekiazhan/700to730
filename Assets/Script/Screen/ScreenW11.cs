using UnityEngine;
using System.Collections;

public class ScreenW11 : Screen {
	
	[SerializeField] KeyCode key;
	[SerializeField] KeyCode traceKey;
	[SerializeField] bool isHold = false;
	[SerializeField] string filmName;

	bool isTraceDown = false;
	void Update()
	{
		if ( Input.GetKeyDown(key) )
		{
			if (! isHold )
				Play(filmName , true);
			else
			{
				if ( isTraceDown )
				{
					Play(filmName);
					SetRenderQueue(10);
				}
			}
			
		}
		
		if ( Input.GetKeyUp(key) && isHold )
		{
			SetRenderQueue(-10);
		}

		if ( Input.anyKeyDown && !Input.GetKeyDown(key) )
		{
			if ( Input.GetKeyDown(traceKey)  )
			{
				isTraceDown = true;
			}else{
				isTraceDown = false;
			}

		}
	}
}
