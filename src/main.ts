import './styles/style.scss';
import { gameStore } from './state/game-state';
import { renderShelf } from './ui/shelf';
import { renderCauldron } from './ui/cauldron';
import { renderBars } from './ui/bars';

const app = document.querySelector('#app') as HTMLElement;

function initApp() {
  app.innerHTML = `
    <div class="game-container">
      <header class="game-header">
        <h1>Alchemist's Cauldron</h1>
      </header>
      <main class="game-main">
        <aside id="shelf-container"></aside>
        <section id="cauldron-container"></section>
        <aside id="bars-container"></aside>
      </main>
    </div>
  `;

  const shelfContainer = document.getElementById('shelf-container') as HTMLElement;
  const cauldronContainer = document.getElementById('cauldron-container') as HTMLElement;
  const barsContainer = document.getElementById('bars-container') as HTMLElement;

  const updateUI = () => {
    renderShelf(shelfContainer);
    renderCauldron(cauldronContainer);
    renderBars(barsContainer);
  };

  gameStore.subscribe(updateUI);
  updateUI();
}

initApp();