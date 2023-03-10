import { useEffect } from 'react';

export default function usePreventScroll(isPrevent: boolean) {
	return useEffect(() => {
		if (isPrevent) {
			document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
		}
		if (!isPrevent) {
			const scrollY = document.body.style.top;
			document.body.style.cssText = '';
			window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
		}
	}, [isPrevent]);
}
