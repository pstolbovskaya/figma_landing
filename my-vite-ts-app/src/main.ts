function drawStars(containerId: string, stars :number) : void {
    const container = document.getElementById(containerId);
    const amount = 5;

    if (container) {
        let i = 0;

        while (i < amount) {
            const star = document.createElement('img');
            star.width = 20; 
            if (i < stars) {  
                star.src = 'img/star_selected.svg';
            } else {
                star.src = 'img/star_unselected.svg';
            }
            container.appendChild(star);
            i++;
            star.id = containerId + '__star' + i;
            star.dataset.index = i.toString();
            star.style.padding = '5px';
            //setSelectionStarListener(star.id, i);
        }
        
        setContainerStarListener(containerId);
        container.style.display = "flex";
    }

}

drawStars("skill_level_ps", 4);
drawStars("skill_level_aill", 3);
drawStars("skill_level_ae", 4);
drawStars("skill_level_figma", 4);

function setSelectionStarListener(id: string, startNum: number) {
    const img = document.getElementById(id);
    const selectedSrc : string = 'img/star_selected.svg';
    const unselectedSrc : string = 'img/star_unselected.svg';
    const preId = id.slice(0, id.length-1);
    let original : Map<string, string> = new Map();

    img?.addEventListener('mouseover', () => {
        for (let i=1; i<=5; i++) {
            const selected = document.getElementById(preId+i);
            if (selected?.id && selected.getAttribute('src')) {
                original.set(selected?.id, selected?.getAttribute('src')!);
                selected?.setAttribute('src', unselectedSrc);
            }
        }
        for (let i=1; i <= startNum; i++) {
            const selected = document.getElementById(preId+i);
            selected?.setAttribute('src', selectedSrc);
        }
    });

    
    img?.addEventListener('mouseout', () => {
        
        for (let i=1; i<=5; i++) {
            const selected = document.getElementById(preId+i);
            if (selected?.id && original.has(selected?.id)) {
                selected?.setAttribute('src', original.get(selected?.id)!);
            }
        }
    });

    
    img?.addEventListener('click', () => {
        for (let i=1; i<=startNum; i++) {
            const selected = document.getElementById(preId+i);
            selected?.setAttribute('src', selectedSrc);
            if (selected?.id) {
                original.set(selected?.id, selectedSrc);
            }
        }
        for (let i=startNum+1; i<=5; i++) {
            const selected = document.getElementById(preId+i);
            selected?.setAttribute('src', unselectedSrc);
            if (selected?.id) {
                original.set(selected?.id, unselectedSrc);
            }
        }
    });
}

function setContainerStarListener(id: string) {
    const container = document.getElementById(id);
    let selectedCount = 0;
    let original : Map<string, string> = new Map();

    const selectedSrc : string = 'img/star_selected.svg';
    const unselectedSrc : string = 'img/star_unselected.svg';

    container?.addEventListener('mouseover', (ev) => {
        const star = ev.target as HTMLElement;
        if (star.tagName === 'IMG') {
            const index = parseInt(star.dataset.index || '0');
            for (let i=1; i<=5; i++) {
                const selected = document.getElementById(id+'__star'+i);
                if (selected?.id && selected.hasAttribute('src')) {
                    original.set(selected?.id, selected?.getAttribute('src')!);
                    console.log('original', Array.from(original.entries()))
                    selected?.setAttribute('src', i > index ? unselectedSrc : selectedSrc);
                }
            } 
        }
    });

    container?.addEventListener('mouseout', () => {
        for (let i=1; i<=5; i++) {
            const selected = document.getElementById(id+'__star'+i);
            if (selectedCount === 0) {
                if (selected?.id && original.has(selected?.id)) {
                    selected?.setAttribute('src', original.get(selected?.id)!);
                }
            } else {
                if (selected?.id) {
                    selected?.setAttribute('src', i > selectedCount ? unselectedSrc : selectedSrc);
                }
            }
        }
    });

    container?.addEventListener('click', (ev) => {
        const star = ev.target as HTMLElement;
        if (star.tagName === 'IMG') {
            selectedCount = parseInt(star.dataset.index || '0');
        }
    });
}