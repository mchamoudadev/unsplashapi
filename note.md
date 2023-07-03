window.innerHeight tells us how much of the paper (webpage) you can see on the screen. It's like the size of the window you're looking through.

window.scrollY tells us how far down you have scrolled on the paper. It's like knowing how much of the paper you have already seen.

document.body.offsetHeight tells us the height of the entire paper (webpage). It's like knowing how long the whole paper is.

When the height of what you can see (window.innerHeight) plus how much you have scrolled down (window.scrollY) is greater than or equal to the height of the whole paper (document.body.offsetHeight), it means you're near the end of the paper.