const STORAGE_KEY = "sakashita-ofertas-mvp-v1";

const categories = [
  "Todas",
  "Mercearia",
  "Bebidas",
  "Acougue",
  "Padaria",
  "Hortifruti",
  "Frios",
  "Limpeza",
  "Pet"
];

const sortOptions = [
  { value: "relevance", label: "Relevancia" },
  { value: "discount", label: "Maior desconto" },
  { value: "price-low", label: "Menor preco" },
  { value: "price-high", label: "Maior preco" }
];

const stores = [
  {
    id: "centro",
    name: "Sakashita - Centro",
    address: "Av. Brasil, 1204, Centro",
    neighborhood: "Centro",
    distance: "2 km"
  },
  {
    id: "industrial",
    name: "Sakashita - Industrial",
    address: "Rua das Flores, 89, Distrito Industrial",
    neighborhood: "Industrial",
    distance: "5 km"
  },
  {
    id: "leste",
    name: "Sakashita - Zona Leste",
    address: "Av. das Palmeiras, 450, Jardim Leste",
    neighborhood: "Zona Leste",
    distance: "8 km"
  }
];

function uid() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `offer-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function futureDate(daysAhead) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().slice(0, 10);
}

const seedOffers = [
  {
    id: uid(),
    title: "Arroz Tipo 1 5kg",
    description: "Pacote premium com desconto pensado para a compra da semana.",
    category: "Mercearia",
    price: 24.9,
    oldPrice: 29.9,
    unit: "pacote",
    validUntil: futureDate(2),
    badge: "Oferta do Dia",
    color: "amber",
    featured: true,
    club: false,
    active: true,
    storeId: "centro",
    modes: ["delivery", "pickup"],
    createdAt: Date.now()
  },
  {
    id: uid(),
    title: "Refrigerante Cola 2L",
    description: "Preco especial para levar no almoco do fim de semana.",
    category: "Bebidas",
    price: 8.99,
    oldPrice: 11.49,
    unit: "garrafa",
    validUntil: futureDate(1),
    badge: "Relampago",
    color: "red",
    featured: true,
    club: true,
    active: true,
    storeId: "industrial",
    modes: ["delivery", "pickup"],
    createdAt: Date.now() + 1
  },
  {
    id: uid(),
    title: "Tomate Italiano",
    description: "Hortifruti fresco para saladas e receitas do dia.",
    category: "Hortifruti",
    price: 6.49,
    oldPrice: 8.99,
    unit: "kg",
    validUntil: futureDate(2),
    badge: "Fresco Hoje",
    color: "mint",
    featured: false,
    club: false,
    active: true,
    storeId: "centro",
    modes: ["delivery", "pickup"],
    createdAt: Date.now() + 2
  },
  {
    id: uid(),
    title: "Pao Frances",
    description: "Oferta ideal para retirada rapida na padaria.",
    category: "Padaria",
    price: 12.5,
    oldPrice: 15.9,
    unit: "kg",
    validUntil: futureDate(1),
    badge: "Sai Quentinho",
    color: "amber",
    featured: false,
    club: false,
    active: true,
    storeId: "industrial",
    modes: ["pickup"],
    createdAt: Date.now() + 3
  },
  {
    id: uid(),
    title: "Sabao Liquido 3L",
    description: "Linha de limpeza com preco forte para recompra.",
    category: "Limpeza",
    price: 18.9,
    oldPrice: 23.5,
    unit: "unidade",
    validUntil: futureDate(4),
    badge: "Economia",
    color: "blue",
    featured: true,
    club: false,
    active: true,
    storeId: "leste",
    modes: ["delivery", "pickup"],
    createdAt: Date.now() + 4
  },
  {
    id: uid(),
    title: "Picanha Bovina",
    description: "Corte nobre com desconto para retirada na unidade.",
    category: "Acougue",
    price: 52.9,
    oldPrice: 64.9,
    unit: "kg",
    validUntil: futureDate(2),
    badge: "Churrasco",
    color: "red",
    featured: true,
    club: true,
    active: true,
    storeId: "leste",
    modes: ["pickup"],
    createdAt: Date.now() + 5
  }
];

const baseState = {
  stores,
  offers: seedOffers,
  selectedStoreId: stores[0].id,
  currentScreen: "offers",
  currentMode: "delivery",
  feed: "daily",
  category: "Todas",
  search: "",
  sort: "relevance",
  featuredOnly: false,
  editingId: null
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return clone(baseState);
    }

    return { ...clone(baseState), ...JSON.parse(raw) };
  } catch (error) {
    console.error("Falha ao carregar o estado salvo.", error);
    return clone(baseState);
  }
}

let state = loadState();

const el = {
  metricOffers: document.querySelector("#metric-offers"),
  metricStores: document.querySelector("#metric-stores"),
  storeSummary: document.querySelector("#store-summary"),
  modeSummary: document.querySelector("#mode-summary"),
  searchInput: document.querySelector("#search-input"),
  categoryRow: document.querySelector("#category-row"),
  resultsLabel: document.querySelector("#results-label"),
  offersGrid: document.querySelector("#offers-grid"),
  emptyCard: document.querySelector("#empty-card"),
  storeList: document.querySelector("#store-list"),
  adminList: document.querySelector("#admin-list"),
  adminSummary: document.querySelector("#admin-summary"),
  formStatus: document.querySelector("#form-status"),
  filterSheet: document.querySelector("#filter-sheet"),
  sheetBackdrop: document.querySelector("#sheet-backdrop"),
  filterSort: document.querySelector("#filter-sort"),
  filterCategory: document.querySelector("#filter-category"),
  filterFeatured: document.querySelector("#filter-featured"),
  toast: document.querySelector("#toast"),
  form: document.querySelector("#offer-form"),
  offerId: document.querySelector("#offer-id"),
  offerTitle: document.querySelector("#offer-title"),
  offerDescription: document.querySelector("#offer-description"),
  offerCategory: document.querySelector("#offer-category"),
  offerStore: document.querySelector("#offer-store"),
  offerPrice: document.querySelector("#offer-price"),
  offerOldPrice: document.querySelector("#offer-old-price"),
  offerUnit: document.querySelector("#offer-unit"),
  offerValidity: document.querySelector("#offer-validity"),
  offerBadge: document.querySelector("#offer-badge"),
  offerColor: document.querySelector("#offer-color"),
  offerDelivery: document.querySelector("#offer-delivery"),
  offerPickup: document.querySelector("#offer-pickup"),
  offerFeatured: document.querySelector("#offer-featured"),
  offerClub: document.querySelector("#offer-club"),
  offerActive: document.querySelector("#offer-active")
};

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function money(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(Number(value) || 0);
}

function shortDate(dateValue) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit"
  }).format(new Date(`${dateValue}T12:00:00`));
}

function getStore(storeId) {
  return state.stores.find((store) => store.id === storeId) || state.stores[0];
}

function getSelectedStore() {
  return getStore(state.selectedStoreId);
}

function discount(offer) {
  const oldPrice = Number(offer.oldPrice);
  const price = Number(offer.price);

  if (!oldPrice || oldPrice <= price) {
    return 0;
  }

  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

function initials(title) {
  return title
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

function isLiveOffer(offer) {
  if (!offer.active) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const limit = new Date(`${offer.validUntil}T12:00:00`);
  limit.setHours(0, 0, 0, 0);

  return limit >= today;
}

function visibleOffers() {
  const term = state.search.trim().toLowerCase();

  return state.offers
    .filter((offer) => {
      if (!isLiveOffer(offer)) {
        return false;
      }

      if (offer.storeId !== state.selectedStoreId) {
        return false;
      }

      if (!offer.modes.includes(state.currentMode)) {
        return false;
      }

      if (state.feed === "club" && !offer.club) {
        return false;
      }

      if (state.category !== "Todas" && offer.category !== state.category) {
        return false;
      }

      if (state.featuredOnly && !offer.featured) {
        return false;
      }

      if (!term) {
        return true;
      }

      const haystack = `${offer.title} ${offer.description} ${offer.category}`.toLowerCase();
      return haystack.includes(term);
    })
    .sort((left, right) => {
      if (state.sort === "discount") {
        return discount(right) - discount(left);
      }

      if (state.sort === "price-low") {
        return Number(left.price) - Number(right.price);
      }

      if (state.sort === "price-high") {
        return Number(right.price) - Number(left.price);
      }

      const scoreLeft = Number(left.featured) * 20 + Number(left.club) * 10 + discount(left);
      const scoreRight = Number(right.featured) * 20 + Number(right.club) * 10 + discount(right);
      return scoreRight - scoreLeft || right.createdAt - left.createdAt;
    });
}

function setupStaticOptions() {
  const categoryOptions = categories
    .map((category) => `<option value="${category}">${category}</option>`)
    .join("");

  const formCategoryOptions = categories
    .filter((category) => category !== "Todas")
    .map((category) => `<option value="${category}">${category}</option>`)
    .join("");

  const storeOptions = state.stores
    .map((store) => `<option value="${store.id}">${store.name}</option>`)
    .join("");

  const sortOptionTags = sortOptions
    .map((option) => `<option value="${option.value}">${option.label}</option>`)
    .join("");

  el.filterCategory.innerHTML = categoryOptions;
  el.offerCategory.innerHTML = formCategoryOptions;
  el.offerStore.innerHTML = storeOptions;
  el.filterSort.innerHTML = sortOptionTags;
}

function renderHeader() {
  const selectedStore = getSelectedStore();
  const activeOffers = state.offers.filter((offer) => isLiveOffer(offer)).length;

  el.metricOffers.textContent = String(activeOffers);
  el.metricStores.textContent = String(state.stores.length);
  el.storeSummary.textContent = `${selectedStore.name} | ${selectedStore.address}`;
  el.modeSummary.textContent =
    state.currentMode === "delivery" ? "Entrega ativa" : "Retirada ativa";
}

function renderFeedTabs() {
  document.querySelectorAll("[data-feed]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.feed === state.feed);
  });
}

function renderModeButtons() {
  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === state.currentMode);
  });

  document.querySelectorAll("[data-store-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.storeMode === state.currentMode);
  });
}

function renderNav() {
  document.querySelectorAll("[data-screen]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.screen === state.currentScreen);
  });

  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("is-active");
  });

  const activeScreen = document.querySelector(`#screen-${state.currentScreen}`);
  if (activeScreen) {
    activeScreen.classList.add("is-active");
  }
}

function renderCategoryChips() {
  el.categoryRow.innerHTML = categories
    .map((category) => {
      const active = state.category === category ? " is-active" : "";
      return `<button class="chip-button${active}" data-category="${category}" type="button">${category}</button>`;
    })
    .join("");
}

function renderOffers() {
  const offers = visibleOffers();

  el.resultsLabel.textContent = `${offers.length} oferta${offers.length === 1 ? "" : "s"} encontrada${
    offers.length === 1 ? "" : "s"
  }`;

  if (!offers.length) {
    el.offersGrid.innerHTML = "";
    el.emptyCard.classList.remove("hidden");
    return;
  }

  el.emptyCard.classList.add("hidden");

  el.offersGrid.innerHTML = offers
    .map((offer) => {
      const store = getStore(offer.storeId);
      return `
        <article class="offer-card" data-color="${offer.color}">
          <div class="offer-top">
            <span class="offer-badge">${offer.badge || "Oferta"}</span>
            <span class="discount-pill">-${discount(offer)}%</span>
          </div>
          <div class="offer-visual">${initials(offer.title)}</div>
          <div class="offer-prices">
            <strong>${money(offer.price)}</strong>
            <span>${money(offer.oldPrice)}</span>
          </div>
          <h5>${offer.title}</h5>
          <p class="offer-copy">${offer.description}</p>
          <div class="offer-meta">
            <span>${store.neighborhood}</span>
            <span>${offer.unit}</span>
            <span>ate ${shortDate(offer.validUntil)}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderStores() {
  el.storeList.innerHTML = state.stores
    .map((store) => {
      const selected = state.selectedStoreId === store.id ? " is-selected" : "";
      return `
        <article class="store-card${selected}">
          <span class="store-distance">${store.distance}</span>
          <div>
            <h5>${store.name}</h5>
            <p>${store.address}</p>
          </div>
          <div class="store-footer">
            <span>${store.neighborhood}</span>
            <button class="primary-button" data-store-select="${store.id}" type="button">Selecionar</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderAdminList() {
  const ordered = [...state.offers].sort((left, right) => right.createdAt - left.createdAt);
  el.adminSummary.textContent = `${ordered.length} item${ordered.length === 1 ? "" : "s"} cadastrados`;

  el.adminList.innerHTML = ordered
    .map((offer) => {
      const store = getStore(offer.storeId);
      return `
        <article class="admin-item">
          <div class="offer-top">
            <span class="status-chip">${offer.active ? "Ativa" : "Inativa"}</span>
            <strong>${money(offer.price)}</strong>
          </div>
          <h5>${offer.title}</h5>
          <p>${offer.description}</p>
          <div class="offer-meta">
            <span>${offer.category}</span>
            <span>${store.neighborhood}</span>
            <span>ate ${shortDate(offer.validUntil)}</span>
          </div>
          <div class="admin-actions">
            <button class="secondary-button" data-edit="${offer.id}" type="button">Editar</button>
            <button class="ghost-button" data-toggle="${offer.id}" type="button">${offer.active ? "Pausar" : "Ativar"}</button>
            <button class="ghost-button" data-delete="${offer.id}" type="button">Excluir</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderFilterState() {
  el.filterSort.value = state.sort;
  el.filterCategory.value = state.category;
  el.filterFeatured.checked = state.featuredOnly;
}

function renderFormStatus() {
  el.formStatus.textContent = state.editingId ? "Editando oferta" : "Nova oferta";
}

function render() {
  renderHeader();
  renderFeedTabs();
  renderModeButtons();
  renderNav();
  renderCategoryChips();
  renderOffers();
  renderStores();
  renderAdminList();
  renderFilterState();
  renderFormStatus();
  el.searchInput.value = state.search;
}

function showToast(message) {
  clearTimeout(showToast.timer);
  el.toast.textContent = message;
  el.toast.classList.remove("hidden");

  showToast.timer = setTimeout(() => {
    el.toast.classList.add("hidden");
  }, 2200);
}

function changeScreen(screen) {
  state.currentScreen = screen;
  saveState();
  renderNav();
}

function openSheet() {
  renderFilterState();
  el.filterSheet.classList.remove("hidden");
  el.sheetBackdrop.classList.remove("hidden");
}

function closeSheet() {
  el.filterSheet.classList.add("hidden");
  el.sheetBackdrop.classList.add("hidden");
}

function resetForm() {
  state.editingId = null;
  el.form.reset();
  el.offerId.value = "";
  el.offerCategory.value = categories[1];
  el.offerStore.value = state.selectedStoreId;
  el.offerPrice.value = "";
  el.offerOldPrice.value = "";
  el.offerUnit.value = "unidade";
  el.offerValidity.value = futureDate(1);
  el.offerBadge.value = "Oferta do Dia";
  el.offerColor.value = "amber";
  el.offerDelivery.checked = true;
  el.offerPickup.checked = true;
  el.offerFeatured.checked = true;
  el.offerClub.checked = false;
  el.offerActive.checked = true;
  renderFormStatus();
}

function editOffer(offerId) {
  const offer = state.offers.find((item) => item.id === offerId);
  if (!offer) {
    return;
  }

  state.editingId = offer.id;
  state.currentScreen = "admin";

  el.offerId.value = offer.id;
  el.offerTitle.value = offer.title;
  el.offerDescription.value = offer.description;
  el.offerCategory.value = offer.category;
  el.offerStore.value = offer.storeId;
  el.offerPrice.value = offer.price;
  el.offerOldPrice.value = offer.oldPrice;
  el.offerUnit.value = offer.unit;
  el.offerValidity.value = offer.validUntil;
  el.offerBadge.value = offer.badge;
  el.offerColor.value = offer.color;
  el.offerDelivery.checked = offer.modes.includes("delivery");
  el.offerPickup.checked = offer.modes.includes("pickup");
  el.offerFeatured.checked = Boolean(offer.featured);
  el.offerClub.checked = Boolean(offer.club);
  el.offerActive.checked = Boolean(offer.active);

  saveState();
  render();
  showToast("Oferta carregada para edicao.");
}

function toggleOffer(offerId) {
  state.offers = state.offers.map((offer) =>
    offer.id === offerId ? { ...offer, active: !offer.active } : offer
  );
  saveState();
  render();
  showToast("Status da oferta atualizado.");
}

function deleteOffer(offerId) {
  if (!window.confirm("Deseja excluir esta oferta?")) {
    return;
  }

  state.offers = state.offers.filter((offer) => offer.id !== offerId);

  if (state.editingId === offerId) {
    resetForm();
  }

  saveState();
  render();
  showToast("Oferta excluida.");
}

function collectModes() {
  const modes = [];
  if (el.offerDelivery.checked) {
    modes.push("delivery");
  }
  if (el.offerPickup.checked) {
    modes.push("pickup");
  }
  return modes;
}

function submitForm(event) {
  event.preventDefault();

  const modes = collectModes();
  if (!modes.length) {
    showToast("Marque entrega, retirada ou os dois.");
    return;
  }

  const payload = {
    id: el.offerId.value || uid(),
    title: el.offerTitle.value.trim(),
    description: el.offerDescription.value.trim(),
    category: el.offerCategory.value,
    storeId: el.offerStore.value,
    price: Number(el.offerPrice.value),
    oldPrice: Number(el.offerOldPrice.value),
    unit: el.offerUnit.value.trim(),
    validUntil: el.offerValidity.value,
    badge: el.offerBadge.value.trim() || "Oferta do Dia",
    color: el.offerColor.value,
    featured: el.offerFeatured.checked,
    club: el.offerClub.checked,
    active: el.offerActive.checked,
    modes,
    createdAt: state.editingId
      ? state.offers.find((offer) => offer.id === state.editingId)?.createdAt || Date.now()
      : Date.now()
  };

  if (payload.oldPrice < payload.price) {
    showToast("O preco anterior precisa ser maior ou igual ao preco atual.");
    return;
  }

  if (state.editingId) {
    state.offers = state.offers.map((offer) => (offer.id === state.editingId ? payload : offer));
    showToast("Oferta atualizada.");
  } else {
    state.offers = [payload, ...state.offers];
    showToast("Oferta criada.");
  }

  state.selectedStoreId = payload.storeId;
  saveState();
  resetForm();
  render();
}

function clearFilters() {
  state.category = "Todas";
  state.search = "";
  state.sort = "relevance";
  state.featuredOnly = false;
  saveState();
  render();
}

function bindEvents() {
  document.querySelector("#open-stores").addEventListener("click", () => changeScreen("stores"));
  document.querySelector("#open-admin").addEventListener("click", () => changeScreen("admin"));
  document.querySelector("#open-filters").addEventListener("click", openSheet);
  document.querySelector("#close-filters").addEventListener("click", closeSheet);
  document.querySelector("#apply-sheet").addEventListener("click", () => {
    state.sort = el.filterSort.value;
    state.category = el.filterCategory.value;
    state.featuredOnly = el.filterFeatured.checked;
    saveState();
    closeSheet();
    render();
  });
  document.querySelector("#reset-sheet").addEventListener("click", () => {
    state.sort = "relevance";
    state.category = "Todas";
    state.featuredOnly = false;
    saveState();
    render();
  });
  document.querySelector("#clear-filters").addEventListener("click", clearFilters);
  document.querySelector("#reset-form").addEventListener("click", resetForm);
  el.sheetBackdrop.addEventListener("click", closeSheet);
  el.form.addEventListener("submit", submitForm);

  el.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    renderOffers();
  });

  document.addEventListener("click", (event) => {
    const feedButton = event.target.closest("[data-feed]");
    if (feedButton) {
      state.feed = feedButton.dataset.feed;
      saveState();
      render();
      return;
    }

    const navButton = event.target.closest("[data-screen]");
    if (navButton) {
      changeScreen(navButton.dataset.screen);
      return;
    }

    const categoryButton = event.target.closest("[data-category]");
    if (categoryButton) {
      state.category = categoryButton.dataset.category;
      saveState();
      render();
      return;
    }

    const modeButton = event.target.closest("[data-mode]");
    if (modeButton) {
      state.currentMode = modeButton.dataset.mode;
      saveState();
      render();
      return;
    }

    const storeModeButton = event.target.closest("[data-store-mode]");
    if (storeModeButton) {
      state.currentMode = storeModeButton.dataset.storeMode;
      saveState();
      render();
      return;
    }

    const storeSelectButton = event.target.closest("[data-store-select]");
    if (storeSelectButton) {
      state.selectedStoreId = storeSelectButton.dataset.storeSelect;
      state.currentScreen = "offers";
      saveState();
      render();
      showToast("Loja selecionada.");
      return;
    }

    const editButton = event.target.closest("[data-edit]");
    if (editButton) {
      editOffer(editButton.dataset.edit);
      return;
    }

    const toggleButton = event.target.closest("[data-toggle]");
    if (toggleButton) {
      toggleOffer(toggleButton.dataset.toggle);
      return;
    }

    const deleteButton = event.target.closest("[data-delete]");
    if (deleteButton) {
      deleteOffer(deleteButton.dataset.delete);
    }
  });
}

setupStaticOptions();
resetForm();
bindEvents();
render();
