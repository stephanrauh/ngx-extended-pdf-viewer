function rtl(): boolean {
  let element = document.getElementsByClassName('toolbar')[0] as HTMLElement;
  while (element) {
    if (element.dir !== '') {
      return element.dir === 'rtl';
    }
    if (!element.parentElement) {
      break;
    }
    element = element.parentElement;
  }
  return false;
}

export function resizeUpTo535px(width: number) {
  const tinyElement = document.getElementById('scaleSelectContainer');
  const tiny = tinyElement as HTMLElement;
  if (width < 535) {
    // not perfect, but good first approximation
    tiny.classList.add('hidden');
  } else {
    tiny.classList.remove('hidden');
  }
}

export function resizeUpTo640px(container: HTMLElement, width: number) {
  const smallElements = container.getElementsByClassName('hiddenSmallView');
  for (let i = 0; i < smallElements.length; i++) {
    const elt = smallElements[i] as HTMLElement;
    if (width < 640) {
      elt.classList.add('hidden');
    } else {
      elt.classList.remove('hidden');
    }
  }
  const visibleSmallViewElements = container.getElementsByClassName('visibleSmallView');
  for (let i = 0; i < visibleSmallViewElements.length; i++) {
    const elt = visibleSmallViewElements[i] as HTMLElement;
    if (width < 640) {
      elt.classList.remove('hidden');
    } else {
      elt.classList.add('hidden');
    }
  }
  const toolbarButtonSpacer = container.getElementsByClassName('toolbarButtonSpacer');
  for (let i = 0; i < toolbarButtonSpacer.length; i++) {
    const elt = toolbarButtonSpacer[i] as HTMLElement;
    if (width < 640) {
      elt.classList.add('below640px');
    } else {
      elt.classList.remove('below640px');
    }
  }
  const findbar = document.getElementsByClassName('findbar');
  console.log(findbar.length);
  for (let i = 0; i < findbar.length; i++) {
    const elt = findbar[i] as HTMLElement;
    if (width < 640) {
      elt.classList.add('below640px');
      console.log('!');
    } else {
      elt.classList.remove('below640px');
      console.log('!!');
    }
  }
}

export function resizeUpTo700px(container: HTMLElement, width: number) {
  const mediumElements = container.getElementsByClassName('hiddenMediumView');
  for (let i = 0; i < mediumElements.length; i++) {
    const elt = mediumElements[i] as HTMLElement;
    if (width < 700) {
      elt.classList.add('hidden');
    } else {
      elt.classList.remove('hidden');
    }
  }
  // #103
  const visibleMediumElements = container.getElementsByClassName('visibleMediumView');
  for (let i = 0; i < visibleMediumElements.length; i++) {
    const elt = visibleMediumElements[i] as HTMLElement;
    if (width < 700) {
      elt.classList.remove('hidden');
    } else {
      elt.classList.add('hidden');
    }
  }
}

export function resizeUpTo900px(width: number): void {
  const elt = document.getElementById('toolbarViewerMiddle');
  if (elt) {
    if (width < 900) {
      elt.classList.add('toolbarViewerMiddleBelow900px');
    } else {
      elt.classList.remove('toolbarViewerMiddleBelow900px');
    }
  }
}

export function resizeUpTo840px(width: number) {
  const elt = document.getElementsByClassName('zoom')[0];
  if (elt) {
    if (width < 840) {
      elt.classList.add('below840px');
    } else {
      elt.classList.remove('below840px');
    }
  }
}

export function resizeUpTo770px(container: HTMLElement, width: number) {
  const hiddenLargeElements = container.getElementsByClassName('hiddenLargeView');
  for (let i = 0; i < hiddenLargeElements.length; i++) {
    const elt = hiddenLargeElements[i] as HTMLElement;
    if (width < 770) {
      elt.classList.add('hidden');
    } else {
      elt.classList.remove('hidden');
    }
  }

  const visibleLargeElements = container.getElementsByClassName('visibleLargeView');
  for (let i = 0; i < visibleLargeElements.length; i++) {
    const elt = visibleLargeElements[i] as HTMLElement;
    if (width < 770) {
      elt.classList.remove('hidden');
    } else {
      elt.classList.add('hidden');
    }
  }
}
