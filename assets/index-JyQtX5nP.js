(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`dragon-tears`,name:`Dragon Tears`,icon:`dragon-tears`,temperature:25,density:8,magicPower:10},{id:`fairy-dust`,name:`Fairy Dust`,icon:`fairy-dust`,temperature:12,density:9,magicPower:12},{id:`frost-lotus`,name:`Frost Lotus`,icon:`frost-lotus`,temperature:-18,density:4,magicPower:14},{id:`mandrake-root`,name:`Mandrake Root`,icon:`mandrake-root`,temperature:-5,density:20,magicPower:8},{id:`caustic-acid`,name:`Caustic Acid`,icon:`caustic-acid`,temperature:10,density:14,magicPower:22},{id:`essence-of-the-void`,name:`Essence of the Void`,icon:`essence-of-the-void`,temperature:-20,density:-10,magicPower:40},{id:`phoenix-feather`,name:`Phoenix Feather`,icon:`phoenix-feather`,temperature:50,density:-10,magicPower:30},{id:`toad-slime`,name:`Toad Slime`,icon:`toad-slime`,temperature:5,density:30,magicPower:0}],t=[{id:`easy-moon-mist`,name:`Moon Mist`,difficulty:`easy`,temperature:{min:32,max:42},density:{min:12,max:22},magicPower:{min:17,max:27}},{id:`easy-root-bloom`,name:`Root Bloom`,difficulty:`easy`,temperature:{min:2,max:12},density:{min:24,max:34},magicPower:{min:15,max:25}},{id:`easy-frost-steam`,name:`Frost Steam`,difficulty:`easy`,temperature:{min:2,max:12},density:{min:7,max:17},magicPower:{min:19,max:29}},{id:`easy-quiet-swirl`,name:`Quiet Swirl`,difficulty:`easy`,temperature:{min:-28,max:-18},density:{min:19,max:29},magicPower:{min:17,max:27}},{id:`easy-bright-dew`,name:`Bright Dew`,difficulty:`easy`,temperature:{min:27,max:37},density:{min:32,max:42},magicPower:{min:25,max:35}},{id:`easy-snow-dust`,name:`Snow Dust`,difficulty:`easy`,temperature:{min:-16,max:-6},density:{min:28,max:38},magicPower:{min:29,max:39}},{id:`med-acid-spark`,name:`Acid Spark`,difficulty:`medium`,temperature:{min:17,max:27},density:{min:18,max:28},magicPower:{min:29,max:39}},{id:`med-void-ember`,name:`Void Ember`,difficulty:`medium`,temperature:{min:0,max:10},density:{min:0,max:10},magicPower:{min:45,max:55}},{id:`med-heavy-acid`,name:`Heavy Acid`,difficulty:`medium`,temperature:{min:0,max:10},density:{min:29,max:39},magicPower:{min:25,max:35}},{id:`med-frost-acid`,name:`Frost Acid`,difficulty:`medium`,temperature:{min:-13,max:-3},density:{min:13,max:23},magicPower:{min:31,max:41}},{id:`med-dusty-void`,name:`Dusty Void`,difficulty:`medium`,temperature:{min:-13,max:-3},density:{min:0,max:10},magicPower:{min:47,max:57}},{id:`med-dragon-void`,name:`Dragon Void`,difficulty:`medium`,temperature:{min:25,max:35},density:{min:1,max:11},magicPower:{min:55,max:65}},{id:`med-rooted-night`,name:`Rooted Night`,difficulty:`medium`,temperature:{min:-18,max:-8},density:{min:14,max:24},magicPower:{min:55,max:65}},{id:`hard-phoenix-pulse`,name:`Phoenix Pulse`,difficulty:`hard`,temperature:{min:57,max:67},density:{min:0,max:10},magicPower:{min:37,max:47}},{id:`hard-slime-crown`,name:`Slime Crown`,difficulty:`hard`,temperature:{min:-5,max:5},density:{min:45,max:55},magicPower:{min:3,max:13}},{id:`hard-void-flame`,name:`Void Flame`,difficulty:`hard`,temperature:{min:25,max:35},density:{min:0,max:10},magicPower:{min:60,max:70}},{id:`hard-acid-bog`,name:`Acid Bog`,difficulty:`hard`,temperature:{min:10,max:20},density:{min:39,max:49},magicPower:{min:17,max:27}},{id:`hard-frozen-ash`,name:`Frozen Ash`,difficulty:`hard`,temperature:{min:27,max:37},density:{min:0,max:10},magicPower:{min:39,max:49}},{id:`hard-triple-eclipse`,name:`Triple Eclipse`,difficulty:`hard`,temperature:{min:-20,max:-10},density:{min:19,max:29},magicPower:{min:60,max:70}},{id:`hard-ember-soup`,name:`Ember Soup`,difficulty:`hard`,temperature:{min:62,max:72},density:{min:24,max:34},magicPower:{min:37,max:47}}];function n(e){return t.filter(t=>t.difficulty===e)}function r(t=6){let n={};return e.slice(0,t).forEach(e=>{let t=Math.floor(Math.random()*14)+2;n[e.id]=t}),n}var i=(e,t)=>e.some(e=>e.id===t),a=[{id:`bubbling`,name:`Bubbling`,type:`ingredients`,isActive:e=>i(e,`fairy-dust`)&&i(e,`caustic-acid`),apply:(e,t)=>(e.magicPower+=Math.round(e.magicPower*.5),t&&(t.timeLeft=Math.max(0,t.timeLeft-10)),e)},{id:`volatile-mix`,name:`Volatile Mix`,type:`ingredients`,isActive:e=>i(e,`phoenix-feather`)&&i(e,`essence-of-the-void`),apply:(e,t)=>(t&&(t.lives=Math.max(0,t.lives-1),t.cauldronIngredients=[]),e)},{id:`solar-frost`,name:`Solar Frost`,type:`ingredients`,isActive:e=>i(e,`dragon-tears`)&&i(e,`frost-lotus`),apply:e=>(e.temperature=0,e.density+=Math.round(e.density*.2),e)},{id:`rooted-steam`,name:`Rooted Steam`,type:`ingredients`,isActive:e=>i(e,`mandrake-root`)&&i(e,`toad-slime`),apply:e=>(e.density+=Math.round(e.density*.25),e.magicPower-=Math.round(e.magicPower*.1),e)},{id:`ashen-bloom`,name:`Ashen Bloom`,type:`ingredients`,isActive:e=>i(e,`phoenix-feather`)&&i(e,`fairy-dust`),apply:e=>(e.temperature+=10,e.magicPower+=Math.round(e.magicPower*.25),e)},{id:`annihilation`,name:`Annihilation`,type:`stats`,isActive:e=>e.some(e=>e.temperature>15)&&e.some(e=>e.temperature<-15),apply:e=>(e.temperature=0,e.density*=2,e)},{id:`pressure-spike`,name:`Pressure Spike`,type:`stats`,isActive:(e,t)=>t.density>=70,apply:e=>(e.density=70,e.magicPower+=Math.round(e.magicPower*.1),e)},{id:`magma-flux`,name:`Magma Flux`,type:`stats`,isActive:(e,t)=>t.temperature>=60,apply:e=>(e.magicPower+=Math.round(e.magicPower*.2),e.density-=Math.round(e.density*.1),e)},{id:`deep-freeze`,name:`Deep Freeze`,type:`stats`,isActive:(e,t)=>t.temperature<=-20,apply:e=>(e.density+=Math.round(e.density*.15),e.magicPower-=Math.round(e.magicPower*.15),e)},{id:`arcane-saturation`,name:`Arcane Saturation`,type:`stats`,isActive:(e,t)=>t.magicPower>=80,apply:e=>(e.magicPower=80,e.temperature+=5,e)},{id:`steam-burst`,name:`Steam Burst`,type:`mix`,isActive:(e,t)=>i(e,`dragon-tears`)&&i(e,`caustic-acid`)&&t.temperature>=35,apply:(e,t)=>(e.temperature+=10,t&&(t.timeLeft=Math.max(0,t.timeLeft-5)),e)},{id:`black-ice`,name:`Black Ice`,type:`mix`,isActive:(e,t)=>i(e,`frost-lotus`)&&i(e,`essence-of-the-void`)&&t.density<=0,apply:e=>(e.temperature-=10,e.magicPower+=Math.round(e.magicPower*.2),e)},{id:`heavy-spark`,name:`Heavy Spark`,type:`mix`,isActive:(e,t)=>i(e,`fairy-dust`)&&i(e,`toad-slime`)&&t.density>=40,apply:e=>(e.density+=Math.round(e.density*.2),e.magicPower+=Math.round(e.magicPower*.1),e)},{id:`burning-root`,name:`Burning Root`,type:`mix`,isActive:(e,t)=>i(e,`mandrake-root`)&&i(e,`phoenix-feather`)&&t.temperature>=40,apply:e=>(e.temperature+=15,e.density-=Math.round(e.density*.1),e)},{id:`void-resonance`,name:`Void Resonance`,type:`mix`,isActive:(e,t)=>i(e,`essence-of-the-void`)&&i(e,`dragon-tears`)&&t.magicPower>=50,apply:e=>(e.magicPower+=Math.round(e.magicPower*.3),e.temperature-=5,e)}],o={easy:{name:`easy`,label:`Easy`,shelfIngredientsCount:4,maxCauldronIngredients:4,startTime:180,tolerance:12,lives:5,scorePerBrew:100,timeBonusPerBrew:15,reactionsCount:0},medium:{name:`medium`,label:`Medium`,shelfIngredientsCount:6,maxCauldronIngredients:4,startTime:150,tolerance:8,lives:3,scorePerBrew:200,timeBonusPerBrew:10,reactionsCount:2},hard:{name:`hard`,label:`Hard`,shelfIngredientsCount:8,maxCauldronIngredients:5,startTime:150,tolerance:5,lives:3,scorePerBrew:300,timeBonusPerBrew:5,reactionsCount:3}};function s(e,t=`medium`){let n=t||`medium`,r=e.reduce((e,t)=>({temperature:e.temperature+t.temperature,density:e.density+t.density,magicPower:e.magicPower+t.magicPower}),{temperature:0,density:0,magicPower:0}),i=o[n]||o.medium,s=a.slice(0,i.reactionsCount),c={...r};for(let t of s)t.isActive(e,c)&&(c=t.apply(c,null));return c}var c=`alchemists_cauldron_save`;function l(e){if(!e||typeof e!=`object`)return!1;let t=e;return typeof t.score==`number`&&typeof t.timeLeft==`number`&&typeof t.lives==`number`&&typeof t.difficulty==`string`&&t.activeRecipe!==void 0&&Array.isArray(t.cauldronIngredients)&&typeof t.shelfStock==`object`&&t.shelfStock!==null&&(t.status===`playing`||t.status===`paused`)}function u(e){try{e.status===`playing`||e.status===`paused`?localStorage.setItem(c,JSON.stringify(e)):f()}catch(e){console.error(`Failed to save game state:`,e)}}function d(){try{let e=localStorage.getItem(c);if(!e)return null;let t=JSON.parse(e);return l(t)?t:(f(),null)}catch(e){return console.error(`Failed to load save, clearing corrupted data:`,e),f(),null}}function f(){try{localStorage.removeItem(c)}catch(e){console.error(`Failed to clear save:`,e)}}function p(e){let t=n(e);return t[Math.floor(Math.random()*t.length)]}var m=new class{state={status:`menu`,score:0,timeLeft:150,lives:3,difficulty:`medium`,activeRecipe:p(`medium`),cauldronIngredients:[],shelfStock:r(6),gameOverReason:void 0};listeners=[];timerInterval=null;endTime=Date.now()+15e4;leaderboardFrom=`menu`;scoreSubmitted=!1;constructor(){document.addEventListener(`visibilitychange`,()=>{document.hidden&&this.state.status===`playing`&&this.pauseGame()})}getState(){return this.state}subscribe(e){this.listeners.push(e)}notify(){u(this.state),this.listeners.forEach(e=>e(this.state))}startTimer(){this.endTime=Date.now()+this.state.timeLeft*1e3,this.timerInterval&&clearInterval(this.timerInterval),this.timerInterval=window.setInterval(()=>{if(this.state.status!==`playing`)return;let e=this.endTime-Date.now(),t=Math.max(0,Math.ceil(e/1e3)),n=this.state.timeLeft!==t;this.state.timeLeft=t,this.state.timeLeft<=0?this.endGame(`Time's up!`):this.state.lives<=0?this.endGame(`Out of lives!`):this.checkOutOfIngredients()?this.endGame(`Out of ingredients!`):n&&this.notify()},250)}checkOutOfIngredients(){return Object.values(this.state.shelfStock).reduce((e,t)=>e+t,0)===0&&this.state.cauldronIngredients.length===0}startGame(t=`medium`){f(),this.scoreSubmitted=!1;let n=o[t],i=e.slice(0,n.shelfIngredientsCount);this.state={status:`playing`,score:0,timeLeft:n.startTime,lives:n.lives,difficulty:t,activeRecipe:p(t),cauldronIngredients:[],shelfStock:r(i.length),gameOverReason:void 0},this.startTimer(),this.notify()}continueGame(){let e=d();return e?(this.scoreSubmitted=!1,this.state={...e,status:`paused`},this.notify(),!0):!1}resetGame(){this.startGame(this.state.difficulty||`medium`)}openLeaderboard(e=`menu`){this.leaderboardFrom=e,this.state.status=`leaderboard`,this.notify()}closeLeaderboard(){this.state.status=this.leaderboardFrom,this.notify()}isScoreSubmitted(){return this.scoreSubmitted}markScoreSubmitted(){this.scoreSubmitted=!0,this.notify()}pauseGame(){this.state.status===`playing`&&(this.state.status=`paused`,this.timerInterval&&clearInterval(this.timerInterval),this.notify())}resumeGame(){this.state.status===`paused`&&(this.state.status=`playing`,this.endTime=Date.now()+this.state.timeLeft*1e3,this.startTimer(),this.notify())}exitToMenu(){f(),this.state.status=`menu`,this.timerInterval&&clearInterval(this.timerInterval),this.notify()}endGame(e){f(),this.state.status=`game-over`,this.state.gameOverReason=e,this.timerInterval&&clearInterval(this.timerInterval),this.notify()}addIngredientToCauldron(t){if(this.state.status!==`playing`)return!1;let n=this.state.difficulty||`medium`,r=o[n];if(this.state.cauldronIngredients.length>=r.maxCauldronIngredients)return!1;let i=this.state.shelfStock[t]??0;if(i<=0)return!1;let c=e.slice(0,r.shelfIngredientsCount).find(e=>e.id===t);if(!c)return!1;let l=[...this.state.cauldronIngredients],u=s(l,n),d=[...l,c],f=s(d,n),p=a.slice(0,r.reactionsCount).filter(e=>{let t=e.isActive(l,u),n=e.isActive(d,f);return!t&&n});this.state.shelfStock[t]=i-1,this.state.cauldronIngredients=d;for(let e of p)e.apply(f,this.state);return this.state.lives<=0?(this.endGame(`Out of lives!`),!0):(this.notify(),!0)}pourOut(){return this.state.status!==`playing`||this.state.cauldronIngredients.length===0?!1:(this.state.cauldronIngredients=[],this.state.timeLeft=Math.max(0,this.state.timeLeft-10),this.endTime=Date.now()+this.state.timeLeft*1e3,this.notify(),!0)}brew(){if(this.state.status!==`playing`||this.state.cauldronIngredients.length===0)return!1;let e=this.state.difficulty||`medium`,t=o[e],n=s(this.state.cauldronIngredients,e),r=this.state.activeRecipe,i=t.tolerance,a=n.temperature>=r.temperature.min-i&&n.temperature<=r.temperature.max+i,c=n.density>=r.density.min-i&&n.density<=r.density.max+i,l=n.magicPower>=r.magicPower.min-i&&n.magicPower<=r.magicPower.max+i,u=a&&c&&l;return this.state.lastBrewResult=u?`success`:`failure`,u?(this.state.score+=t.scorePerBrew,this.state.timeLeft=Math.min(t.startTime,this.state.timeLeft+t.timeBonusPerBrew),this.endTime=Date.now()+this.state.timeLeft*1e3,this.state.activeRecipe=p(e)):(--this.state.lives,this.state.lives<=0&&this.endGame(`Out of lives!`)),this.state.cauldronIngredients=[],this.notify(),u}},h=e=>`data:image/svg+xml;utf8,${encodeURIComponent(e.trim())}`,g={"dragon-tears":h(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dt-glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#93c5fd" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.95"/>
        </linearGradient>
        <linearGradient id="dt-liquid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#60a5fa"/>
          <stop offset="100%" stop-color="#2563eb"/>
        </linearGradient>
      </defs>
      <rect x="20" y="6" width="8" height="5" rx="1" fill="#78350f" stroke="#451a03" stroke-width="1"/>
      <path d="M19 11 h10 v2 h-10 z" fill="#b45309"/>
      <path d="M20 13 h8 v7 c4 2, 7 6, 7 12 a 10 10 0 0 1 -20 0 c0 -6, 3 -10, 5 -12 v-7 z" fill="url(#dt-glass)" stroke="#bfdbfe" stroke-width="1.5"/>
      <path d="M17 25 c3 -1, 7 1, 14 0 c2 3, 3 6, 3 7 a 9 9 0 0 1 -18 0 c0 -2, 0 -5, 1 -7 z" fill="url(#dt-liquid)" opacity="0.85"/>
      <circle cx="21" cy="31" r="1.5" fill="#eff6ff" opacity="0.8"/>
      <circle cx="26" cy="34" r="1" fill="#eff6ff" opacity="0.8"/>
      <path d="M21 16 a 3 8 0 0 0 2 6" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
    </svg>
  `),"fairy-dust":h(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fd-glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f5d0fe" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#7e22ce" stop-opacity="0.9"/>
        </linearGradient>
      </defs>
      <ellipse cx="24" cy="9" rx="5" ry="2" fill="#d97706"/>
      <rect x="19" y="9" width="10" height="4" rx="1" fill="#b45309" stroke="#78350f" stroke-width="1"/>
      <path d="M19 13 h10 l2 5 c2 3, 3 6, 3 10 a 11 11 0 0 1 -22 0 c0 -4, 1 -7, 3 -10 l2 -5 z" fill="url(#fd-glass)" stroke="#e879f9" stroke-width="1.5"/>
      <circle cx="24" cy="27" r="6" fill="#c084fc" opacity="0.6"/>
      <path d="M24 20 l1 3 3 1 -3 1 -1 3 -1 -3 -3 -1 3 -1 z" fill="#fef08a"/>
      <path d="M18 30 l0.5 1.5 1.5 0.5 -1.5 0.5 -0.5 1.5 -0.5 -1.5 -1.5 -0.5 1.5 -0.5 z" fill="#fef08a"/>
      <path d="M30 25 l0.5 1.5 1.5 0.5 -1.5 0.5 -0.5 1.5 -0.5 -1.5 -1.5 -0.5 1.5 -0.5 z" fill="#fef08a"/>
    </svg>
  `),"frost-lotus":h(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fl-ice" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e0f2fe"/>
          <stop offset="50%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#0284c7"/>
        </linearGradient>
      </defs>
      <path d="M24 8 C20 18, 12 22, 12 32 C12 38, 18 42, 24 42 C30 42, 36 38, 36 32 C36 22, 28 18, 24 8 Z" fill="url(#fl-ice)" stroke="#bae6fd" stroke-width="1.5"/>
      <path d="M24 16 C21 23, 16 26, 16 33 C16 37, 19 40, 24 40 C29 40, 32 37, 32 33 C32 26, 27 23, 24 16 Z" fill="#7dd3fc" opacity="0.7"/>
      <path d="M24 22 C22 26, 19 28, 19 33 C19 36, 21 38, 24 38 C27 38, 29 36, 29 33 C29 28, 26 26, 24 22 Z" fill="#ffffff" opacity="0.9"/>
      <circle cx="24" cy="33" r="2" fill="#0284c7"/>
    </svg>
  `),"mandrake-root":h(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mr-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#84cc16"/>
          <stop offset="100%" stop-color="#365314"/>
        </linearGradient>
      </defs>
      <path d="M24 18 Q 14 10, 10 14 Q 14 20, 24 20 Z" fill="#22c55e" stroke="#14532d" stroke-width="1"/>
      <path d="M24 18 Q 34 10, 38 14 Q 34 20, 24 20 Z" fill="#22c55e" stroke="#14532d" stroke-width="1"/>
      <path d="M24 18 Q 24 8, 24 12 Q 24 16, 24 20 Z" fill="#16a34a"/>
      <path d="M19 18 c-3 4, -4 10, -2 16 c1 3, -3 8, -5 10 c3 0, 6 -4, 7 -7 c1 4, 3 7, 6 7 c3 0, 5 -3, 6 -7 c1 3, 4 7, 7 7 c-2 -2, -6 -7, -5 -10 c2 -6, 1 -12, -2 -16 z" fill="url(#mr-body)" stroke="#1a2e05" stroke-width="1.5"/>
      <circle cx="21" cy="24" r="1.2" fill="#000"/>
      <circle cx="27" cy="24" r="1.2" fill="#000"/>
      <path d="M23 28 q1 1 2 0" stroke="#000" stroke-width="1" stroke-linecap="round" fill="none"/>
    </svg>
  `),"mandragora-root":h(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mr2-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#84cc16"/>
          <stop offset="100%" stop-color="#365314"/>
        </linearGradient>
      </defs>
      <path d="M24 18 Q 14 10, 10 14 Q 14 20, 24 20 Z" fill="#22c55e" stroke="#14532d" stroke-width="1"/>
      <path d="M24 18 Q 34 10, 38 14 Q 34 20, 24 20 Z" fill="#22c55e" stroke="#14532d" stroke-width="1"/>
      <path d="M24 18 Q 24 8, 24 12 Q 24 16, 24 20 Z" fill="#16a34a"/>
      <path d="M19 18 c-3 4, -4 10, -2 16 c1 3, -3 8, -5 10 c3 0, 6 -4, 7 -7 c1 4, 3 7, 6 7 c3 0, 5 -3, 6 -7 c1 3, 4 7, 7 7 c-2 -2, -6 -7, -5 -10 c2 -6, 1 -12, -2 -16 z" fill="url(#mr2-body)" stroke="#1a2e05" stroke-width="1.5"/>
      <circle cx="21" cy="24" r="1.2" fill="#000"/>
      <circle cx="27" cy="24" r="1.2" fill="#000"/>
      <path d="M23 28 q1 1 2 0" stroke="#000" stroke-width="1" stroke-linecap="round" fill="none"/>
    </svg>
  `),"caustic-acid":h(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ca-liquid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#a3e635"/>
          <stop offset="100%" stop-color="#4d7c0f"/>
        </linearGradient>
      </defs>
      <rect x="21" y="6" width="6" height="6" fill="#78350f" stroke="#451a03" stroke-width="1"/>
      <path d="M20 12 h8 l7 18 a 9 9 0 0 1 -7 12 h-8 a 9 9 0 0 1 -7 -12 l7 -18 z" fill="#1e293b" stroke="#84cc16" stroke-width="1.5" opacity="0.85"/>
      <path d="M17 28 c2 -1, 5 1, 14 0 c1 3, 2 5, 2 7 a 7 7 0 0 1 -7 7 h-4 a 7 7 0 0 1 -7 -7 c0 -2, 1 -4, 2 -7 z" fill="url(#ca-liquid)"/>
      <circle cx="21" cy="33" r="1.5" fill="#ecfccb"/>
      <circle cx="27" cy="31" r="1.2" fill="#ecfccb"/>
      <circle cx="24" cy="36" r="1.8" fill="#ecfccb"/>
    </svg>
  `),"essence-of-the-void":h(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ev-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#c084fc"/>
          <stop offset="60%" stop-color="#581c87"/>
          <stop offset="100%" stop-color="#090514"/>
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="17" fill="url(#ev-glow)" stroke="#a855f7" stroke-width="1.5"/>
      <path d="M24 11 A 13 13 0 0 0 11 24" stroke="#e9d5ff" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.8"/>
      <circle cx="24" cy="24" r="7" fill="#000" stroke="#d8b4fe" stroke-width="1"/>
      <circle cx="24" cy="24" r="2.5" fill="#fdf4ff"/>
      <path d="M15 15 l1 2 2 1 -2 1 -1 2 -1 -2 -2 -1 2 -1 z" fill="#e879f9" opacity="0.9"/>
      <path d="M31 31 l0.8 1.5 1.5 0.8 -1.5 0.8 -0.8 1.5 -0.8 -1.5 -1.5 -0.8 1.5 -0.8 z" fill="#e879f9" opacity="0.9"/>
    </svg>
  `),"phoenix-feather":h(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pf-fire" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ea580c"/>
          <stop offset="50%" stop-color="#f97316"/>
          <stop offset="100%" stop-color="#facc15"/>
        </linearGradient>
      </defs>
      <path d="M12 40 C14 34, 18 20, 36 8 C36 18, 30 30, 16 38 Z" fill="url(#pf-fire)" stroke="#fdba74" stroke-width="1.5"/>
      <path d="M10 42 Q 22 28, 38 6" stroke="#fef08a" stroke-width="2" stroke-linecap="round" fill="none"/>
      <path d="M16 32 L 22 29 M 20 25 L 27 22 M 25 18 L 32 15" stroke="#fef08a" stroke-width="1.2" stroke-linecap="round"/>
    </svg>
  `),"toad-slime":h(`
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ts-slime" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#4ade80"/>
          <stop offset="100%" stop-color="#15803d"/>
        </linearGradient>
      </defs>
      <ellipse cx="24" cy="34" rx="14" ry="7" fill="#14532d"/>
      <path d="M24 10 C18 18, 12 24, 12 32 A 12 10 0 0 0 36 32 C36 24, 30 18, 24 10 Z" fill="url(#ts-slime)" stroke="#86efac" stroke-width="1.5"/>
      <ellipse cx="20" cy="28" rx="2" ry="3" fill="#bbf7d0" opacity="0.8"/>
      <ellipse cx="28" cy="31" rx="1.5" ry="2" fill="#bbf7d0" opacity="0.8"/>
      <circle cx="23" cy="20" r="1.5" fill="#f0fdf4" opacity="0.9"/>
    </svg>
  `)};function _(t){let n=o[m.getState().difficulty||`medium`];t.innerHTML=`
    <div class="shelf-panel">
      <h3>Ingredients</h3>
      <div class="shelf-cards">
        ${e.slice(0,n.shelfIngredientsCount).map(e=>{let t=g[e.id]||``,n=e.temperature>=0?`+${e.temperature}`:`−${Math.abs(e.temperature)}`,r=e.density>=0?`+${e.density}`:`−${Math.abs(e.density)}`,i=e.magicPower>=0?`+${e.magicPower}`:`−${Math.abs(e.magicPower)}`;return`
        <button class="ingredient-card" data-id="${e.id}" draggable="true">
          <span class="icon">
            ${t?`<img src="${t}" alt="${e.name}" width="36" height="36" />`:``}
          </span>
          <div class="info">
            <span class="name">${e.name}</span>
          </div>
          <span class="badge"></span>
          <div class="ingredient-tooltip">
            <div class="tooltip-row">Temp: ${n}</div>
            <div class="tooltip-row">Density: ${r}</div>
            <div class="tooltip-row">Magic: ${i}</div>
          </div>
        </button>
      `}).join(``)}
      </div>
    </div>
  `;let r=t.querySelector(`.shelf-cards`);r&&(r.addEventListener(`dragstart`,e=>{let t=e;if(m.getState().status!==`playing`){t.preventDefault();return}let n=t.target.closest(`.ingredient-card`);if(!n||n.disabled){t.preventDefault();return}let r=n.dataset.id;r&&t.dataTransfer&&(t.dataTransfer.setData(`text/plain`,r),t.dataTransfer.effectAllowed=`copy`)}),r.addEventListener(`click`,e=>{let t=e.target.closest(`.ingredient-card`);if(!t||t.disabled)return;let n=t.dataset.id;n&&m.addIngredientToCauldron(n)}),r.addEventListener(`mouseenter`,e=>{let t=e.target.closest(`.ingredient-card`);if(!t)return;let n=t.querySelector(`.ingredient-tooltip`);if(!n)return;n.classList.remove(`tooltip--left`,`tooltip--up`);let r=t.getBoundingClientRect();r.right+150>window.innerWidth&&n.classList.add(`tooltip--left`),r.bottom+90>window.innerHeight&&n.classList.add(`tooltip--up`)},!0))}function v(e){let t=m.getState(),n=o[t.difficulty||`medium`],r=e.querySelectorAll(`.ingredient-card`);(!e.querySelector(`.shelf-panel`)||r.length!==n.shelfIngredientsCount)&&_(e);let i=e.querySelector(`.shelf-panel`);i&&i.classList.toggle(`paused`,t.status===`paused`);let a=t.cauldronIngredients.length>=n.maxCauldronIngredients;e.querySelectorAll(`.ingredient-card`).forEach(e=>{let n=e.dataset.id,r=t.shelfStock[n]??0,i=r<=0,o=i||a;e.disabled!==o&&(e.disabled=o),e.classList.toggle(`empty`,i),e.classList.toggle(`disabled`,o);let s=e.querySelector(`.badge`),c=String(r);s.textContent!==c&&(s.textContent=c);let l=e.querySelector(`img`);l&&(l.style.visibility=i?`hidden`:`visible`)})}function y(e){let t=m.getState(),n=o[t.difficulty||`medium`].maxCauldronIngredients,r=t.cauldronIngredients,i=r.length===0,a=t.lastBrewResult,s=Array.from({length:n}).map((e,t)=>{let n=r[t];if(n){let e=g[n.id]||``;return`
          <div class="cauldron-slot filled" title="${n.name}">
            ${e?`<img src="${e}" alt="${n.name}" width="38" height="38" class="floating-icon" />`:``}
          </div>
        `}return`<div class="cauldron-slot empty"></div>`}).join(``),c=``;a===`success`&&(c=`brew-success-anim`),a===`failure`&&(c=`brew-failure-anim`),e.innerHTML=`
    <div class="cauldron-container ${c}" id="cauldron-drop-zone">
      <div class="cauldron-body">
        <div class="cauldron-header">
          <h3>Cauldron</h3>
          <span class="cauldron-counter">${r.length} / ${n}</span>
        </div>
        <div class="cauldron-slots">
          ${s}
        </div>
        <div class="cauldron-actions" style="margin-top: 10px; text-align: center;">
          <button class="pour-out-btn" id="pour-out-btn" ${i?`disabled`:``}>
            Pour Out (-10s)
          </button>
        </div>
      </div>
    </div>
  `;let l=e.querySelector(`#cauldron-drop-zone`);l&&a&&l.addEventListener(`animationend`,()=>{delete t.lastBrewResult},{once:!0});let u=e.querySelector(`#pour-out-btn`);u&&u.addEventListener(`click`,()=>{m.pourOut()});let d=e.querySelector(`#cauldron-drop-zone`);d&&(d.addEventListener(`dragover`,e=>{let t=e;t.preventDefault();let n=m.getState(),r=o[n.difficulty||`medium`];n.status!==`playing`||n.cauldronIngredients.length>=r.maxCauldronIngredients?t.dataTransfer&&(t.dataTransfer.dropEffect=`none`):(t.dataTransfer&&(t.dataTransfer.dropEffect=`copy`),d.classList.add(`drag-over`))}),d.addEventListener(`dragleave`,()=>{d.classList.remove(`drag-over`)}),d.addEventListener(`drop`,e=>{let t=e;if(t.preventDefault(),d.classList.remove(`drag-over`),m.getState().status!==`playing`)return;let n=t.dataTransfer?.getData(`text/plain`);n&&m.addIngredientToCauldron(n)}))}function b(e){e.innerHTML=`
    <div class="bars-panel">
      <h3>Cauldron Parameters</h3>
      
      <!-- Temperature Bar -->
      <div class="bar-row">
        <label>Temperature: <span data-value="temp">0</span></label>
        <div class="progress-bar-container" data-bar="temp">
          <div class="target-zone" data-zone="temp"></div>
          <div class="center-line"></div>
          <div class="marker" data-marker="temp"></div>
        </div>
      </div>

      <!-- Density Bar -->
      <div class="bar-row">
        <label>Density: <span data-value="density">0</span></label>
        <div class="progress-bar-container" data-bar="density">
          <div class="target-zone" data-zone="density"></div>
          <div class="center-line"></div>
          <div class="marker" data-marker="density"></div>
        </div>
      </div>

      <!-- Magic Power Bar -->
      <div class="bar-row">
        <label>Magic Power: <span data-value="magic">0</span></label>
        <div class="progress-bar-container" data-bar="magic">
          <div class="target-zone" data-zone="magic"></div>
          <div class="center-line" style="left: 0%;"></div>
          <div class="marker" data-marker="magic"></div>
        </div>
      </div>
    </div>
  `}function x(e){e.querySelector(`.bars-panel`)||b(e);let t=m.getState(),n=s(t.cauldronIngredients),r=t.activeRecipe,i=(e,t=-50,n=100)=>(Math.max(t,Math.min(n,e))-t)/(n-t)*100,a=(e,t,n=-50,r=100)=>{let a=i(e,n,r);return{left:a,width:i(t,n,r)-a}},o={min:-50,max:100},c={min:-30,max:60},l={min:0,max:80},u=a(r.temperature.min,r.temperature.max,o.min,o.max),d=a(r.density.min,r.density.max,c.min,c.max),f=a(r.magicPower.min,r.magicPower.max,l.min,l.max),p=n.temperature>=r.temperature.min&&n.temperature<=r.temperature.max,h=n.density>=r.density.min&&n.density<=r.density.max,g=n.magicPower>=r.magicPower.min&&n.magicPower<=r.magicPower.max,_=e.querySelector(`[data-value="temp"]`);_&&_.textContent!==String(n.temperature)&&(_.textContent=String(n.temperature));let v=e.querySelector(`[data-bar="temp"]`);v&&v.classList.toggle(`glow`,p);let y=e.querySelector(`[data-zone="temp"]`);y&&(y.style.left=`${u.left}%`,y.style.width=`${u.width}%`);let x=e.querySelector(`[data-marker="temp"]`);x&&(x.style.left=`${i(n.temperature,o.min,o.max)}%`);let S=e.querySelector(`[data-value="density"]`);S&&S.textContent!==String(n.density)&&(S.textContent=String(n.density));let C=e.querySelector(`[data-bar="density"]`);C&&C.classList.toggle(`glow`,h);let w=e.querySelector(`[data-zone="density"]`);w&&(w.style.left=`${d.left}%`,w.style.width=`${d.width}%`);let T=e.querySelector(`[data-marker="density"]`);T&&(T.style.left=`${i(n.density,c.min,c.max)}%`);let E=e.querySelector(`[data-value="magic"]`);E&&E.textContent!==String(n.magicPower)&&(E.textContent=String(n.magicPower));let D=e.querySelector(`[data-bar="magic"]`);D&&D.classList.toggle(`glow`,g);let O=e.querySelector(`[data-zone="magic"]`);O&&(O.style.left=`${f.left}%`,O.style.width=`${f.width}%`);let k=e.querySelector(`[data-marker="magic"]`);k&&(k.style.left=`${i(n.magicPower,l.min,l.max)}%`)}var S=4;function C(e){e.innerHTML=`
    <div class="recipe-panel">
      <h3>Current Recipe</h3>
      <h2 class="recipe-title"></h2>

      <div class="recipe-ranges">
        <div class="range-row">
          <span>Temp:</span>
          <strong data-range="temperature"></strong>
        </div>
        <div class="range-row">
          <span>Density:</span>
          <strong data-range="density"></strong>
        </div>
        <div class="range-row">
          <span>Magic:</span>
          <strong data-range="magicPower"></strong>
        </div>
      </div>

      <div class="recipe-counter"></div>

      <button class="brew-btn">Brew Potion</button>
    </div>
  `,e.querySelector(`.brew-btn`).addEventListener(`click`,()=>{m.brew()})}function w(e,t){e&&e.textContent!==t&&(e.textContent=t)}function T(e){e.querySelector(`.recipe-panel`)||C(e);let t=m.getState(),n=t.activeRecipe,r=t.cauldronIngredients.length,i=r>=S,a=r>0;w(e.querySelector(`.recipe-title`),n.name),w(e.querySelector(`[data-range="temperature"]`),`${n.temperature.min} – ${n.temperature.max}`),w(e.querySelector(`[data-range="density"]`),`${n.density.min} – ${n.density.max}`),w(e.querySelector(`[data-range="magicPower"]`),`${n.magicPower.min} – ${n.magicPower.max}`);let o=e.querySelector(`.recipe-counter`);w(o,`Ingredients: ${r} / ${S}`),o.classList.toggle(`max-reached`,i);let s=e.querySelector(`.brew-btn`);s.disabled!==!a&&(s.disabled=!a)}function E(e){return`alchemists_cauldron_leaderboard_${e}`}function D(e){try{let t=new Date(e);return isNaN(t.getTime())?``:`${String(t.getDate()).padStart(2,`0`)}.${String(t.getMonth()+1).padStart(2,`0`)}.${t.getFullYear()} ${String(t.getHours()).padStart(2,`0`)}:${String(t.getMinutes()).padStart(2,`0`)}`}catch{return``}}function O(e){return[...e].sort((e,t)=>t.score===e.score?new Date(e.date).getTime()-new Date(t.date).getTime():t.score-e.score)}function k(e=`medium`){try{let t=localStorage.getItem(E(e));if(!t)return[];let n=JSON.parse(t);return Array.isArray(n)?O(n).slice(0,10):[]}catch(e){return console.error(`Failed to read leaderboard from localStorage:`,e),[]}}function A(e,t){try{let n=O(t).slice(0,10);return localStorage.setItem(E(e),JSON.stringify(n)),!0}catch(e){return console.error(`Failed to save leaderboard to localStorage:`,e),!1}}function j(e){try{return localStorage.removeItem(E(e)),!0}catch(e){return console.error(`Failed to clear leaderboard from localStorage:`,e),!1}}function M(e,t){let n=k(e);return n.length<10||t>n[n.length-1].score}function N(e){return e.trim().length<2?{isValid:!1,error:`Name must be at least 2 characters long`}:e.length>15?{isValid:!1,error:`Name cannot exceed 15 characters`}:/^[a-zA-Z0-9 _-]+$/.test(e)?{isValid:!0}:{isValid:!1,error:`Only letters, digits, spaces, _ and - are allowed`}}function P(e,t,n){let r=k(e),i={id:`${Date.now()}_${Math.random().toString(36).substring(2,9)}`,name:t.trim(),score:n,date:new Date().toISOString(),difficulty:e};r.push(i);let a=O(r).slice(0,10);return A(e,a),a}function F(e){let t=m.getState(),n=t.gameOverReason||`Game Over`,r=t.score,i=t.difficulty||`medium`,a=M(i,r),o=m.isScoreSubmitted(),s=``;s=a&&!o?`
      <div class="top10-congrats">
        <span class="badge-new-record">🎉 TOP-10 RECORD!</span>
        <label for="player-name-input" class="name-label">Enter your name (2–15 chars):</label>
        <div class="input-row">
          <input 
            type="text" 
            id="player-name-input" 
            class="player-name-input" 
            placeholder="AlchemistName" 
            maxlength="15" 
            autocomplete="off" 
          />
        </div>
        <div id="name-validation-error" class="name-validation-error" style="display: none;"></div>
      </div>
    `:o?`
      <div class="score-submitted-notice">
        <span>✨ Score saved to Leaderboard!</span>
      </div>
    `:`
      <div class="not-top10-notice">
        <span>Brew more potions next time to enter the Top-10!</span>
      </div>
    `,e.innerHTML=`
    <div class="game-over-overlay">
      <div class="game-over-modal">
        <h2>Game Over</h2>
        <p class="reason">${n}</p>
        <div class="final-score">Final Score: <strong>${r}</strong></div>
        
        ${s}

        <div class="game-over-actions">
          ${a&&!o?`<button class="submit-score-btn" id="submit-score-btn">Submit Score</button>`:``}
          <button class="play-again-btn" id="replay-btn">Replay</button>
          <button class="game-over-leaderboard-btn" id="game-over-leaderboard-btn">Leaderboard</button>
        </div>
      </div>
    </div>
  `,e.querySelector(`#replay-btn`)?.addEventListener(`click`,()=>{m.resetGame()}),e.querySelector(`#game-over-leaderboard-btn`)?.addEventListener(`click`,()=>{m.openLeaderboard(`game-over`)});let c=e.querySelector(`#submit-score-btn`),l=e.querySelector(`#player-name-input`),u=e.querySelector(`#name-validation-error`),d=()=>{if(!l)return;let e=l.value,t=N(e);t.isValid?(u&&(u.style.display=`none`),l.classList.remove(`input-error`),P(i,e,r),m.markScoreSubmitted(),m.openLeaderboard(`game-over`)):(u&&(u.textContent=t.error||`Invalid name`,u.style.display=`block`),l.classList.add(`input-error`),l.focus())};c?.addEventListener(`click`,d),l?.addEventListener(`keydown`,e=>{e.key===`Enter`&&d()}),l?.addEventListener(`input`,()=>{u&&u.style.display!==`none`&&(u.style.display=`none`,l.classList.remove(`input-error`))})}function I(e){e.innerHTML=`
    <div class="menu-container">
      <div class="menu-box">
        <h1>Alchemist's Cauldron</h1>
        <p>Mix ingredients, match target ranges, and brew legendary potions!</p>
        
        <div class="menu-actions">
          ${d()===null?``:`<button class="start-game-btn continue-btn" id="continue-game-btn">Continue Game</button>`}

          <div class="difficulty-select-group">
            <h3>Select Difficulty:</h3>
            <div class="diff-buttons">
              <button class="diff-btn easy" data-diff="easy">Easy</button>
              <button class="diff-btn medium active" data-diff="medium">Medium</button>
              <button class="diff-btn hard" data-diff="hard">Hard</button>
            </div>
          </div>

          <button class="start-game-btn" id="start-game-btn">Start New Game</button>
          <button class="menu-btn leaderboard-menu-btn" id="menu-leaderboard-btn">Leaderboard</button>
          <button class="menu-btn help-btn" id="menu-help-btn">Help & Rules</button>
        </div>
      </div>

      <!-- Help Modal -->
      <div class="help-modal-overlay" id="help-modal" style="display: none;">
        <div class="help-modal-box">
          <h2>Game Rules</h2>
          <div class="help-content">
            <p><strong>Goal:</strong> Add ingredients from the shelf to the cauldron to match target ranges.</p>
            <p><strong>Brewing:</strong> Click <strong>Brew</strong> to check your mixture.</p>
          </div>
          <button class="back-btn" id="help-close-btn">Close</button>
        </div>
      </div>
    </div>
  `;let t=`medium`;e.querySelectorAll(`.diff-btn`).forEach(n=>{n.addEventListener(`click`,()=>{e.querySelectorAll(`.diff-btn`).forEach(e=>e.classList.remove(`active`)),n.classList.add(`active`),t=n.getAttribute(`data-diff`)})}),e.querySelector(`#continue-game-btn`)?.addEventListener(`click`,()=>{m.continueGame()}),e.querySelector(`#start-game-btn`)?.addEventListener(`click`,()=>{m.startGame(t)}),e.querySelector(`#menu-leaderboard-btn`)?.addEventListener(`click`,()=>{m.openLeaderboard(`menu`)});let n=e.querySelector(`#help-modal`);e.querySelector(`#menu-help-btn`)?.addEventListener(`click`,()=>{n&&(n.style.display=`flex`)}),e.querySelector(`#help-close-btn`)?.addEventListener(`click`,()=>{n&&(n.style.display=`none`)})}function L(e){e.innerHTML=`
    <div class="pause-overlay">
      <div class="pause-modal">
        <h2>Game Paused</h2>
        <button class="resume-btn">Resume</button>
        <button class="exit-btn">Exit to Menu</button>
      </div>
    </div>
  `,e.querySelector(`.resume-btn`)?.addEventListener(`click`,()=>{m.resumeGame()}),e.querySelector(`.exit-btn`)?.addEventListener(`click`,()=>{m.exitToMenu()})}var R=`medium`;function z(e){return e.length===0?`
      <tr>
        <td colspan="5" class="empty-leaderboard">
          No records yet for this difficulty.
        </td>
      </tr>
    `:e.map((e,t)=>{let n=t+1,r=`<span class="rank-number">${n}</span>`;return n===1?r=`<span class="rank-badge gold">🥇 1</span>`:n===2?r=`<span class="rank-badge silver">🥈 2</span>`:n===3&&(r=`<span class="rank-badge bronze">🥉 3</span>`),`
        <tr class="leaderboard-row rank-${n}">
          <td class="col-rank">${r}</td>
          <td class="col-name" title="${e.name}">${e.name}</td>
          <td class="col-difficulty"><span class="diff-badge ${e.difficulty}">${e.difficulty}</span></td>
          <td class="col-score"><strong>${e.score}</strong></td>
          <td class="col-date">${D(e.date)}</td>
        </tr>
      `}).join(``)}function B(e){R=m.getState().difficulty||`medium`;let t=k(R);e.innerHTML=`
    <div class="leaderboard-overlay">
      <div class="leaderboard-modal">
        <div class="leaderboard-header">
          <h2>Top Alchemists Leaderboard</h2>
          <div class="difficulty-tabs">
            <button class="diff-tab ${R===`easy`?`active`:``}" data-diff="easy">Easy</button>
            <button class="diff-tab ${R===`medium`?`active`:``}" data-diff="medium">Medium</button>
            <button class="diff-tab ${R===`hard`?`active`:``}" data-diff="hard">Hard</button>
          </div>
        </div>

        <div class="leaderboard-table-container">
          <table class="leaderboard-table">
            <thead>
              <tr>
                <th class="col-rank">Rank</th>
                <th class="col-name">Name</th>
                <th class="col-difficulty">Difficulty</th>
                <th class="col-score">Score</th>
                <th class="col-date">Date</th>
              </tr>
            </thead>
            <tbody id="leaderboard-body">
              ${z(t)}
            </tbody>
          </table>
        </div>

        <div class="leaderboard-footer">
          <button class="clear-btn" id="clear-leaderboard-btn">Clear Leaderboard</button>
          <button class="back-btn" id="leaderboard-back-btn">Back</button>
        </div>

        <div class="confirm-dialog-overlay" id="confirm-clear-dialog" style="display: none;">
          <div class="confirm-dialog-box">
            <h3>Clear Leaderboard?</h3>
            <p>Are you sure you want to delete records for ${R}?</p>
            <div class="confirm-dialog-actions">
              <button class="confirm-cancel-btn" id="confirm-cancel-btn">Cancel</button>
              <button class="confirm-danger-btn" id="confirm-accept-btn">Clear All</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,e.querySelector(`#leaderboard-back-btn`)?.addEventListener(`click`,()=>{m.closeLeaderboard()}),e.querySelectorAll(`.diff-tab`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-diff`);if(n){R=n;let r=k(n),i=e.querySelector(`#leaderboard-body`);i&&(i.innerHTML=z(r)),e.querySelectorAll(`.diff-tab`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`)}})});let n=e.querySelector(`#clear-leaderboard-btn`),r=e.querySelector(`#confirm-clear-dialog`),i=e.querySelector(`#confirm-cancel-btn`),a=e.querySelector(`#confirm-accept-btn`),o=e.querySelector(`#leaderboard-body`);n&&r&&n.addEventListener(`click`,()=>{r.style.display=`flex`}),i&&r&&i.addEventListener(`click`,()=>{r.style.display=`none`}),a&&r&&o&&a.addEventListener(`click`,()=>{j(R),r.style.display=`none`,o.innerHTML=z([])})}function V(e){let t=Math.floor(e/60),n=Math.floor(e%60);return`${t.toString().padStart(2,`0`)}:${n.toString().padStart(2,`0`)}`}function H(){window.addEventListener(`keydown`,e=>{let t=e.target;if(t&&([`INPUT`,`TEXTAREA`,`SELECT`].includes(t.tagName)||t.isContentEditable))return;let n=m.getState();if(n.status===`playing`){if(e.code===`KeyP`||e.code===`Escape`){e.preventDefault(),m.pauseGame();return}if(e.code===`KeyO`){e.preventDefault(),m.pourOut();return}}else if(n.status===`paused`&&(e.code===`KeyP`||e.code===`Escape`)){e.preventDefault(),m.resumeGame();return}})}H();var U=document.querySelector(`#app`);function W(e){e.innerHTML=`
    <div class="game-container">
      <header class="game-header">
        <div class="header-top">
          <h1>Alchemist's Cauldron</h1>
          <button class="pause-btn" id="pause-trigger-btn" title="Pause">⏸</button>
        </div>
        <div class="game-stats">
          <span>Score: <strong id="score-text">0</strong></span>
          <span>Lives: <strong id="lives-text"></strong></span>
          <div class="timer-wrapper">
            <span>Time: <strong id="timer-text"></strong></span>
            <div class="timer-bar-container">
              <div class="timer-bar-fill" id="timer-bar"></div>
            </div>
          </div>
        </div>
      </header>
      <main class="game-main">
        <aside id="shelf-container"></aside>
        <section id="cauldron-container"></section>
        <aside id="recipe-container"></aside>
        <aside id="bars-container"></aside>
      </main>
    </div>
  `,document.getElementById(`pause-trigger-btn`)?.addEventListener(`click`,()=>{m.pauseGame()})}function G(){let e=()=>{let e=m.getState();if(e.status===`menu`){document.getElementById(`menu-root`)||(U.innerHTML=`<div id="menu-root"></div>`,I(document.getElementById(`menu-root`)));return}if(e.status===`leaderboard`){document.getElementById(`leaderboard-root`)||(U.innerHTML=`<div id="leaderboard-root"></div>`,B(document.getElementById(`leaderboard-root`)));return}if(e.status===`game-over`){document.getElementById(`game-over-container`)||(U.innerHTML=`<div id="game-over-container"></div>`),F(document.getElementById(`game-over-container`));return}let t=e.status===`paused`;U.querySelector(`.game-container`)||W(U);let n=U.querySelector(`.game-container`);n&&n.classList.toggle(`blurred`,t);let r=document.getElementById(`pause-modal-container`);if(t){r||(r=document.createElement(`div`),r.id=`pause-modal-container`,U.appendChild(r),L(r));return}r&&r.remove();let i=document.getElementById(`score-text`);i&&i.textContent!==String(e.score)&&(i.textContent=String(e.score));let a=document.getElementById(`lives-text`),o=`❤️`.repeat(Math.max(0,e.lives));a&&a.textContent!==o&&(a.textContent=o);let s=document.getElementById(`timer-text`),c=document.getElementById(`timer-bar`);if(s&&c){let t=V(e.timeLeft);s.textContent!==t&&(s.textContent=t),c.style.width=`${e.timeLeft/150*100}%`,e.timeLeft<=15?(s.classList.add(`pulse-red`),c.classList.add(`pulse-bar`)):(s.classList.remove(`pulse-red`),c.classList.remove(`pulse-bar`))}let l=document.getElementById(`shelf-container`),u=document.getElementById(`cauldron-container`),d=document.getElementById(`recipe-container`),f=document.getElementById(`bars-container`);l&&v(l),u&&y(u),d&&T(d),f&&x(f)};m.subscribe(e),e()}G();