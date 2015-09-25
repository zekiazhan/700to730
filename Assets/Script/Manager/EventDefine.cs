using UnityEngine;
using System.Collections;

public enum EventDefine{
	NONE = 0,
	OnLoopend,
	OnDestroy ,
	OnSwitchLevel ,
	OnMouseInHero ,
	OnMouseOutHero ,
	OnLevelStart ,


	OnStrenchHand ,
	OnShrinkHand ,
	OnMoveHand ,
	OnChangeForce,
	OnCatch ,
	OnShrinkNOUSED ,
	OnSpinFinish ,
	OnPullFinish ,
	OnRestart,


	OnMouseClick ,
	OnShowText ,
	OnTriggerable ,
	OnShowTips,
	OnShowWord,

	OnFreezen,
	OnUnfreezen,

	OnStop,
	OnBack,

	OnFrontMenuBack,
	OnFrontMenu,

	OnHurt,
	OnDead,

	OnBackClick,
	OnAfterCatch,
	OnHisCatch,

	OnBuildWall,
	OnEnterWall,

	OnSuckCigarette,
	OnSuckCigaretteFinish,

	OnFocus,
	OnUnfocus,

	OnBGMFadeOut,
	OnBGMFadeIn,

	OnDisableMoveHand,
	OnEnableMoveHand,

}