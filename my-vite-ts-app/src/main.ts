function drawStars(containerId: string, stars :number) : void {
    const container = document.getElementById(containerId);
    const amount = 5;

    if (container) {
        let i = 0;

        while (i < amount) {
            const star = document.createElement('img');
            star.width = 20; // optional
            if (i < stars) {  
                star.src = 'img/star_selected.svg';
            } else {
                star.src = 'img/star_unselected.svg';
            }
            container.appendChild(star);
            i++;
        }

        container.style.display = "flex";
        container.style.gap = "10px";
    }
}

drawStars("skill_level_ps", 4);
drawStars("skill_level_aill", 3);
drawStars("skill_level_ae", 4);
drawStars("skill_level_figma", 4);
