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

export function resizeUpTo640px(toolbar: HTMLCollectionOf<Element>, width: number) {
  const smallElements = toolbar[0].getElementsByClassName('hiddenSmallView');
  for (let i = 0; i < smallElements.length; i++) {
    const elt = smallElements[i] as HTMLElement;
    if (width < 640) {
      elt.classList.add('hidden');
    } else {
      elt.classList.remove('hidden');
    }
  }
  const visibleSmallViewElements = toolbar[0].getElementsByClassName('visibleSmallView');
  for (let i = 0; i < visibleSmallViewElements.length; i++) {
    const elt = visibleSmallViewElements[i] as HTMLElement;
    if (width < 640) {
      elt.classList.remove('hidden');
    } else {
      elt.classList.add('hidden');
    }
  }
  const toolbarButtonSpacer = toolbar[0].getElementsByClassName('toolbarButtonSpacer');
  for (let i = 0; i < toolbarButtonSpacer.length; i++) {
    const elt = toolbarButtonSpacer[i] as HTMLElement;
    if (width < 640) {
      elt.classList.add('below640px');
    } else {
      elt.classList.add('below640px');
    }
  }
  const isRtl = rtl();
  const findbar = document.getElementsByClassName('findbar');
  console.log(findbar.length);
  for (let i = 0; i < findbar.length; i++) {
    const elt = findbar[i] as HTMLElement;
    if (width < 640) {
      elt.classList.add('below640px');
      console.log('!');
    } else {
      elt.classList.add('below640px');
      console.log('!!');
    }
  }
}

export function resizeUpTo700px(toolbar: HTMLCollectionOf<Element>, width: number) {
  const mediumElements = toolbar[0].getElementsByClassName('hiddenMediumView');
  for (let i = 0; i < mediumElements.length; i++) {
    const elt = mediumElements[i] as HTMLElement;
    if (width < 700) {
      elt.classList.add('hidden');
    } else {
      elt.classList.remove('hidden');
    }
  }
  // #103
  const visibleMediumElements = toolbar[0].getElementsByClassName('visibleMediumView');
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
  const elt = document.getElementById('hiddenMediumView');
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

export function resizeUpTo770px(toolbar: HTMLCollectionOf<Element>, width: number) {
  const hiddenLargeElements = toolbar[0].getElementsByClassName('hiddenLargeView');
  for (let i = 0; i < hiddenLargeElements.length; i++) {
    const elt = hiddenLargeElements[i] as HTMLElement;
    if (width < 770) {
      elt.classList.add('hidden');
    } else {
      elt.classList.remove('hidden');
    }
  }

  const visibleLargeElements = toolbar[0].getElementsByClassName('visibleLargeView');
  for (let i = 0; i < visibleLargeElements.length; i++) {
    const elt = visibleLargeElements[i] as HTMLElement;
    if (width < 770) {
      elt.classList.remove('hidden');
    } else {
      elt.classList.add('hidden');
    }
  }
}
